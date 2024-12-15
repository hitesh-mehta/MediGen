import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const HealthDataInput = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "",
    phone: "",
    existingConditions: "",
    allergies: "",
    pastSurgeries: "",
    ongoingDiseases: "",
    medications: "",
    labResults: "",
    imagingFiles: "", // Store only file path here
    consent: "",
  });

  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const [showSimulationButton, setShowSimulationButton] = useState(false); // New state to handle button visibility
  const [transplantPrompt, setTransplantPrompt] = useState(""); // State to hold the transplant prompt for simulation

  const navigate = useNavigate(); // Hook to handle routing

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Only allow one file
    if (file) {
      setFormData({ ...formData, imagingFiles: file.path || file.name }); // Send only the path or name
    }
  };

  const handleConsentChange = () => {
    setFormData({ ...formData, consent: !formData.consent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setReport("");
    setShowSimulationButton(false); // Reset the button to inactive when submitting

    try {
      const formDataToSend = new FormData();
      
      // Ensure all fields are added, with empty strings for non-required fields that are empty
      const fields = {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        phone: formData.phone,
        existingConditions: formData.existingConditions || "",
        allergies: formData.allergies || "",
        pastSurgeries: formData.pastSurgeries || "",
        ongoingDiseases: formData.ongoingDiseases || "",
        medications: formData.medications || "",
        labResults: formData.labResults || "",
        imagingFiles: formData.imagingFiles, // Path of the file will be sent here
        consent: formData.consent,
      };

      // Append each field to the FormData object
      Object.keys(fields).forEach((key) => {
        formDataToSend.append(key, fields[key]);
      });

      const response = await axios.post("http://127.0.0.1:8000/generate_detailed_report/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      setReport(response.data.medical_report);
      setTransplantPrompt(response.data.transplant_prompt); // Save the transplant prompt
      setShowSimulationButton(response.data.transplant_needed); // Show button if transplant is needed
    } catch (err) {
      setError("Failed to generate the report. Please check your inputs and try again.");
      console.error(err);
    }
  };

  const handleShowSimulation = () => {
    // Pass the transplantPrompt to the 3D simulation page
    navigate("/3d-simulation", {
      state: { transplantPrompt }, // Pass state to the 3D simulation component
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial" }}>
      <h1>Generate Medical Report</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Existing Conditions:</label>
          <textarea name="existingConditions" value={formData.existingConditions} onChange={handleChange} />
        </div>
        <div>
          <label>Allergies:</label>
          <textarea name="allergies" value={formData.allergies} onChange={handleChange} />
        </div>
        <div>
          <label>Past Surgeries:</label>
          <textarea name="pastSurgeries" value={formData.pastSurgeries} onChange={handleChange} />
        </div>
        <div>
          <label>Ongoing Diseases:</label>
          <textarea name="ongoingDiseases" value={formData.ongoingDiseases} onChange={handleChange} />
        </div>
        <div>
          <label>Medications:</label>
          <textarea name="medications" value={formData.medications} onChange={handleChange} />
        </div>
        <div>
          <label>Lab Results:</label>
          <textarea name="labResults" value={formData.labResults} onChange={handleChange} />
        </div>
        <div>
          <label>Medical Imaging Files:</label>
          <input type="file" name="imagingFiles" onChange={handleFileChange} />
        </div>
        <div>
          <label>
            <input type="checkbox" checked={formData.consent} onChange={handleConsentChange} />
            I consent to share my data for medical analysis
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      {report && <div style={{ marginTop: "20px" }}>{report}</div>}
      {showSimulationButton && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleShowSimulation}>Start 3D Simulation</button>
        </div>
      )}
    </div>
  );
};

export default HealthDataInput;
