import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router"; // Correct import
import "./index.css";
import RegisterRestaurantPage from "./pages/RestaurantRegistrationPage.tsx";
import SignupPage from "./pages/Signup.tsx";
import LoginPage from "./pages/Login.tsx";
import LandingPage from "./pages/LandingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-restaurant" element={<RegisterRestaurantPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
