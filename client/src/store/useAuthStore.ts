import { create } from "zustand";
import axios from "axios";

type AuthState = {
  email: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, accessToken: string) => void;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  checkAuthState: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  accessToken: null,
  isAuthenticated: false,

  login: (email, accessToken) => {
    set({ email, accessToken, isAuthenticated: true });
  },

  logout: async () => {
    await axios.post("http://localhost:8080/logout", {}, { withCredentials: true });
    set({ email: null, accessToken: null, isAuthenticated: false });
  },

  refreshAccessToken: async () => {
    try {
      const response = await axios.get("http://localhost:8080/refresh", { withCredentials: true });
      set({ accessToken: response.data.accessToken, isAuthenticated: true });
    } catch (error) {
      console.error("Error refreshing token:", error);
      set({ accessToken: null, isAuthenticated: false });
    }
  },

  checkAuthState: async () => {
    try {
      const response = await axios.get("http://localhost:8080/me", { withCredentials: true });
      set({
        email: response.data.email,
        accessToken: response.data.accessToken,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ email: null, accessToken: null, isAuthenticated: false });
      console.log(error);
      
    }
  },
}));
