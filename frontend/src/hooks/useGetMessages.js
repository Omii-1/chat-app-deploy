import { useEffect, useState } from "react"
import axios from "axios"
import { useRecoilState, useRecoilValue } from "recoil"
import {selectedConversation, messages} from "../store/atoms/useConversation"
import toast from "react-hot-toast"

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const [messagesList, setMessagesList] = useRecoilState(messages)
  const conversation = useRecoilValue(selectedConversation)

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true)
      try{
        const res = await axios.get(`/api/v1/${conversation._id}`)
        console.log(res.data)
        if(res.data.error){
          throw new Error(res.data.error)
        }
        setMessagesList(res.data)
      } catch(err) {
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }

    if(conversation._id){
      getMessage()
    }

  }, [conversation._id, setMessagesList])

  return {loading, messagesList}

}
