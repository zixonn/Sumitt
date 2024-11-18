import { Text, TextStyle } from 'react-native';
import React from 'react';

interface TextProps {
  color?: string;
  fontSize?: number;
  style?: TextStyle; 
  children: React.ReactNode;
}

const MyText = ({ color, fontSize, children, style }: TextProps) => {
  return (
      <Text style={[{color:color, fontSize: fontSize}, style]}>
        {children}
      </Text>
  );
};

export default MyText;


