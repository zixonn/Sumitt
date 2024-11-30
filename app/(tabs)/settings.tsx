import React, { useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { ListItem, Icon, Divider } from '@rneui/base';
import Page from '@/components/Page';
import MyText from '@/components/MyText';
import { useTheme } from '@react-navigation/native';

const Settings = () => {
  const {colors} = useTheme()
  const [themeExpanded, setThemeExpanded] = useState(false);
  const [languageExpanded, setLanguageExpanded] = useState(false);

  const themeOptions = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'System', value: 'system' },
  ];

  const languageOptions = [
    { name: 'English', value: 'en' },
    { name: 'Spanish', value: 'es' },
    { name: 'French', value: 'fr' },
  ];

  return (
    <Page style={{ alignItems: 'flex-start', justifyContent: 'flex-start', margin: '5%' }}>
      <MyText bold fontSize="large">Theme</MyText>
      <ListItem.Accordion 
      style = {[styles.accordionCon,{borderColor:colors.border}]}
      isExpanded={themeExpanded} 
      onPress={() => setThemeExpanded(!themeExpanded)}
      content={
        <ListItem.Content>
          <ListItem.Title>Light</ListItem.Title>
        </ListItem.Content>
      }>
        {themeOptions.map((item, index) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content >
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>
      <MyText bold fontSize="large">Language</MyText>
      <ListItem.Accordion
        style = {[styles.accordionCon,{borderColor:colors.border}]}
        isExpanded={languageExpanded}
        onPress={() => setLanguageExpanded(!languageExpanded)}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>English</ListItem.Title>
            </ListItem.Content>
          </>
        }
      >
        {languageOptions.map((item, index) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>
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
