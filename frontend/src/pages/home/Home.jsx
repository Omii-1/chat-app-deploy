import { Sidebar } from "../../componenets/sidebar/Sidebar"
import { MessageContainer } from "../../componenets/messageContainer/MessageContainer"

export function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />

    </div>
  )
}