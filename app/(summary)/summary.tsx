import { ActivityIndicator, Alert, Animated, ScrollView, Share, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import MyText from '@/components/MyText';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import MyButton from '@/components/MyButton';
import { Icon } from '@rneui/base';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NameModule from '@/components/NameModule';

const Summary = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [moduleVisible, setModuleVisible] = useState(false);

  const { userInput, options } = useLocalSearchParams();
  const { colors } = useTheme();

  const fadeAnim = useState(new Animated.Value(0))[0];

  const generateSummary = async () => {
    try {
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;
      
      fadeAnim.setValue(0);
  
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are a professional summarizer. Your goal is to create a concise, meaningful, and complete summary of the provided text, no matter how short or random the input may be. Follow these guidelines:
                1. Use the provided options exactly when available: ${options}.
                2. Always generate a summary, even if the input text is just a word or lacks substantial details.
                3. If the input is too short or unclear, generate a thoughtful, complete response by providing context, interpretations, or relevant details to create a coherent summary.
                4. Do not ask for clarification or additional details. Ensure the summary is always generated.
                5. Do not apologize.
                6. NEVER DISPLAY THE OPTIONS OBJECT
                7. Don't use bold, italics, or any other type of markdown style.
                8. ALWAYS USE THIS CHARACTER for the bullets: •
                Input Text:
                {userInput}`,
            },
            { role: 'user', content: userInput },
          ],
        }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch summary');
      }
  
      const data = await res.json();
      setSummary(data.choices?.[0]?.message?.content);
      setError(null);
      setLoading(false);
  
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error(error);
      setError('Something went wrong.');
      setSummary('');
    }
  };
  

  useEffect(() => {
    if (userInput) {
      generateSummary();
    }
  }, [userInput]);

  const handleCopy = () => {
    Clipboard.setStringAsync(summary);
  };

  const handleSave = async (name: string) => {
    setModuleVisible(false);
    try {
      const currentDate = new Date().toLocaleString();
      const newSummary = {
        summary,
        timestamp: currentDate,
      };

      await AsyncStorage.setItem(name, JSON.stringify(newSummary));

      console.log(`Summary saved successfully with key: ${name}`);
    } catch (error) {
      console.error('Error saving summary:', error);
    }

    setSummary('');
    setLoading(true);
    setError(null);
    router.navigate('/(tabs)');
  };

  const handleGoBack = () => {
    setSummary('');
    setLoading(true);
    setError(null);
    router.navigate('/(tabs)');
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: summary,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <Page style={{ backgroundColor: colors.card, padding: '5%' }}>
      {loading ? (
        <>
          <MyText bold fontSize="large">Summarizing with AI...</MyText>
          <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: '3%' }} />
        </>
      ) : error ? (
        <>
          <Icon name="sad" type="ionicon" size={100} color={colors.primary} />
          <MyText style={{ marginVertical: '5%' }} textAlign="center">{error}</MyText>
          <MyButton width="50%" title="Go Back" onPress={handleGoBack} />
        </>
      ) : (
        <Animated.View style={[{ opacity: fadeAnim }, styles.myCon]}>
          <View style={styles.headerCon}>
            <View style = {{flexDirection:"row",width:"20%", justifyContent:"space-around"}}>
              <Icon name="copy" type="ionicon" size={25} color={colors.primary} onPress={handleCopy} />
              <Icon size={25} color={colors.primary} name="share" type='ionicon' onPress={handleShare} />
            </View>
            <MyText bold fontSize="large">Summary</MyText>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: '20%' }}>
            <MyText>{summary}</MyText>
          </ScrollView>
          <View style={styles.buttonRow}>
            <MyButton width="30%" title="Save" onPress={() => setModuleVisible(true)} />
            <MyButton width="30%" title="Ok" onPress={handleGoBack} />
          </View>
          <NameModule
            visible={moduleVisible}
            onPress={(name) => handleSave(name)}
            onCancel={() => setModuleVisible(false)}
          />
        </Animated.View>
      )}
    </Page>
  );
};

export default Summary;

const styles = StyleSheet.create({
  myCon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCon: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    width: '100%',
    marginTop: '10%',
    marginBottom: '4%',
  },
  buttonRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: '3%',
    gap: '4%',
  },
});
