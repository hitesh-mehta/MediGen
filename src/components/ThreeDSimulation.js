import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ThreeDSimulation = () => {
  const location = useLocation(); // Hook to access the passed location data
  const [transplantPrompt, setTransplantPrompt] = useState("");

  useEffect(() => {
    if (location.state && location.state.transplantPrompt) {
      setTransplantPrompt(location.state.transplantPrompt); // Set the prompt from the state passed
    }
  }, [location.state]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>3D Organ Simulation</h1>
      {transplantPrompt ? (
        <div>
          <h2>Simulation Request:</h2>
          <p>{transplantPrompt}</p>
          {/* You can integrate a 3D visualization or simulation here */}
          {/* For example: Use a library like Three.js to visualize the organ */}
        </div>
      ) : (
        <p>No transplant simulation required.</p>
      )}
    </div>
  );
};

export default ThreeDSimulation;
