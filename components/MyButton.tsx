import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

interface ButtonProps {
  title: string;
  onPress: () => void;
  width?: string;
  marginVertical?: string;
  marginTop?: string;
  disabled?: boolean;
}

const MyButton = (props: ButtonProps) => {
  const { colors } = useTheme();

  return (
    <View style={{ width: props.width, marginVertical: props.marginVertical, marginTop: props.marginTop }}>
      <Button
        color={props.disabled ? colors.gray : colors.primary}
        title={props.title}
        onPress={props.disabled ? () => {} : props.onPress}
        disabled={props.disabled}
      />
    </View>
  );
}

export default MyButton

const styles = StyleSheet.create({});
