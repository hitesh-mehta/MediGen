import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-sky-100 to-white px-6 pt-8 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-gray-800 text-lg font-semibold">Welcome !</h2>
          <p className="text-gray-600 text-sm">Anushka</p>
          <p className="text-gray-500 text-xs mt-1">
            Your health at your fingertips!
          </p>
        </div>
        <img
          src="https://via.placeholder.com/40" // Replace with the actual user avatar URL
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-4">
        <input
          type="text"
          placeholder="Search doctor, drugs, articles..."
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* AI Health Recommendations */}
      <div className="mt-4 px-4">
        <div className="bg-blue-100 rounded-lg p-4 shadow">
          <h3 className="text-blue-800 font-semibold mb-1">
            AI Health Recommendations
          </h3>
          <p className="text-gray-700 text-sm">
            ✨ <span className="font-medium">Your AI Health Tips:</span>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Stay hydrated and follow a balanced diet.
          </p>
        </div>
      </div>

      {/* Book Appointment */}
      <div className="mt-4 px-4">
        <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg shadow">
          Book an Appointment
        </button>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-around px-4">
        <button
          className="bg-green-200 text-green-800 font-medium py-2 px-4 rounded-lg shadow hover:bg-green-300"
          onClick={() => navigate("/input-health")}
        >
          Input Your Health Data
        </button>
        <button
          className="bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-300"
          onClick={() => navigate("/3d-simulation")}
        >
          View 3D Simulations
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around py-3">
        <button className="flex flex-col items-center text-blue-600">
          <i className="fas fa-home text-lg"></i>
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <i className="fas fa-clipboard-list text-lg"></i>
          <span className="text-xs">Recommendations</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <i className="fas fa-cog text-lg"></i>
          <span className="text-xs">Settings</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <i className="fas fa-user text-lg"></i>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
