LIVE - https://chat-app-om.onrender.com


```
import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import paymentRoutes from './routes/paymentRoutes';
import webhookRoutes from './routes/webhookRoutes';
import stripe from './utils/stripe';

dotenv.config();

const app = express();
app.use(express.json());

// Database Connection
createConnection().then(() => {
    console.log('Database Connected');
}).catch((err) => console.error('DB Connection Error:', err));

// API Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ormconfig.json
/*
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "password",
  "database": "ecommerce",
  "synchronize": true,
  "logging": true,
  "entities": ["src/entities/*.ts"]
}
*/

// entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column()
    postcode: string;

    @Column()
    password: string;
}

// entities/Payment.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    amount: number;

    @Column()
    paymentMethod: string;

    @Column()
    pouchType: string;

    @Column()
    stripePaymentId: string;

    @Column()
    status: string;
}

// services/paymentService.ts
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { Payment } from '../entities/Payment';
import stripe from '../utils/stripe';

export class PaymentService {
    async createPayment(userData: any, products: any[]) {
        const userRepository = getRepository(User);
        const paymentRepository = getRepository(Payment);
        let totalAmount = 0;

        // Calculate total amount for all products
        for (const productData of products) {
            const price = await stripe.prices.retrieve(productData.priceId);
            totalAmount += price.unit_amount || 0;
        }

        // Stripe PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
            payment_method: products[0].paymentMethodId,
            confirm: true
        });

        const paymentStatus = paymentIntent.status === 'succeeded' ? 'success' : 'failed';

        let user = await userRepository.findOne({ email: userData.email });
        if (!user && paymentStatus === 'success') {
            user = userRepository.create(userData);
            await userRepository.save(user);
        }

        for (const productData of products) {
            const price = await stripe.prices.retrieve(productData.priceId);
            const newPayment = paymentRepository.create({
                userId: user?.id || 0,
                amount: price.unit_amount,
                status: paymentStatus,
                stripePaymentId: paymentIntent.id,
                pouchType: productData.pouchType,
                paymentMethod: productData.paymentMethod
            });
            await paymentRepository.save(newPayment);
        }
        return { message: 'Payment processed', status: paymentStatus };
    }
}

// controllers/paymentController.ts
import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';

export class PaymentController {
    private paymentService = new PaymentService();

    async handlePayment(req: Request, res: Response) {
        try {
            const payment = await this.paymentService.createPayment(req.body.user, req.body.products);
            res.status(200).json(payment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

// routes/paymentRoutes.ts
import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';

const router = Router();
const paymentController = new PaymentController();

router.post('/buy', paymentController.handlePayment);

export default router;

// routes/webhookRoutes.ts
import { Router } from 'express';
import stripe from '../utils/stripe';

const router = Router();

router.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        console.log('Payment Successful:', event.data.object);
    } else if (event.type === 'payment_intent.payment_failed') {
        console.log('Payment Failed:', event.data.object);
    }

    res.json({ received: true });
});

export default router;

// utils/stripe.ts
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-01' });
export default stripe;


```
// Frontend (React + TypeScript) - Stripe Payment Integration
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface Product {
  id: string;
  priceId: string;
}

interface User {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  postcode: string;
  password: string;
}

const CheckoutForm = ({ products, user }: { products: Product[], user: User }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const { data: clientSecret } = await axios.post('/api/payments/buy', {
        user,
        products
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phone,
            address: {
              postal_code: user.postcode,
              country: user.country,
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
      } else {
        if (result.paymentIntent?.status === 'succeeded') {
          alert('Payment Successful!');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Payment failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-500 text-white px-6 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    postcode: '',
    password: ''
  });

  useEffect(() => {
    axios.get('https://ipapi.co/json/')
      .then((response) => {
        setUser((prev) => ({ ...prev, country: response.data.country_name }));
      });
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <CheckoutForm products={products} user={user} />
        </div>
      </div>
    </Elements>
  );
};

export default PaymentPage;



