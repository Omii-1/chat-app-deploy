import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRecoilState } from "recoil";
import {selectedConversation} from "../../store/atoms/useConversation"
import {useGetConversations} from "../../hooks/useGetConversations"
import toast from "react-hot-toast"

export function SearchInput() {

  const [search, setSearch] = useState("")
  const [selectConversation, setSelectConversation] = useRecoilState(selectedConversation)
  const {conversations} = useGetConversations()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!search) return;

    if(search.length < 3){
      return toast.error("Search term must be at least 3 characters long")
    }

    const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()))

    if(conversation){
      setSelectConversation(conversation)
      setSearch("")
    }else{
      toast.error("No such user found!")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input type="text" placeholder="Search..." className="input input-bordered rounded-full bg-white text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500  text-white hover:text-sky-500 hover:bg-white transition-all duration-500">
        <FaSearch size={25}/>
      </button>
    </form>
  );
}
