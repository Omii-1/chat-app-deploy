LIVE - https://chat-app-om.onrender.com


Here’s a step-by-step guide to implement Stripe in a Node.js backend and a frontend where the user can:

1. Select a payment method.


2. Enter payment details.


3. Save card details.


4. Handle subscriptions or one-time payments.




---

Step 1: Set Up Your Node.js Project

1. Initialize the Project:

mkdir stripe-integration
cd stripe-integration
npm init -y


2. Install Dependencies:

npm install express stripe body-parser cors dotenv

stripe: For Stripe integration.

express: For building APIs.

body-parser: To parse incoming requests.

cors: To handle cross-origin requests.

dotenv: To manage environment variables.



3. Set Up .env:
Create a .env file for your Stripe secret keys:

STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key




---

Step 2: Backend Implementation (Node.js with Express)

Server Setup

Create a file called server.js:

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Stripe = require('stripe');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(bodyParser.json());
app.use(cors());

// Health Check Endpoint
app.get('/', (req, res) => {
    res.send('Stripe Integration API is running.');
});


---

Create a Customer (For saving card details)

When a user opts to save card details, create a Stripe customer:

app.post('/create-customer', async (req, res) => {
    const { email, name } = req.body;
    try {
        const customer = await stripe.customers.create({
            email,
            name,
        });
        res.status(200).json({ customer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


---

Setup Payment Intent (For One-Time Payment)

Payment intents handle the payment and card authentication:

app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency, paymentMethodId, customerId, saveCard } = req.body;
    try {
        // Attach payment method to customer (if saving card)
        if (saveCard && customerId) {
            await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
            await stripe.customers.update(customerId, {
                invoice_settings: { default_payment_method: paymentMethodId },
            });
        }

        // Create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            customer: customerId || undefined,
            confirm: true,
        });

        res.status(200).json({ paymentIntent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


---

Setup Subscription (For Recurring Payments)

app.post('/create-subscription', async (req, res) => {
    const { customerId, priceId, paymentMethodId } = req.body;
    try {
        // Attach payment method to customer
        await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
        await stripe.customers.update(customerId, {
            invoice_settings: { default_payment_method: paymentMethodId },
        });

        // Create Subscription
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
        });

        res.status(200).json({ subscription });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


---

Step 3: Frontend Integration with Stripe.js

Use Stripe.js to collect payment details and handle user interaction.

1. Install Stripe.js:
In your frontend project:

npm install @stripe/react-stripe-js @stripe/stripe-js


2. Setup Stripe Elements:
Create a payment form where the user can select a payment method and enter details.

import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key');

function PaymentForm({ customerId, priceId, isSubscription }) {
    const stripe = useStripe();
    const elements = useElements();
    const [saveCard, setSaveCard] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement);

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
            return;
        }

        const response = await fetch(isSubscription ? '/create-subscription' : '/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                customerId,
                priceId,
                saveCard,
            }),
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <label>
                Save Card for Future Payments
                <input type="checkbox" checked={saveCard} onChange={() => setSaveCard(!saveCard)} />
            </label>
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    );
}

export default function App() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm customerId="customer-id" priceId="price-id" isSubscription={false} />
        </Elements>
    );
}




---

Step 4: Testing the Implementation

1. Run the Backend:

node server.js


2. Use Stripe’s Test Environment:

Use test card numbers provided by Stripe: Stripe Test Cards.

Example: 4242 4242 4242 4242 (Visa).



3. Test Scenarios:

One-time payment.

Subscription with card saving.





---

Step 5: Deploy and Secure

Use HTTPS for secure communication.

Deploy the backend to a server (e.g., Heroku, AWS) and the frontend using tools like Vercel or Netlify.

Use webhooks to handle payment status updates.



---

This setup allows:

1. Saving card details for future payments.


2. Processing one-time payments.


3. Handling subscriptions dynamically.



