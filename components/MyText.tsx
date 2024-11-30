import { Text, TextStyle } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

interface TextProps {
  color?: string;
  fontSize?: 'small' | 'medium' | 'large' | 'XL';  
  bold?: boolean;  
  opacity?:number;
  textAlign?:string;
  style?: TextStyle; 
  children: React.ReactNode;
}

const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  XL: 24,
};

const MyText = ({ color = useTheme().colors.text, fontSize = 'medium', bold = false, children, style, opacity, textAlign }: TextProps) => {
  const fontWeight = bold ? 'bold' : 'normal';  
  return (
    <Text style={[{ color, fontSize: fontSizes[fontSize], fontWeight, opacity, textAlign }, style]}>
      {children}
    </Text>
  );
};

export default MyText;
