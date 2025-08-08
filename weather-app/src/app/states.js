import { create } from "zustand";
import { lightTheme, darkTheme } from "./theme";

export const useThemeStore = create((set, get) => ({
  theme: lightTheme,
  changeTheme: () => {
    const currentTheme = get().theme;

    if (currentTheme === lightTheme) {
      set({ theme: darkTheme });
    } else {
      set({ theme: lightTheme });
    }
  },
}));
