import { Button, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Page from '@/components/Page';
import { router } from 'expo-router';
import InputOption from '@/components/InputOption';

const Upload = () => {
  const [selectedOption, setSelectedOption] = useState<string>(''); 

  return (
    <Page style={{ justifyContent: 'flex-start', marginTop: '5%' }}>
      <InputOption option='Image'/>
      <InputOption option='Text File'/>
      <InputOption option='Manual Input'/>
      <View style = {{alignSelf:"flex-start", margin:"6%"}}>
       <Button title="Cancel" onPress={router.back} />
      </View>
    </Page>
  );
};

export default Upload;

const styles = StyleSheet.create({});
