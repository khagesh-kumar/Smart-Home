import React from "react";
import Footer from "../components/Footer"; // Import the Footer component
import "./HowItWorks.css";

// Import images for each step
import signUpImage from "../images/sign-up.jpg"; // Image for Step 1
import exploreFeaturesImage from "../images/explore-features.jpg"; // Image for Step 2
import startUsingImage from "../images/start-using.jpg"; // Image for Step 3

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <div className="content">
        <h2>How It Works</h2>
        <p>
          Our platform is designed to streamline your workflow and make tasks easier. Here's how it works:
        </p>

        <div className="steps">
          <div className="step">
            <img src={signUpImage} alt="Sign Up" className="step-image" />
            <h3>Step 1: Sign Up</h3>
            <p>Create an account to get started. It's quick and easy!</p>
          </div>
          <div className="step">
            <img src={exploreFeaturesImage} alt="Explore Features" className="step-image" />
            <h3>Step 2: Explore Features</h3>
            <p>Discover all the features and tools available to you.</p>
          </div>
          <div className="step">
            <img src={startUsingImage} alt="Start Using" className="step-image" />
            <h3>Step 3: Start Using</h3>
            <p>Begin using the platform to manage your tasks and projects efficiently.</p>
          </div>
        </div>
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default HowItWorks;