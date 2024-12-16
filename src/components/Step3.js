import React from 'react';
import Seamless from "../images/Seamless.png";
const Step3 = ({ onComplete }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>Seamless Interaction</h2>
    <p style={styles.description}>Chat with our intelligent assistant anytime.</p>
    <img
      src={Seamless}
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
  image: {
    paddingBottom: '20px',
    alignSelf: 'center',
    itemalign: 'center',
    width: '80%', // Adjust image size as needed
    height: 'auto', // Maintain aspect ratio
    margin:"auto",
  },
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
