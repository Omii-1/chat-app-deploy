import { useRecoilState } from "recoil";
import { useAuthContext } from "../../context/AuthContext";
import { selectedConversation } from "../../store/atoms/useConversation"
import { Messages } from "./Messages"
import { MessagesInput } from "./MessagesInput"
import { TiMessages } from "react-icons/ti";
import { useEffect } from "react";

export function MessageContainer() {
  const [chatSelected, setChatSelected] = useRecoilState(selectedConversation)

  useEffect(() => {
    return () => setChatSelected("")
  }, [setChatSelected])

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {chatSelected ? 
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text text-white">To </span><span className="text-sky-500 font-bold">{chatSelected.fullname}</span>

          </div>
            <Messages />
            <MessagesInput />
        </>
      :
      <NoChatSelected />
    }
    </div>
  )
}

const NoChatSelected = () => {
  const {authUser} = useAuthContext()
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col  items-center">
        <p>Welcome 👋 {authUser.fullname} ❄️</p>
        <p>Select a chat to start messaging</p>
        <TiMessages size={50} />
      </div>
    </div>
  )
}