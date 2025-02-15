import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./index.css";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import RegisterRestaurantPage from "./pages/RestaurantRegistrationPage";
import SignupPage from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import {ProtectedRoute}  from "./ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";
import JoinRestaurant from "./pages/JoinStaff";
import InviteUserPage from "./pages/InviteStaff";
// import setupAxiosInterceptors from "./axiosInterceptor";

// setupAxiosInterceptors();

// PublicRoute: Only allows access if user is NOT authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Public Routes Only for unauthenticated users */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/join-staff"
          element={
            <PublicRoute>
              <JoinRestaurant />
            </PublicRoute>
          }
        />
        <Route
          path="/register-restaurant"
          element={
            <PublicRoute>
              <RegisterRestaurantPage />
            </PublicRoute>
          }
        />

        {/* Protected Route: Only for authenticated users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invite-staff"
          element={
            <ProtectedRoute>
              <InviteUserPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);