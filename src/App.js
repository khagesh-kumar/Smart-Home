import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./components/HowItWorks";
import Products from "./components/Products";
import AboutUs from "./components/AboutUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main"; // Import the Main component
import DetailsPage from "./pages/Details"; // Import the DetailsPage component
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

// Protected Route Component
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is logged out
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Main Route (Protected) */}
        <Route
          path="/main"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Main />
            </ProtectedRoute>
          }
        />

        {/* Details Route (Protected) */}
        <Route
          path="/details"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DetailsPage />
            </ProtectedRoute>
          }
        />

        {/* How It Works Route */}
        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* Products Route */}
        <Route path="/products" element={<Products />} />

        {/* About Us Route */}
        <Route path="/about-us" element={<AboutUs />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Fallback Route for Invalid Paths */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;