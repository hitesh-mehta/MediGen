import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HealthDataInput = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    existingConditions: "",
    allergies: "",
    pastSurgeries: "",
    ongoingDiseases: "",
    medications: "",
    labResults: "",
    imagingFiles: "",
    consent: false,
  });

  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const [showSimulationButton, setShowSimulationButton] = useState(false);
  const [transplantPrompt, setTransplantPrompt] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagingFiles: file });
    }
  };

  const handleConsentChange = () => {
    setFormData({ ...formData, consent: !formData.consent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setReport("");
    setShowSimulationButton(false);

    try {
      const fields = {
        Name: formData.name,
        Age: formData.age,
        Gender: formData.gender,
        Phone: formData.phone,
        Existing_Conditions: formData.existingConditions,
        Allergies: formData.allergies,
        Past_Surgeries: formData.pastSurgeries,
        Ongoing_Diseases: formData.ongoingDiseases,
        Medications: formData.medications,
        Lab_Results: formData.labResults,
        Medical_Imaging_Files: formData.imagingFiles
          ? formData.imagingFiles.name
          : "",
        Consent: formData.consent ? "Yes" : "No",
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/generate_detailed_report/",
        fields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setReport(response.data.medical_report);
      setTransplantPrompt(response.data.transplant_prompt);
      setShowSimulationButton(response.data.transplant_needed);
    } catch (err) {
      setError(
        "Failed to generate the report. Please check your inputs and try again."
      );
      console.error(err.response ? err.response.data : err.message);
    }
  };

  const handleShowSimulation = () => {
    navigate("/3d-simulation", {
      state: { transplantPrompt },
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "2rem auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#0056b3" }}>
        Generate Medical Report
      </h1>
      <form onSubmit={handleSubmit}>
        {/** Name, Age, Phone */}
        {["name", "age", "phone"].map((field) => (
          <div key={field}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type={field === "age" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.6rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
        ))}

        {/** Gender Dropdown */}
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Gender:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.6rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              backgroundColor: "#fff",
            }}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/** Textarea Inputs */}
        {[
          "existingConditions",
          "allergies",
          "pastSurgeries",
          "ongoingDiseases",
          "medications",
          "labResults",
        ].map((field) => (
          <div key={field}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              {field
                .replace(/([A-Z])/g, " $1")
                .trim()
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </label>
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.6rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                resize: "none",
              }}
            />
          </div>
        ))}

        {/** File Input */}
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Medical Imaging Files:
        </label>
        <input
          type="file"
          name="imagingFiles"
          onChange={handleFileChange}
          style={{
            marginBottom: "1rem",
          }}
        />

        {/** Consent Checkbox */}
        <label>
          <br></br>
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={handleConsentChange}
            style={{ marginRight: "0.5rem" }}
          />
          I consent to share my data for medical analysis
        </label>

        {/** Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.8rem",
            backgroundColor: "#0056b3",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            marginTop: "1rem",
          }}
        >
          Submit
        </button>
      </form>

      {/** Error Message */}
      {error && (
        <div style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
          {error}
        </div>
      )}

      {/** Report Section */}
      {report && (
        <div
          style={{
            marginTop: "1rem",
            backgroundColor: "#e9f5ff",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>Medical Report:</h3>
          <p>{report}</p>
        </div>
      )}

      {/** Simulation Button */}
      {showSimulationButton && (
        <button
          onClick={handleShowSimulation}
          style={{
            marginTop: "1rem",
            width: "100%",
            padding: "0.8rem",
            backgroundColor: "#00a86b",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Start 3D Simulation
        </button>
      )}
    </div>
  );
};

export default HealthDataInput;
