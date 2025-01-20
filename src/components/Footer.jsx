import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Footer.css";

const Footer = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8f81r4n", // Replace with your Service ID
        "template_beq9uli", // Replace with your Template ID
        form.current,
        "WimvckfZ8y-IR1d1_gMdr" // Replace with your User ID
      )
      .then(
        (result) => {
          console.log("Email sent successfully!", result.text);
          alert("Your message has been sent!");
          form.current.reset();
        },
        (error) => {
          console.error("Failed to send email:", error.text);
          alert("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Contact Form */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
            {/* Hidden input for recipient email */}
            <input
              type="hidden"
              name="to_email"
              value="22bk5a1204@stpetershyd.com"
            />
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Map */}
        <div className="footer-section">
          <h3>Our Location</h3>
          <div className="map">
            <iframe
              title="St. Peter's Engineering College"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.773997887323!2d78.44863487516903!3d17.565943583352034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f0aa384c7bd%3A0x920ffa3cc552278a!2sSt.%20Peter%E2%80%99s%20Engineering%20College!5e0!3m2!1sen!2sin!4v1737381060730!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Professional Details */}
        <div className="footer-section">
          <h3>Professional Details</h3>
          <p>
            <strong>Address:</strong> 123 Main Street, City, Country
          </p>
          <p>
            <strong>Email:</strong> support@example.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
          <div className="social-media">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <small>
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
