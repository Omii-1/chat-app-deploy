import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useSendMessages } from "../../hooks/useSendMessages";


export function MessagesInput() {

  const [message, setMessage] = useState("")
  const {loading, sendMessages} = useSendMessages()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!message) return ;
    await sendMessages(message)
    setMessage("")
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className=" text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white "
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? <span className="loading loading-spinner text-info"></span> : <BsSend size={18} className="hover:text-white"/>}         
        </button>
      </div>
    </form>
  );
}
