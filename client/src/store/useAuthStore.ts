import { create } from "zustand";
import axios from "axios";

type User = {
  name: string;
  email: string;
  user_id: number;
  role_id: number;
  role_name: string;
};

type Restaurant = {
  name: string;
  address: string;
  phone_number: string;
};

type AuthState = {
  user: User | null;
  restaurant: Restaurant | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  regRestaurant: (restaurant: Restaurant) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
  validateToken: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  restaurant: JSON.parse(localStorage.getItem("restaurant") || "null"),
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),

  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
    set({ user, accessToken: token, isAuthenticated: true });
  },

  regRestaurant: (restaurant) => {
    localStorage.setItem("restaurnat", JSON.stringify(restaurant))
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, restaurant: null, accessToken: null, isAuthenticated: false });
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
