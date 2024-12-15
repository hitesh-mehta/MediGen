// Frontend (React + Axios)
import React, { useState } from "react";
import axios from "axios";

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
    imagingFiles: null,
    consent: false
  });

  const [report, setReport] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagingFiles: e.target.files });
  };

  const handleConsentChange = () => {
    setFormData({ ...formData, consent: !formData.consent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setReport("");
  
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "imagingFiles" && formData.imagingFiles) {
          Array.from(formData.imagingFiles).forEach((file) => {
            formDataToSend.append("imagingFiles", file);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      const response = await axios.post("http://127.0.0.1:8000/generate_detailed_report/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setReport(response.data.medical_report);
    } catch (err) {
      setError("Failed to generate the report. Please check your inputs and try again.");
      console.error(err);
    }
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
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Existing Conditions:</label>
          <input
            type="text"
            name="existingConditions"
            value={formData.existingConditions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Allergies:</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Past Surgeries:</label>
          <input
            type="text"
            name="pastSurgeries"
            value={formData.pastSurgeries}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ongoing Diseases:</label>
          <input
            type="text"
            name="ongoingDiseases"
            value={formData.ongoingDiseases}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Medications:</label>
          <input
            type="text"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Lab Results:</label>
          <input type="text" name="labResults" value={formData.labResults} onChange={handleChange} />
        </div>
        <div>
          <label>Imaging Files:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <div>
          <label>Consent:</label>
          <input type="checkbox" checked={formData.consent} onChange={handleConsentChange} /> Yes
        </div>
        <button type="submit">Submit</button>
      </form>

      {report && (
        <div>
          <h2>Generated Medical Report:</h2>
          <pre>{report}</pre>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default HealthDataInput;
