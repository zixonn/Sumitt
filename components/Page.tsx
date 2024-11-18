import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface PageProps {
    style?: ViewStyle,
    children:React.ReactNode
}

const Page = (props:PageProps) => {
  return (
    <View style = {[styles.con, props.style]}>
        {props.children}
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
    con:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})