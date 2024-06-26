import { BsSend } from "react-icons/bs";

export function MessagesInput() {
  return (
    <form action="" className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className=" text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white "
          placeholder="Send a message"
        />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3">
          <BsSend size={18} className="hover:text-white"/>
        </button>
      </div>
    </form>
  );
}
