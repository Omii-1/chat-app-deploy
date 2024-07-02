import { useGetConversations } from "../../hooks/useGetConversations"
import {Conversation} from "./Conversation"  
import { getRandomEmoji } from "../../utils/emojis"

export const Conversations = () => {
  const {loading, conversations} = useGetConversations()

  return (
    <div className="py-2 flex flex-col overflow-auto">

      { conversations.map((data, idx) => (
        <Conversation
          key={data._id}
          conversation = {data}
          emoji = {getRandomEmoji()}
          lastIdx = {idx === conversations.length - 1}
        />
      ))}
      
      {loading ? <span className="loading loading-spinner text-info mx-auto"></span> : null}

    </div>
  )
}
