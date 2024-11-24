import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import MyText from './MyText';
import { Icon } from '@rneui/base';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface InputOptionProps {
  option: 'Upload Image' | 'Manual Input' | 'Take Picture';
}

const InputOption = (props: InputOptionProps) => {
  const { colors } = useTheme();

const renderIcon = () => {
    switch (props.option) {
      case 'Upload Image':
        return <Icon name="image" size={30} color={colors.primary} />;
      case 'Manual Input':
        return <Icon name="keyboard" size={30} color={colors.primary} />;
      case 'Take Picture':
          return <Icon name="camera" size={30} color={colors.primary} />;
      default:
        return null;
    }
  };

const navigateToInput = () => {
  switch(props.option){
    case "Upload Image":
      router.navigate(`/(input)/image`)
      break;
    case "Manual Input":
      router.navigate(`/(input)/manual`)
      break;
    case "Take Picture":
        router.navigate(`/(input)/picture`)
        break;
    default:
      null
  }
}

  return (
    <TouchableOpacity onPress={navigateToInput} style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <MyText>{props.option}</MyText>
      {renderIcon()}
    </TouchableOpacity>
  );
};

export default InputOption;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: '10%',
    marginVertical: '2%',
    padding: '3%',
    borderWidth: 1,
    borderRadius: 10,
  },
});
