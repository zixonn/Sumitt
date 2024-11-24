import { StyleSheet, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Page from '@/components/Page'
import MyText from '@/components/MyText'
import { ActivityIndicator } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router'

const SummaryImage = () => {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const screenWidth = Dimensions.get('window').width;

  const [imageSummary, setImageSummary] = useState('');
  const [loading, setLoading] = useState(true);

  const summarizeImage = async () => {
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
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "What’s in this image?" },
                {
                  type: "image_url",
                  image_url: {
                    "url": uri,
                  },
                },
              ],
            },
          ],
        }),
      });
      
      const data = await res.json();
      setImageSummary(data.choices[0]?.message?.content || 'No summary available');
    } catch (error) {
      console.error(error);
      setImageSummary('An error occurred while summarizing the image.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    summarizeImage();
  }, []);

  return (
    <Page>
      {loading ? 
        (
        <>
          <MyText bold fontSize="large">Summarizing With AI...</MyText>
          <Image
              source={{ uri: uri }}
              style={[styles.imagePreview, { width: screenWidth * 0.9, height: screenWidth * 0.8 }]}
          />
          <ActivityIndicator
            style={{ margin: "3%" }}
            size="large"
            color={useTheme().colors.primary}
          />
        </>
        ) : 
        (
          <MyText>{imageSummary}</MyText>
        )
      }
    </Page>
  );
}

export default SummaryImage;

const styles = StyleSheet.create({
  imagePreview: {
    marginVertical: "5%",
    alignSelf: "center",
    borderRadius: 5,
  },
});
