import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Dashboard.css";

// Import images
import slider1 from "../images/slider1.png";
import slider2 from "../images/slider2.png";
import slider3 from "../images/slider3.png";
import slider4 from "../images/slider4.png";
import slider5 from "../images/slider5.png";
import slider6 from "../images/slider6.png";
import howItWorksImage from "../images/how-it-works.png";

// Import new product images
import product1 from "../images/product1.jpg";
import product2 from "../images/product2.jpg";
import product3 from "../images/product3.jpg";
import product4 from "../images/product4.jpg";
import product5 from "../images/product5.jpg";
import product6 from "../images/product6.jpg";
import product7 from "../images/product7.jpg";
import product8 from "../images/product8.jpg";
import product9 from "../images/product9.jpg";
import product10 from "../images/product10.jpg";

const Dashboard = () => {
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "CP-URC-TC51PL3C", description: "5MP IR Bullet Camera - 30Mtr.", image: product1 },
    { id: 2, name: "CP-UNC-BE51T-VMDS-V2", description: "5MP WDR Network Box Camera", image: product2 },
    { id: 3, name: "CP-URC-TC24PL3", description: "2.4MP IR Bullet Camera - 30Mtr.", image: product3 },
    { id: 4, name: "CP-UNR-4K4164-FI", description: "16Ch. 4K AI Network Video Recorder", image: product4 },
    { id: 5, name: "CP-UNR-4K4322-V4", description: "32 Ch. 4K Network Video Recorder", image: product5 },
    { id: 6, name: "CP-UNR-4K5324-V3", description: "32 Ch. H.265 Network Video Recorder", image: product6 },
    { id: 7, name: "KEIR Alarm Siren Speaker ", description: "Home Alarm Siren Security Protection System", image: product7 },
    { id: 8, name: "Monitored Home Alarm Systems", description: "enhance your home security and safety.", image: product8 },
    { id: 9, name: "Siren", description: "Home Alarm Siren Security Protection System", image: product9 },
    { id: 10, name: "Mini Server", description: "32 Ch. H.265 Network Video Recorder", image: product10 },
  ];

  const handleNext = () => {
    if (startIndex + 5 < products.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar at the top */}
      <Navbar isLoggedIn={false} />

      {/* Dashboard Section */}
      <div className="section dashboard-section">
        {/* Bootstrap Carousel */}
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
              <img src={slider1} className="d-block w-100" alt="Slide 1" />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img src={slider2} className="d-block w-100" alt="Slide 2" />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img src={slider3} className="d-block w-100" alt="Slide 3" />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img src={slider4} className="d-block w-100" alt="Slide 4" />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img src={slider5} className="d-block w-100" alt="Slide 5" />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img src={slider6} className="d-block w-100" alt="Slide 6" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Welcome Message */}
        <div className="welcome-message">
          <h2>Welcome to the Dashboard</h2>
          <p>
            Get a quick overview of all your activities and manage them
            efficiently from here.
          </p>
          <div className="buttons">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-start"
            >
              Login
            </button>
            <a href="#how-it-works" className="btn btn-read-more">
              Read More
            </a>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="section how-it-works-section" id="how-it-works">
        <div className="how-it-works-content">
          <div className="how-it-works-text">
            <h2>How It Works</h2>
            <p>
              Our platform is designed to streamline your workflow and make
              tasks easier. Whether it's managing your projects, connecting
              with your team, or keeping track of progress, we've got you
              covered. Here's how it works:
            </p>
            <ul>
              <li>Easy-to-use interface for all your needs.</li>
              <li>Seamless integration with your favorite tools.</li>
              <li>Real-time updates to keep you in the loop.</li>
            </ul>
            <a href="#products" className="btn btn-read-more">
              Read More
            </a>
          </div>
          <div className="how-it-works-image">
            <img
              src={howItWorksImage}
              alt="How It Works"
              className="responsive-image"
            />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="section products-section" id="products">
        <h2>Our Products</h2>
        <p>
          Explore our range of high-quality products tailored to meet your
          requirements.
        </p>

        {/* Cards Section */}
        <div className="product-cards-container">
          <button onClick={handlePrev} className="arrow-left" disabled={startIndex === 0}>
            &lt;
          </button>
          <div className="product-cards-wrapper">
            {products.slice(startIndex, startIndex + 5).map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="arrow-right"
            disabled={startIndex + 5 >= products.length}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;