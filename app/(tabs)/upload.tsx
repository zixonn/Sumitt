import { Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Page from '@/components/Page';
import { router } from 'expo-router';
import InputOption from '@/components/InputOption';

const Upload = () => {
  const [selectedOption, setSelectedOption] = useState<string>(''); 

  return (
    <Page style={{ justifyContent: 'flex-start', marginTop: '5%' }}>
      <InputOption/>
      <InputOption/>
      <InputOption/>
      <Button title="Back" onPress={router.back} />
    </Page>
  );
};

export default Upload;

const styles = StyleSheet.create({});
