import { Button, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Page from '@/components/Page';
import InputType from '@/components/InputType';
import MyButton from '@/components/MyButton';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

const Upload = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 
  const [inputText, setInputText] = useState("")

  const handleSelectOption = (option: string) => {
    if (selectedOption !== option) {
      setSelectedOption(option);
    }
  };

  const handleCancel = () => {
    setSelectedOption(null);  
    setInputText('');        
    router.back();          
  };

  async function generateSummary() {
    router.navigate({
      pathname: "/(summary)/summary",
      params: { userInput: inputText }
    });
  }

  const { colors } = useTheme();

  return (
    <Page style={{ justifyContent: 'flex-start', alignItems: "flex-start", margin: "5%" }}>
      <InputType name='URL' subtitle='Website or article URL' selected={selectedOption === 'URL'} onPress={() => handleSelectOption('URL')} />
      <InputType name='Manual Input' subtitle='Input text manually' selected={selectedOption === 'Manual Input'} onPress={() => handleSelectOption('Manual Input')} />
      {selectedOption ? (
        selectedOption === "URL" ? (
          <>
            <TextInput 
              value={inputText} onChangeText={ text => setInputText(text)} placeholder="Enter URL" 
              textAlignVertical="top" returnKeyType="done" returnKeyLabel="Done" multiline 
              style={[styles.textInput, { borderColor: colors.border, backgroundColor: colors.card, color: colors.text, height: "8%" }]} />
            <View style = {styles.buttonRow}>
                <MyButton disabled = {!inputText} title='Summarize' onPress={generateSummary} width='30%' />
                <MyButton title='Options' onPress={ () => router.navigate("/(options)/options")} width='30%' />
                <MyButton title='Cancel' onPress={handleCancel} width='30%' />
            </View>
          </>
        ) : (
          <>
            <TextInput
              value={inputText} onChangeText={text => setInputText(text)} placeholder="Enter text to summarize" 
              textAlignVertical="top" returnKeyType="done" returnKeyLabel="Done" multiline 
              style={[styles.textInput, { borderColor: colors.border, backgroundColor: colors.card, color: colors.text, height: "60%" }]} />
            <View style = {styles.buttonRow}>
                <MyButton disabled = {!inputText} title='Summarize' onPress={generateSummary} width='30%' />
                <MyButton title='Options' onPress={ () => router.navigate("/(options)/options")} width='30%' />
                <MyButton title='Cancel' onPress={handleCancel} width='30%' />
            </View>
          </>
        )
      ) : (
        <MyButton title='Cancel' onPress={handleCancel} width="100%" marginVertical="3%" />
      )}
  </Page>
  );
};

export default Upload;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius:10,
    width: '100%',
    padding: '3%',
  },
  button: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '2%',
  },
  buttonRow:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
    marginVertical:"3%",
    gap:"4%"
  }
});
