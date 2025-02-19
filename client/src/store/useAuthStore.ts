import { create } from "zustand";
import axios from "axios";

type AuthState = {
  //user: {name: string, email: string, user_id: int, role_id: int, role_name: }
  restaurant: {name: string, address: string, phone_number: string} | null;
  email: string;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, token: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
  validateToken: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  restaurant: null,
  email: localStorage.getItem("email") || "",
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),

  login: (email, token) => {
    localStorage.setItem("email", email);
    localStorage.setItem("accessToken", token);
    set({ email, accessToken: token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.clear();
    set({ email: "", accessToken: null, isAuthenticated: false });
  },

  refreshAccessToken: async () => {
    try {
      const response = await axios.post("http://localhost:8080/refresh-token", {}, { withCredentials: true });
      const newAccessToken = response.data.accessToken;
      if (!newAccessToken) throw new Error("No new token received");

      localStorage.setItem("accessToken", newAccessToken);
      set({ accessToken: newAccessToken, isAuthenticated: true });
      return newAccessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      get().logout();
      return null;
    }
  },

  validateToken: async () => {
    const { accessToken, refreshAccessToken } = get();
    if (!accessToken || isTokenExpired(accessToken)) {
      return !!(await refreshAccessToken());
    }
    return true;
  },
}));

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};