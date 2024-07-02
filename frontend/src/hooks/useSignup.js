import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()

  const signup = async ({
    fullname,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullname,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    setLoading(true);

    try {
      const res = await axios.post("/api/v1/signup", {
        fullname,
        username,
        password,
        confirmPassword,
        gender,
      });

      if(res.data.error){
        throw new Error(res.data.error)
      }

      console.log(res.data);
      toast.success(res.data.msg)

      localStorage.setItem("chat-user", JSON.stringify(res.data))
      setAuthUser(res.data)
    } catch (err) {
      if (err.response && err.response.status === 400) {
        if (err.response.data.error === "User already exist") {
          toast.error("User already exists");
        } else {
          toast.error(err.response.data.error);
        }
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

const handleInputErrors = ({
  fullname,
  username,
  password,
  confirmPassword,
  gender,
}) => {
  if (!fullname || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all input fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password do not mach");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atleast 6 character");
    return false;
  }

  return true;
};
