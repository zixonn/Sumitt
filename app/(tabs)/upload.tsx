import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Page from '@/components/Page'
import MyText from '@/components/MyText'
import { router } from 'expo-router'

const upload = () => {
  return (
    <Page>
      <MyText>Cool!</MyText>
      <Button title = "Back" onPress={router.back} />
    </Page>
  )
}

export default upload

const styles = StyleSheet.create({})