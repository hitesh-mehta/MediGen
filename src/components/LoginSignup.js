import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebase"; // Firebase configuration file

const auth = getAuth(app);
const db = getFirestore(app);

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true); // Toggle between login and signup
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle authentication logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new action
    try {
      if (isSignup) {
        // Sign-Up logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
        });

        console.log("User signed up:", user); // Debugging: Log user data
        navigate("/home"); // Redirect to home page after successful sign-up
      } else {
        // Login logic
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/home"); // Redirect to home page after successful login
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("The email is already in use. Please login.");
      } else {
        setError(err.message); // Display general error messages
      }
      console.error("Authentication Error:", err); // Debugging: Log error details
    }
  };

  // Inline styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "'Arial', sans-serif",
    },
    card: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "300px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1rem",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      marginTop: "10px",
    },
    toggle: {
      marginTop: "15px",
      fontSize: "0.9rem",
      color: "#555",
      cursor: "pointer",
    },
    error: {
      color: "red",
      marginTop: "10px",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p style={styles.toggle} onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Login here"
            : "Don't have an account? Sign up here"}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
