import { BiLogOutCircle } from "react-icons/bi";
import { useLogout } from "../../hooks/useLogout";

export function LogoutButton() {
  const {logout} = useLogout()
  return (
    <div className="mt-auto">
      <BiLogOutCircle size={35} className="hover:text-sky-500 cursor-pointer transition-all duration-300"
      onClick={logout}
      />
    </div>
  )
}
