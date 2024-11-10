import { StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';

type TextProps = {
  color?: string;
  fontSize?: number;
  style?: TextStyle; 
  children: React.ReactNode;
};

const MyText = (props: TextProps) => {
  return (
    <Text style={[{ color: props.color, fontSize: props.fontSize }, props.style]}>
      {props.children}
    </Text>
  );
};

export default MyText;

const styles = StyleSheet.create({});
