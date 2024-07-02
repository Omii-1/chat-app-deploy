import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

export function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const {loading, signup} = useSignup()

  const genderChange = (gender) => {
    setInput({...input, gender})
  }
  const handleSubmit = async(e) => {
      e.preventDefault()
      await signup(input)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-sky-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="input input-bordered w-full h-10"
              value={input.fullname}
              onChange={(e) => setInput({...input, fullname: e.target.value})}
            />
          </div>

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
              onChange={(e) => setInput({...input, password:e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full h-10 "
              value={input.confirmPassword}
              onChange={(e) => setInput({...input, confirmPassword:e.target.value})}
            />
          </div>

          {/* gender checkox */}
          <div className="flex gap-4">
            <div className="form-control">
              <label className="cursor-pointer label flex gap-2 ">
                <span className="label-text">Male</span>
                <input
                  type="checkbox"
                  className="checkbox border-gray-600 [--chkbg:theme(colors.blue.500)] [--chkfg:white] checked:border-none"
                  checked={input.gender == "male"}
                  onChange={ () => genderChange("male") }
                />
              </label>
            </div>

            <div className="form-control">
              <label className="cursor-pointer label flex gap-2">
                <span className="label-text">Female</span>
                <input
                  type="checkbox"
                  className="checkbox border-gray-600 [--chkbg:theme(colors.blue.500)] [--chkfg:white] checked:border-none"
                  checked={input.gender == "female"}
                  onChange={ () => genderChange("female") }
                />
              </label>
            </div>
          </div>

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 inline-block"
          >
            Already hava an account ?
          </Link>

          <div className="w-full flex justify-center pt-2">
            <button
              className="btn w-full bg-sky-500 border-none text-white text-xl hover:text-sky-500 hover:bg-white transition-all duration-500"
              disabled = {loading}
            >
              {loading ? <span className="loading loading-spinner text-info"></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
