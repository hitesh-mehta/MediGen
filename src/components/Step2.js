import React from 'react';
import Visual from "../images/Visual.png";
const Step2 = ({ onNext }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>3D Visualizations</h2>
    <p style={styles.description}>
      Experience interactive organs and learn personalized visuals.
    </p>
    <img
      src={Visual}
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
  image: {    alignSelf: 'center',
    itemalign: 'center',
    paddingBottom: '20px',
    width: '80%', // Adjust image size as needed
    height: 'auto', // Maintain aspect ratio
    margin:"auto"
  },
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
