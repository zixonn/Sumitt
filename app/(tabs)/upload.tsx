import { Button, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Page from '@/components/Page';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { CheckBox } from '@rneui/base';

const Upload = () => {
  const { colors } = useTheme();
  const [text, setText] = useState('');
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [summaryType, setSummaryType] = useState('short');

  async function generateSummary() {
    router.navigate({
      pathname: "/(summary)/summary",
      params: { text: text, summaryType: summaryType }
    });
  }

  return (
    <Page style={{ justifyContent: 'flex-start', marginTop: '3%' }}>
      <CheckBox
        title="Enter URL"
        checked={isUrlMode}
        onPress={() => setIsUrlMode(!isUrlMode)}
        containerStyle={{ backgroundColor: 'transparent', width: "90%" }}
        textStyle={{ color: colors.text }}
      />
      <TextInput
        value={text}
        onChangeText={(value) => setText(value)}
        placeholder={isUrlMode ? 'Paste URL' : 'Paste text'}
        textAlignVertical="top"
        returnKeyType="done"
        returnKeyLabel="Done"
        multiline={true}
        style={[
          styles.textInput,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
            height: isUrlMode ? "10%" : "50%"
          },
        ]}
      />

      <View style={styles.radioContainer}>
        <CheckBox
          title="Short"
          checked={summaryType === 'short'}
          onPress={() => setSummaryType('short')}
          containerStyle={styles.radioButton}
          textStyle={{ color: colors.text }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
        <CheckBox
          title="Detailed"
          checked={summaryType === 'detailed'}
          onPress={() => setSummaryType('detailed')}
          containerStyle={styles.radioButton}
          textStyle={{ color: colors.text }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
        <CheckBox
          title="Bullet "
          checked={summaryType === 'bullet'}
          onPress={() => setSummaryType('bullet')}
          containerStyle={styles.radioButton}
          textStyle={{ color: colors.text }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
      </View>

      <View style={styles.button}>
        <Button title="Cancel" onPress={router.back} />
        <Button title="Clear" onPress={ () => setText('')} />
        <Button disabled={!text} title="Summarize" onPress={generateSummary} />
      </View>
    </Page>
  );
};

export default Upload;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: '90%',
    padding: '3%',
  },
  radioContainer: {
    width: '95%',
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radioButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  button: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '2%',
  },
});
