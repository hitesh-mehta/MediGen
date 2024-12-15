import React from "react";
import { useNavigate } from "react-router-dom";

const RecommendationsPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>AI Health Recommendations</h2>
      <button onClick={() => navigate("/simulations")}>View 3D Simulations</button>
      <button onClick={() => navigate("/chatbot")}>Chat with AI Assistant</button>
    </div>
  );
};

export default RecommendationsPage;