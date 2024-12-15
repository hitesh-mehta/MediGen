import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import LoginSignup from "./components/LoginSignup";
import HomePage from "./components/HomePage";
import AppointmentPage from "./components/AppointmentPage";
import DoctorDetails from "./components/DoctorDetails";
import PaymentPage from "./components/PaymentPage";
import HealthDataInput from "./components/HealthDataInput";
import RecommendationsPage from "./components/RecommendationsPage";
import ChatbotPage from "./components/ChatbotPage";
import OnboardingContainer from "./components/OnboardingContainer";
import ThreeDSimulation from "./components/ThreeDSimulation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/onboarding" element={<OnboardingContainer />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/doctor-details" element={<DoctorDetails />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/input-health" element={<HealthDataInput />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/3d-simulation" element={<ThreeDSimulation />} />
      </Routes>
    </Router>
  );
};

export default App;
