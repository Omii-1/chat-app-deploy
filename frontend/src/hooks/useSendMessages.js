import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedConversation, messages } from "../store/atoms/useConversation"
import toast from "react-hot-toast"
import axios from "axios"

export const useSendMessages = () => {

  const [loading, setLoading] = useState(false)
  const conversation = useRecoilValue(selectedConversation)
  const [messageList, setMessageList] = useRecoilState(messages)

  const sendMessages = async (message) => {
    setLoading(true)
    try{
      const res = await axios.post(`/api/v1/send/${conversation._id}`,{
        message
      })

      if(res.data.error){
        throw new Error(res.data.error)
      }

      // console.log(res.data);
      setMessageList([...messageList, res.data])
    }catch(err){
      toast.error(err.message)
    }finally{
      setLoading(false)
    }
  }
  return {loading, sendMessages}
}