import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Page from '@/components/Page'
import MyText from '@/components/MyText'
import { ActivityIndicator } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router'

const SummaryText = () => {
  const [loading, setLoading] = useState(true)
  const [summarizedNotes, setSummarizedNotes] = useState('')

  const { notes } = useLocalSearchParams<{ notes: string }>();

  const summarizeNotes = async () => {
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",  
          messages: [{ role: "system", content: "Summarize these notes" }, { role: "user", content: notes }],
        }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch the summary');
      }

      const data = await res.json();
      setSummarizedNotes(data.choices[0]?.message?.content || 'No summary available');
    } catch (error) {
      console.error(error);
      setSummarizedNotes('An error occurred while summarizing the notes.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (notes) {
      summarizeNotes();
    }
  }, [notes]);

  return (
    <Page>
      {loading ? (
        <>
          <MyText bold fontSize="large">Summarizing With AI...</MyText>
          <ActivityIndicator
            style={{ margin: "3%" }}
            size="large"
            color={useTheme().colors.primary}
          />
        </>
      ) : (
          <MyText>{summarizedNotes}</MyText>
      )}
    </Page>
  );
}

export default SummaryText;

const styles = StyleSheet.create({});
