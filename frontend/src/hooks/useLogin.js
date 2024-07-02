import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import axios from "axios"

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const {setAuthUser} = useAuthContext()

  const login = async({username, password}) => {
    const success = handleInputErrors({username, password})
    if(!success) return ;
    setLoading(true)
    try {
      const res = await axios.post("/api/v1/login",{
        username,
        password
      })
      if(res.data.error){
        console.log(res.data.error);
        throw new Error(res.data.error)
      }
      localStorage.setItem("chat-user", JSON.stringify(res.data))
      console.log(res.data);
      setAuthUser(res.data)
      toast.success(res.data.message)
    } catch (err) {
      if (err.response && err.response.status === 400) {
        if (err.response.data.error === "Invalid username and password") {
          toast.error("Invalid username and password");
        } else {
          toast.error(err.response.data.error);
        }
      } else {
        toast.error(err.message);
      }
    }finally{
      setLoading(false)
    }
  }

  return {loading, login}
}

const handleInputErrors = ({username, password}) => {
  if(!username || !password){
    toast.error("Please fill all input fields")
    return false
  }
  if(password.length < 6){
    toast.error("Password must be atleast 6 character")
    return false
  }
  return true
}