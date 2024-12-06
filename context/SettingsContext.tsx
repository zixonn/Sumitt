import React, { createContext, useContext, useState, ReactNode } from "react";
import { MyDarkTheme, MyLightTheme } from "@/constants/Colors";
import { useColorScheme } from "react-native";

type ThemeType = {
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  dark: boolean;
  fonts: {
    regular: object;
    medium: object;
    bold: object;
    heavy: object;
  };
};

interface SettingsContextType {
  theme: ThemeType;
  language: string;
  setTheme: (theme: ThemeType) => void;
  setLanguage: (language: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme();
  
  const [theme, setTheme] = useState<ThemeType>(systemTheme === "dark" ? MyDarkTheme : MyLightTheme);
  const [language, setLanguage] = useState("en");

  return (
    <SettingsContext.Provider value={{ theme, language, setTheme, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
