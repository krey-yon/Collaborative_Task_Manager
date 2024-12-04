import React from "react";
import { logout } from "../utils/api";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;
