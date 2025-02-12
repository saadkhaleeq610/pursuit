import { create } from "zustand";

type AuthState = {
  email: string;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  accessToken: null,
  isAuthenticated: false,
  login: (email, token) => 
    set(() => ({
    email,
    accessToken: token,
    isAuthenticated: true,
  })),

  logout: () => 
    set(() => ({
    email: "",
    accessToken: null,
    isAuthenticated: false,
  })),
}));
