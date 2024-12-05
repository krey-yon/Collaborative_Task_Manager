import React, { useState, useEffect } from "react";
// import LogoutButton from "../Components/LogoutButton";
import TodoList from "../Components/Todolist";
import { getUserIdFromToken } from "../api/auth";

const Dashboard: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const id = getUserIdFromToken();
    setUserId(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p className="text-lg mb-4">
        <span className="font-bold text-primary">User ID:</span> {userId}
      </p>

      <TodoList />
      {/* <LogoutButton /> */}
    </div>
  );
};

export default Dashboard;
