import React from 'react';

const Step1 = ({ onNext }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>AI Health Recommendations</h2>
    <p style={styles.description}>Get personalized health tips based on your data.</p>
    <img
      src="/assets/health-recommendations.png" // Replace with actual path
      alt="AI Health Recommendations"
      style={styles.image}
    />
    <button style={styles.button} onClick={onNext}>
      Next
    </button>
  </div>
);

const styles = {
  container: { textAlign: 'center', padding: '20px' },
  title: { fontSize: '22px', fontWeight: '600', marginBottom: '10px' },
  description: { fontSize: '16px', marginBottom: '20px' },
  image: { width: '50%', marginBottom: '20px' },
  button: {
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Step1;
