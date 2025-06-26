import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/"); // ✅ Go directly to dashboard
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Register
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full border mb-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border mb-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border mb-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold p-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
