import { createContext, useContext, useState } from "react";
import { Colors } from "../constants/Colors";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Colors.light);

  const toggleTheme = () => {
    setTheme((prevTheme) => 
      prevTheme === Colors.light ? Colors.dark : Colors.light
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
