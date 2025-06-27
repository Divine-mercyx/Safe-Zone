import { create } from "zustand";

export const useAuthStore = create((set) => ({
    token: localStorage.getItem("token") || null,
    latitude: null,
    longitude: null,
    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },
    clearToken: () => {
        localStorage.removeItem("token");
        set({ token: null });
    },
    setLocation: (latitude, longitude) => {
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
        set({ latitude, longitude })
    },
    clearLocation: () => {
        localStorage.removeItem("latitude");
        localStorage.removeItem("longitude");
        set({ latitude: null, longitude: null })
    }
}));
