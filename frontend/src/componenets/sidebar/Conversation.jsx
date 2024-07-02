import { useRecoilState } from "recoil";
import { selectedConversation } from "../../store/atoms/useConversation"
import { useSocketContext } from "../../context/SocketContext";

export const Conversation =({ conversation, emoji, lastIdx }) => {

  const [selected, setSelected] = useRecoilState(selectedConversation)
  const isSelected = selected._id === conversation._id
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-400 transition-all duration-300 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
      onClick={() => setSelected(conversation)}
      >
        
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilepic}
              alt="User Avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullname}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>

      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}
