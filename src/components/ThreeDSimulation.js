import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ThreeDSimulation = () => {
  const location = useLocation(); // Hook to access the passed location data
  const [transplantPrompt, setTransplantPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modelLink, setModelLink] = useState(""); // Store the link to the 3D model

  useEffect(() => {
    if (location.state && location.state.transplantPrompt) {
      setTransplantPrompt(location.state.transplantPrompt); // Set the prompt from the state passed
    }
  }, [location.state]);

  useEffect(() => {
    const fetch3DModel = async () => {
      if (!transplantPrompt) return;

      setLoading(true);
      setError(null);

      const YOUR_API = "msy_SgBJdCLl2QBv0aPqGW1DTfld6lcrlzL2WCO9";
      const headers = { Authorization: `Bearer ${YOUR_API}` };

      const payload = {
        mode: "preview",
        prompt: transplantPrompt,
        negative_prompt: "low quality, low resolution, low poly, ugly",
        art_style: "sculpture",
        should_remesh: true,
      };

      try {
        // Step 1: Generate preview
        const response_preview = await axios.post(
          "https://api.meshy.ai/openapi/v2/text-to-3d",
          payload,
          { headers }
        );
        const prevResult = response_preview.data.result;
        console.log("Preview result:", prevResult);
        if (!prevResult) {
          throw new Error("Failed to generate preview model");
        }

        // Wait for 3 minutes before moving to the next step
        await new Promise((resolve) => setTimeout(resolve, 3 * 60 * 1000));

        try {
          // Step 2: Refine the model
          const new_payload = {
            mode: "refine",
            enable_pbr: true,
            preview_task_id: prevResult, // Use preview result as the task ID
            texture_richness: "medium",
          };

          const response_refine = await axios.post(
            "https://api.meshy.ai/openapi/v2/text-to-3d",
            new_payload,
            { headers }
          );
          const result = response_refine.data.result;
          console.log("Refine result:", result);

          if (!result) {
            throw new Error("Failed to refine the model");
          }

          // Wait for 4 minutes for final model
          await new Promise((resolve) => setTimeout(resolve, 4 * 60 * 1000));

          // Step 3: Get the final 3D model link
          const taskId = result;
          const get_response = await axios.get(
            `https://api.meshy.ai/openapi/v2/text-to-3d/${taskId}`,
            { headers }
          );

          const modelUrl = get_response.data.model_urls.obj;
          console.log("Final model URL:", modelUrl);
          setModelLink(modelUrl);
        } catch (error) {
          console.error("Error refining the model:", error.response?.data || error.message);
          throw new Error("Error refining the model");
        }
      } catch (error) {
        setError(error.message || "Error fetching 3D model. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetch3DModel();
  }, [transplantPrompt]);

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "2rem auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h1 style={{ color: "#0056b3", marginBottom: "1.5rem" }}>3D Organ Simulation</h1>

      {loading ? (
        <p style={{ fontSize: "1.1rem", color: "#888" }}>Loading 3D model...</p>
      ) : error ? (
        <p style={{ fontSize: "1.1rem", color: "red" }}>{error}</p>
      ) : modelLink ? (
        <div>
          <h2 style={{ color: "#007b5e", marginBottom: "1rem" }}>
            3D Model Generated Successfully
          </h2>
          <a
            href={modelLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.8rem 1.5rem",
              backgroundColor: "#28a745",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
          >
            View 3D Model
          </a>
        </div>
      ) : (
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          No transplant simulation required.
        </p>
      )}
    </div>
  );
};

export default ThreeDSimulation;
