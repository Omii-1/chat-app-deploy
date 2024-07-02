import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([])

  useEffect(()=>{
    const getConversations = async() => {
      setLoading(true)
      try{
        const res = await axios.get("/api/v1")
        if(res.data.error){
          throw new Error(res.data.error)
        }
        setConversations(res.data)
      }catch(err){
        toast.error(err.message)
      }finally{
        setLoading(false)
      }
    }

    getConversations()
  },[])

  return {loading, conversations}
}