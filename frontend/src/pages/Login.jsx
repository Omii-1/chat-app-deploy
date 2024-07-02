import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export function Login() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  })

  const {loading, login} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(input)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-sky-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered w-full h-10"
              value={input.username}
              onChange={(e) => setInput({...input, username: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full h-10 "
              value={input.password}
              onChange={(e) => setInput({...input, password: e.target.value})}
            />
          </div>

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} hava an account
          </Link>

          <div className="w-full flex justify-center pt-2">
            <button 
              className="btn w-full bg-sky-500 border-none text-white text-lg hover:text-sky-500 hover:bg-white h-10 transition-all duration-500"
              disabled={loading}>
              {loading ? <span className="loading loading-spinner text-info"></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
