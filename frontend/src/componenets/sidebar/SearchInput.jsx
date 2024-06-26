import { FaSearch } from "react-icons/fa";

export function SearchInput() {
  return (
    <form action="" className="flex items-center gap-2">
      <input type="text" placeholder="Search..." className="input input-bordered rounded-full bg-white text-black" />
      <button type="submit" className="btn btn-circle bg-sky-500  text-white hover:text-sky-500 hover:bg-white transition-all duration-500">
        <FaSearch size={25}/>
      </button>
    </form>
  );
}
