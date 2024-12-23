import { ScrollView, StyleSheet, } from 'react-native'
import React from 'react'
import Page from '@/components/Page'
import MyText from '@/components/MyText'
import { useLocalSearchParams } from 'expo-router'

const SavedSummaryScreen = () => {
  const {summary} = useLocalSearchParams()
  return (
    <Page style={{justifyContent:"flex-start", margin:'5%'}}>
      <ScrollView style = {styles.scrollContainer}>
        <MyText markdown>{summary}</MyText>
      </ScrollView>
    </Page>
  )
}

export default SavedSummaryScreen

const styles = StyleSheet.create({
  scrollContainer:{
    marginBottom: "1%",
  },
})



