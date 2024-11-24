import { Button, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import Page from '@/components/Page';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';

const Manual = () => {
  const {colors} = useTheme()
  const [notes, setNotes] = useState<string | undefined>(); 
  function generateSummary() {
    if (notes) {
      router.navigate({
        pathname: '/(summary)/summarytext',
        params: { notes: notes }, 
      });
    }
  }

  return (
    <Page style={{ justifyContent: 'flex-start' }}>
      <TextInput
        placeholder="Enter notes"
        placeholderTextColor={"lightgray"}
        value={notes} 
        onChangeText={(text) => setNotes(text)}
        style = {[styles.input,{
          borderColor:colors.border,
          backgroundColor:colors.card,
          color:colors.text
        }]} 
        maxLength={5000}
        returnKeyType='done'
        multiline = {true}
        submitBehavior='blurAndSubmit'
        textAlignVertical='top'
      />
      <Button disabled = {!notes} title="Generate Summary" onPress={generateSummary} />
    </Page>
  );
};

export default Manual;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width:"90%",
    height:"50%",
    margin:"5%",
    padding:"3%"
  },
});
