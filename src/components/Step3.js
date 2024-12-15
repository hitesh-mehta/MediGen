import React from 'react';

const Step3 = ({ onComplete }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>Seamless Interaction</h2>
    <p style={styles.description}>Chat with our intelligent assistant anytime.</p>
    <img
      src="/assets/chatbot.png" // Replace with actual path
      alt="Seamless Interaction"
      style={styles.image}
    />
    <button style={styles.button} onClick={onComplete}>
      Get Started
    </button>
  </div>
);

const styles = {
  container: { textAlign: 'center', padding: '20px' },
  title: { fontSize: '22px', fontWeight: '600', marginBottom: '10px' },
  description: { fontSize: '16px', marginBottom: '20px' },
  image: { width: '50%', marginBottom: '20px' },
  button: {
    backgroundColor: '#28a745',
    color: '#FFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Step3;
