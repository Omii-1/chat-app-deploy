import { BiLogOutCircle } from "react-icons/bi";

export function LogoutButton() {
  return (
    <div className="mt-auto">
      <BiLogOutCircle size={35} className="hover:text-sky-500 cursor-pointer transition-all duration-300"/>
    </div>
  )
}
