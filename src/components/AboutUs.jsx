import React from "react";
import Footer from "../components/Footer"; // Import the Footer component
import "./AboutUs.css";

// Import images
import securityImage1 from "../images/security1.jpg";
import securityImage2 from "../images/security2.jpg";
import securityImage3 from "../images/security3.jpg";
import teamImage from "../images/team.jpg"; // Add a team image
import customerSupportImage from "../images/customer-support.jpg"; // Add a customer support image

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="content">
        <h2>About Us</h2>
        <p>
          At <strong>Home Surveillance Security Systems</strong>, we are committed to providing
          state-of-the-art security solutions to protect your private spaces. Our mission is to
          ensure your safety and peace of mind by offering innovative and reliable security systems.
        </p>

        {/* Section 1: Our Mission */}
        <div className="section">
          <div className="section-content">
            <div className="section-text">
              <h3>Our Mission</h3>
              <p>
                Our mission is to deliver cutting-edge security solutions that safeguard your home,
                office, or any private space. We believe in creating a secure environment where you can
                live and work without fear. With our advanced technology and dedicated team, we aim to
                make security accessible and effective for everyone.
              </p>
            </div>
            <img src={securityImage1} alt="Security System" className="section-image" />
          </div>
        </div>

        {/* Section 2: How We Protect You */}
        <div className="section">
          <div className="section-content reverse">
            <img src={securityImage2} alt="Security Monitoring" className="section-image" />
            <div className="section-text">
              <h3>How We Protect You</h3>
              <p>
                Our advanced security systems are designed to detect any unauthorized access or breaches
                in real-time. Here's how we ensure your safety:
              </p>
              <ul>
                <li>
                  <strong>Real-Time Alerts:</strong> If someone breaches your property, our system
                  immediately sends an SMS alert to your phone, keeping you informed at all times.
                </li>
                <li>
                  <strong>Video Recording:</strong> We record high-quality video footage of any
                  suspicious activity, ensuring you have evidence if needed.
                </li>
                <li>
                  <strong>24/7 Monitoring:</strong> Our systems are always active, providing round-the-clock
                  surveillance to protect your property.
                </li>
                <li>
                  <strong>Smart Integration:</strong> Our systems integrate seamlessly with your smart
                  devices, allowing you to monitor your property from anywhere.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Our Products and Services */}
        <div className="section">
          <div className="section-content">
            <div className="section-text">
              <h3>Our Products and Services</h3>
              <p>
                We offer a wide range of security products and services tailored to meet your specific
                needs. Whether you need a simple home security system or a comprehensive solution for
                your business, we have you covered:
              </p>
              <ul>
                <li>
                  <strong>Surveillance Cameras:</strong> High-definition cameras for indoor and outdoor use,
                  equipped with night vision and motion detection.
                </li>
                <li>
                  <strong>Motion Sensors:</strong> Detect movement and trigger alerts, ensuring you are
                  notified of any unusual activity.
                </li>
                <li>
                  <strong>Smart Alarms:</strong> Integrated alarms that notify you and authorities in case of
                  a breach.
                </li>
                <li>
                  <strong>Mobile App Integration:</strong> Control and monitor your security system from
                  anywhere using our user-friendly mobile app.
                </li>
                <li>
                  <strong>Professional Installation:</strong> Our team of experts will install and configure
                  your system for optimal performance.
                </li>
              </ul>
            </div>
            <img src={securityImage3} alt="Security Products" className="section-image" />
          </div>
        </div>

        {/* Section 4: Our Team */}
        <div className="section">
          <div className="section-content reverse">
            <img src={teamImage} alt="Our Team" className="section-image" />
            <div className="section-text">
              <h3>Our Team</h3>
              <p>
                Our team of security experts is passionate about keeping you safe. With years of
                experience in the industry, we bring a wealth of knowledge and expertise to every
                project. We are committed to providing personalized solutions that meet your unique
                needs.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Customer Support */}
        <div className="section">
          <div className="section-content">
            <div className="section-text">
              <h3>Customer Support</h3>
              <p>
                At <strong>Home Surveillance Security Systems</strong>, we pride ourselves on delivering
                exceptional customer support. Our team is available 24/7 to assist you with any issues
                or questions. Whether you need help setting up your system or troubleshooting an issue,
                we are here for you.
              </p>
            </div>
            <img src={customerSupportImage} alt="Customer Support" className="section-image" />
          </div>
        </div>

        {/* Section 6: Why Choose Us? */}
        <div className="section">
          <div className="section-content reverse">
            <div className="section-text">
              <h3>Why Choose Us?</h3>
              <p>
                Choosing <strong>Home Surveillance Security Systems</strong> means choosing reliability,
                innovation, and peace of mind. Here's why we stand out:
              </p>
              <ul>
                <li>
                  <strong>Expert Team:</strong> Our team of security experts is dedicated to providing the
                  best solutions.
                </li>
                <li>
                  <strong>Advanced Technology:</strong> We use the latest technology to ensure your security
                  system is always ahead of threats.
                </li>
                <li>
                  <strong>Customer-Centric Approach:</strong> We prioritize your needs and work closely with
                  you to deliver customized solutions.
                </li>
                <li>
                  <strong>Affordable Pricing:</strong> We offer competitive pricing without compromising on
                  quality.
                </li>
                <li>
                  <strong>24/7 Support:</strong> Our customer support team is always available to assist you.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;