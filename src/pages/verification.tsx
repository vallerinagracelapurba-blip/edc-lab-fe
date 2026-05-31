import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Verification
        </h1>

        <input
          type="text"
          placeholder="Enter OTP Code"
          className="border w-full p-4 rounded-xl mb-5"
        />

        <button
          onClick={() => navigate("/")}
          className="w-full bg-pink-700 text-white py-3 rounded-full"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Verification;