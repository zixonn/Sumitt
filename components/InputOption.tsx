import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import MyText from './MyText';

const InputOption = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <MyText>Cool</MyText>
    </View>
  );
};

export default InputOption;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: "10%",
    marginVertical: '2%',
    padding:"3%",
    borderWidth: 1,
    borderRadius: 10,
  },
});
