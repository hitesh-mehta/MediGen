import React from 'react';
import AIHRecomm from "../images/AIHR.png";

const Step1 = ({ onNext }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>AI Health Recommendations</h2>
    <p style={styles.description}>Get personalized health tips based on your data.</p>
    <img src={AIHRecomm} alt="AIHealthRecomm" style={styles.image} />
    <button style={styles.button} onClick={onNext}>
      Next
    </button>
  </div>
);

const styles = {
  container: { textAlign: 'center', padding: '20px' },
  title: { fontSize: '22px', fontWeight: '600', marginBottom: '10px' },
  description: { fontSize: '16px', marginBottom: '20px' },
  image: {    
    alignSelf: 'center',
    itemalign: 'center',
    paddingBottom: '20px',
    width: '80%', // Adjust image size as needed
    height: 'auto', // Maintain aspect ratio
    margin: 'auto'
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

export default Step1;
