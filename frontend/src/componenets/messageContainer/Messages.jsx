import { useGetMessages } from "../../hooks/useGetMessages"
import { Message } from "./Message"
import { SkeletonMessages } from "../SkeletonMessages"
import { useEffect, useRef } from "react"
import { useListenMessages } from "../../hooks/useListenMessages"

export function Messages() {
  const {loading, messagesList} = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current.scrollIntoView({behavior: "smooth"})
    }, 100);
  } , [messagesList])
  
  return (
    <div className="flex flex-col flex-1 px-4 py-2 overflow-auto">
      {loading && (
        <SkeletonMessages />
      )}

      {!loading && messagesList.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
  
      {!loading && messagesList.length > 0 && (
        messagesList.map((message, key) => (
          <div key={key} ref={lastMessageRef}>
            <Message messages={message} />        
          </div>
          )
        )
      )}
    </div>
  )
}
