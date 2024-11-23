import { Button, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Page from '@/components/Page';
import { router } from 'expo-router';
import InputOption from '@/components/InputOption';

const Upload = () => {
  const [selectedOption, setSelectedOption] = useState<string>(''); 

  return (
    <Page style={{ justifyContent: 'flex-start', marginTop: '5%' }}>
      <InputOption option='Take Picture'/>
      <InputOption option='Upload Image'/>
      <InputOption option='Upload Text File'/>
      <InputOption option='Manual Input'/>
      <View style = {{margin:"6%",width:"90%"}}>
       <Button title="Cancel" onPress={router.back} />
      </View>
    </Page>
  );
};

export default Upload;

const styles = StyleSheet.create({});
