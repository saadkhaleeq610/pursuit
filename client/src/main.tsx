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
import Profile from "./pages/Profile";
import RestaurantDetails from "./pages/RestaurantDetails";
import Settings from "./pages/Settings";
import axios from "axios";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Menu from "./pages/Menu";
// import setupAxiosInterceptors from "./axiosInterceptor";

// setupAxiosInterceptors();

// PublicRoute: Only allows access if user is NOT authenticated
axios.defaults.withCredentials = true;

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

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
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
          <Route
            path="/register-restaurant"
            element={
              <ProtectedRoute>
                <RegisterRestaurantPage />
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant-details"
          element={
            <ProtectedRoute>
              <RestaurantDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);