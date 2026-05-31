import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      <div className="w-[35%] bg-pink-100 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-pink-700">
          EDC LAB
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-[350px]">
          <h1 className="text-3xl font-bold mb-8">
            Sign Up
          </h1>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              className="border p-3 rounded-xl"
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-xl"
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-xl"
            />

            <button
              onClick={() => navigate("/verification")}
              className="bg-pink-700 text-white py-3 rounded-full"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;