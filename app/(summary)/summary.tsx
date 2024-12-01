import { ActivityIndicator, Animated, StyleSheet, View, ScrollView } from 'react-native';
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

const Summary = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { userInput } = useLocalSearchParams();
  const { colors } = useTheme();

  const fadeAnim = useState(new Animated.Value(0))[0];

  const generateSummary = async () => {
    try {
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "system", content: "You are a helpful assistant" }, { role: "user", content: userInput }],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch summary");
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
      setError("Something went wrong.");
      setSummary("");
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

  const handleSave = async () => {
    try {
      const currentDate = new Date().toLocaleString();
      const newSummary = {
        summary: summary,
        timestamp: currentDate,
      };

      const key = `summary_${new Date().getTime()}`;

      await AsyncStorage.setItem(key, JSON.stringify(newSummary));
      console.log('Summary saved successfully');
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

  return (
    <Page style={{ backgroundColor: colors.card, padding: "5%" }}>
      {loading ? (
        <>
          <MyText bold fontSize="large">Summarizing with AI...</MyText>
          <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: "3%" }} />
        </>
      ) : error ? (
        <>
          <Icon name="sad" type="ionicon" size={100} color={colors.primary} />
          <MyText style={{ marginVertical: "5%" }} textAlign="center">{error}</MyText>
          <MyButton width="50%" title="Go Back" onPress={handleGoBack} />
        </>
      ) : (
        <Animated.View style={[{ opacity: fadeAnim }, styles.myCon]}>
          <View style={styles.headerCon}>
            <Icon name="copy" type="ionicon" size={25} color={colors.primary} onPress={handleCopy} />
            <MyText bold fontSize="large">Summary</MyText>
          </View>
          <ScrollView>
            <MyText>{summary}</MyText>
          </ScrollView>
          <View style = {styles.buttonRow}>
            <MyButton width="30%" title="Save" onPress={handleSave} />
            <MyButton width="30%" title="Ok" onPress={handleGoBack} />
          </View>
        </Animated.View>
      )}
    </Page>
  );
};

export default Summary;

const styles = StyleSheet.create({
  myCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerCon: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    width: "100%",
    marginTop: "10%",
    marginBottom: "4%"
  },
  buttonRow:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
    marginVertical:"3%",
    gap:"4%"
  }
});
