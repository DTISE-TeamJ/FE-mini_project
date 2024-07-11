import { createContext, useState, useEffect } from "react";
import { DARK_THEME, LIGHT_THEME } from "@/utils/theme";

interface ThemeContextProps {
  theme: string | null;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: LIGHT_THEME,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("themeMode");
    setTheme(storedTheme || LIGHT_THEME);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setTheme(newTheme);
    window.localStorage.setItem("themeMode", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
