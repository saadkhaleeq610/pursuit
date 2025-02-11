import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthState = {
  user: User;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false, // Initially false

      login: (user, token) =>
        set({
          user,
          accessToken: token,
          isAuthenticated: true, // Set true after login
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    { name: "auth-storage" } // Persist state in localStorage
  )
);
