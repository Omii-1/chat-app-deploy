import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import axios from "axios"
import toast from "react-hot-toast"

export const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const {setAuthUser} = useAuthContext()

  const logout = async() => {
    setLoading(true)
    try{
      const res = await axios.post("/api/v1/logout")
      if(res.data.error){
        throw new Error(res.data.error)
      }
      localStorage.removeItem("chat-user")
      toast.success(res.data.message)
      setAuthUser(null)
    }catch(err){
      toast.error(err.message)
    }finally{ 
      setLoading(false)
    }
  }

  return {loading, logout}
}