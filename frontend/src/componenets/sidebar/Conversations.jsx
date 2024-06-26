import { Conversation } from "./Conversation"  

export function Conversations() {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  )
}
