import { useRecoilState } from "recoil"
import {useSocketContext} from "../context/SocketContext"
import { messages } from "../store/atoms/useConversation"
import { useEffect } from "react"
import notificationSound from "../assets/sounds/notification.mp3"

export function useListenMessages() {
  const { socket } = useSocketContext()
  const [messageList, setMessageList] = useRecoilState(messages)

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true
      const sound = new Audio(notificationSound)
      sound.play()
      setMessageList([...messageList, newMessage])
    })

    return () => socket?.off("newMessage")
  }, [socket, setMessageList, messageList])
}

