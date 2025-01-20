import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import "./Navbar.css";
import Logo from "../images/Logo.png"; // Import the logo image

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/dashboard"); // Redirect to the Dashboard page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard" className="navbar-brand">
          {/* Replace text with logo image */}
          <img src={Logo} alt="Logo" className="navbar-logo-img" />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard" className="navbar-link">
          Dashboard
        </Link>
        <Link to="/how-it-works" className="navbar-link">
          How It Works
        </Link>
        <Link to="/products" className="navbar-link">
          Products
        </Link>
        <Link to="/about-us" className="navbar-link">
          About Us
        </Link>
      </div>

      <div className="navbar-profile">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="profile-avatar">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU-rxXTrx4QdTdwIpw938VLL8EuJiVhCelkQ&s/40"
              alt="profile"
              className="rounded-circle"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {!isLoggedIn ? (
              <>
                <Dropdown.Item as={Link} to="/login">
                  Login Here
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/signup">
                  Create an Account
                </Dropdown.Item>
              </>
            ) : (
              <Dropdown.Item as="button" onClick={logoutHandler}>
                Logout
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;