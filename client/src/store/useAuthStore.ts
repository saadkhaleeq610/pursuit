import { create } from "zustand";
import axios from "axios";

type User = {
  name: string;
  email: string;
  user_id: number;
  role_id: number;
  role_name: string;
  restaurant_id: number;
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
  getRestaurantDetails: (restaurant_id: number) => Promise<void>;
};

// Helper function for safe JSON parsing
const safeParse = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: safeParse("user"),
  restaurant: safeParse("restaurant"),
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),

  regRestaurant: (restaurant) => {
    localStorage.setItem("restaurant", JSON.stringify(restaurant));
    set({ restaurant });
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, restaurant: null, accessToken: null, isAuthenticated: false });
  },

  getRestaurantDetails: async (restaurant_id: number) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/restaurant-details",
        { restaurant_id }, 
        { withCredentials: true }
      );

      const restaurant = response.data;
      localStorage.setItem("restaurant", JSON.stringify(restaurant));
      set({ restaurant });
    } catch (error) { 
      console.error("Fetching restaurant details failed:", error);
    }
  },

  login: async (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
    
    set({ user, accessToken: token, isAuthenticated: true });

    if (user.restaurant_id != null &&  user.restaurant_id != 0) {
      await get().getRestaurantDetails(user.restaurant_id);
    }
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
