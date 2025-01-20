import React from "react";
import Footer from "../components/Footer"; // Import the Footer component
import "./Products.css";

// Import product images
import cameraImage from "../images/camera.jpg";
import videoStorageImage from "../images/video-storage.jpg"; // New image for Video Storage Server
import alarmImage from "../images/alarm.jpg";
import mobileAppImage from "../images/mobile-app.jpg";
import installationImage from "../images/installation.jpg";
import monitoringImage from "../images/monitoring.jpg";

const Products = () => {
  const products = [
    { id: 1, name: "Surveillance Cameras", description: "", image: cameraImage },
    { id: 2, name: "Video Storage Server (MongoDB)", description: "", image: videoStorageImage },
    { id: 3, name: "Smart Alarms", description: "", image: alarmImage },
    { id: 4, name: "Mobile App Integration", description: "", image: mobileAppImage },
    { id: 5, name: "Professional Installation", description: "", image: installationImage },
    { id: 6, name: "24/7 Monitoring", description: "", image: monitoringImage },
  ];

  return (
    <div className="products">
      <div className="content">
        <h2>Our Products</h2>
        <p>Explore our range of high-quality products tailored to meet your requirements.</p>

        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default Products;