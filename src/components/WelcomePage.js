import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomePage1 from "../images/wp.png"; // Import the image

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding'); // Navigate to the first onboarding page
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to MediGen AI</h1>
        <p style={styles.subtitle}>
          Your partner in personalized health insights and cutting-edge 3D visualization.
        </p>
        
        {/* Display the image with styles */}
        <img src={WelcomePage1} alt="Welcome" style={styles.image} />

        <button style={styles.button} onClick={handleGetStarted}>
          Get Started
        </button> 
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#E8F3FF',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  content: {
    maxWidth: '400px',
    padding: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#004B8D',
  },
  subtitle: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  image: {
    width: '100%', // Adjust image size as needed
    height: 'auto', // Maintain aspect ratio
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '50px',
    fontSize: '16px',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 4px 6px rgba(0, 123, 255, 0.2)',
  },
};

export default WelcomePage;
