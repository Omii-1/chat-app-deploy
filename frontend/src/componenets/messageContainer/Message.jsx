import { useRecoilValue } from "recoil";
import { useAuthContext } from "../../context/AuthContext";
import {selectedConversation} from "../../store/atoms/useConversation"

export function Message({messages}) {
  const {authUser} = useAuthContext()
  const receiverUser = useRecoilValue(selectedConversation)

  const date = new Date(messages.updatedAt);
  const options = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  };
  const formattedDate = date.toLocaleString("en-GB", options);

  const isSender = messages.senderId === authUser._id
  const chatClassName = isSender ? "chat-end" : "chat-start"
  const profilePic = isSender ? authUser.profilePic : receiverUser.profilepic
  const bubbleColor = isSender ? "bg-blue-500" : ""
  const shouldShake = messages.shouldShake ? "shake" : ""

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full"> 
          <img src={profilePic} alt="Tailwind css chat bubble component" />
        </div>
      </div>
      <div className={`chat-bubble ${shouldShake} text-white ${bubbleColor}`}>{messages.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedDate}</div>
    </div>
  )
}
