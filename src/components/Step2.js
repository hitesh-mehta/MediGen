import React from 'react';

const Step2 = ({ onNext }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>3D Visualizations</h2>
    <p style={styles.description}>
      Experience interactive organs and learn personalized visuals.
    </p>
    <img
      src="/assets/3d-visualizations.png" // Replace with actual path
      alt="3D Visualizations"
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

export default Step2;
