export function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="input input-bordered w-full h-10"
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
            />
          </div>

          <div className="flex gap-4">
            <div className="form-control">
              <label className="cursor-pointer label flex gap-2">
                <span className="label-text">Male</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox border-gray-600 [--chkbg:theme(colors.blue.500)] [--chkfg:white] checked:border-none"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="cursor-pointer label flex gap-2">
                <span className="label-text">Female</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox border-gray-600 [--chkbg:theme(colors.blue.500)] [--chkfg:white] checked:border-none"
                />
              </label>
            </div>
          </div>

          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 inline-block"
          >
            Already hava an account ?
          </a>

          <div className="w-full flex justify-center pt-2">
            <button className="btn w-full bg-sky-500 border-none text-white text-xl hover:text-sky-500 hover:bg-white transition-all duration-500">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
