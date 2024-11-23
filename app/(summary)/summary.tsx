import { StyleSheet, Image } from 'react-native'
import React from 'react'
import Page from '@/components/Page'
import MyText from '@/components/MyText'
import { ActivityIndicator, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router'

const summary = () => {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const screenWidth = Dimensions.get('window').width;
  return (
    <Page>
      <MyText bold fontSize='large'>Summarizing With AI...</MyText>
      <Image
        source={{ uri: uri }}
        style={[styles.imagePreview,{ width: screenWidth * 0.9, height: screenWidth * 0.8 }]}
      />
      <ActivityIndicator
        style={{ margin: "3%" }}
        size="large"
        color={useTheme().colors.primary}
      />
    </Page>
  )
}

export default summary

const styles = StyleSheet.create({
  imagePreview: {
    marginVertical: "5%",
    alignSelf: "center", 
    borderRadius: 5,
  },
})