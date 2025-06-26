import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🌱 EcoGoals</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm">{user?.name}</span>
        <button
          onClick={logout}
          className="bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
