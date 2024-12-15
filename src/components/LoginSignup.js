import React from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login or Sign Up</h2>
      <button onClick={() => navigate("/home")}>Login</button>
      <button onClick={() => navigate("/home")}>Sign Up</button>
    </div>
  );
};

export default LoginSignup;
