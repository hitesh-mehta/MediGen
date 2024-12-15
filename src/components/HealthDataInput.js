import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

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
    imagingFiles: "", // Store file object, not the file path
    consent: "" ,
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
      setFormData({ ...formData, imagingFiles: file }); // Store the file directly
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
      console.log("Form Data Before anything:", formData);

      // Ensure you're appending the fields correctly, including the file
      const fields = {
        Name: formData.name,
        Age: formData.age,
        Gender: formData.gender,
        Phone: formData.phone,
        Existing_Conditions: formData.existingConditions || "",
        Allergies: formData.allergies || "",
        Past_Surgeries: formData.pastSurgeries || "",
        Ongoing_Diseases: formData.ongoingDiseases || "",
        Medications: formData.medications || "",
        Lab_Results: formData.labResults || "",
        Medical_Imaging_Files: formData.imagingFiles ? formData.imagingFiles.name : "", // Send the file name only
        Consent: formData.consent ? "Yes" : "No",
      };

      console.log("Form Data Before sending:", fields);
      
      const response = await axios.post("http://127.0.0.1:8000/generate_detailed_report/",fields, {
        headers: {
          "Content-Type": "application/json", // Ensure this is set correctly
        },
      });

      console.log("Response from the server:", response.data);
      setReport(response.data.medical_report);
      setTransplantPrompt(response.data.transplant_prompt); // Save the transplant prompt
      setShowSimulationButton(response.data.transplant_needed); // Show button if transplant is needed
    } catch (err) {
      setError("Failed to generate the report. Please check your inputs and try again.");
      console.error(err.response ? err.response.data : err.message); // Log full error for better debugging
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
