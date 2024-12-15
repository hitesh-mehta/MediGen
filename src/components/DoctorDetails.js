import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorDetails = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Doctor Details</h2>
      <button onClick={() => navigate("/payment")}>Book Appointment</button>
    </div>
  );
};

export default DoctorDetails;
