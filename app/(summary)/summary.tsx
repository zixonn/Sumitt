import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Page from '@/components/Page'
import MyText from '@/components/MyText'
import { useLocalSearchParams } from 'expo-router'
import { useTheme } from '@react-navigation/native'

const summary = () => {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState('')

  const {text, summaryType} = useLocalSearchParams()

  async function generateSummary() {
    try{
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "system", 
          content: `Summarize this text based on this description: ${summaryType}` }, {
             role: "user", content: text }],
      }),
    });
    const data = await res.json();
    setSummary(data.choices[0].message.content);
    } catch (error){
      console.log(error) 
    } finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    generateSummary()
  },[])

  return (
    <Page>
      { loading ?
        (
          <>
            <MyText bold fontSize='large'>Summarizing...</MyText>
            <ActivityIndicator 
              size={'large'} 
              color={useTheme().colors.primary} 
              style = {{marginVertical:"3%"}}
            />
          </>
        )
        :
        (
          <MyText>{summary}</MyText>
        )
      }
    </Page>
  )
}

export default summary

const styles = StyleSheet.create({})