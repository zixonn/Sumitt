import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Page from '@/components/Page';
import MyText from '@/components/MyText';
import { useTheme } from '@react-navigation/native';
import {Picker} from "@react-native-picker/picker"
import { Divider, Icon } from '@rneui/base';
import Version from '@/constants/Version';
import { useNavigation } from 'expo-router';

const Settings = () => {
  const {colors} = useTheme()
  const navigation = useNavigation()
    const [selectedTheme, setSelectedTheme] = useState("system");
  const [selectedLanguage, setSelectedLanguage] = useState();

  
  return (
    <Page style={{ alignItems: 'flex-start', justifyContent: 'flex-start', padding: '5%'}}>
      <MyText bold fontSize="large">Theme</MyText>
      <MyText fontSize='small' opacity={0.5}>Customize your appearance</MyText>
      <Picker 
        style = {{width:"100%",color:colors.text, marginLeft:"-4%"}}
        dropdownIconColor={colors.text}
        selectedValue={selectedTheme} 
        onValueChange={itemValue => setSelectedTheme(itemValue)}>
        <Picker.Item  color={colors.text} label='Light' value={"light"}/>
        <Picker.Item  color={colors.text} label='Dark' value={"dark"}/>
        <Picker.Item  color={colors.text} label='Device Settings' value={"system"}/>
      </Picker>
      <Divider width={5} />
      <MyText bold fontSize="large">Language</MyText> 
      <MyText fontSize='small' opacity={0.5}>Choose your preferred language</MyText>
      <Picker 
        style = {{width:"100%",color:colors.text, marginLeft:"-4%"}}
        dropdownIconColor={colors.text}
        selectedValue={selectedLanguage} 
        onValueChange={itemValue => setSelectedLanguage(itemValue)}>
        <Picker.Item  color={colors.text} label='English' value={"en"}/>
        <Picker.Item  color={colors.text} label='Spanish' value={"es"}/>
        <Picker.Item  color={colors.text} label='French' value={"fr"}/>
      </Picker>
      <Divider width={5} />
      <View style = {{flexDirection:"row", gap:"2%", alignItems:"center"}}>
        <MyText bold fontSize="large">Privacy Policy</MyText>
        <Icon name='external-link' type='feather' size={20} color={colors.text} />
      </View>
      <MyText fontSize='small' opacity={0.5}>Reiew our privacy policy</MyText>
      <Divider width={20} />
      <MyText bold fontSize="large">Version</MyText>
      <MyText opacity={0.5} fontSize="small">{Version}</MyText>
    </Page>
  );
};

export default Settings;

const styles = StyleSheet.create({
  accordionCon:{
    width:"100%",
    marginTop:"3%",
    marginBottom:"7%",
    borderWidth:0.5
  }
});
