import { StyleSheet, View } from 'react-native'
import React, {useState} from 'react'
import Page from '@/components/Page'
import MyButton from '@/components/MyButton'
import { router } from 'expo-router'
import MyText from '@/components/MyText'
import { ButtonGroup } from '@rneui/base'
import { useTheme } from '@react-navigation/native'

const options = () => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState([0, 1, 2]);

  const saveOptions = () => {
    
  }

  const {colors} = useTheme()

  return (
    <Page style={{alignItems:"flex-start", justifyContent:"flex-start",padding:"5%"}}>
      <MyText bold>Length</MyText>
      <ButtonGroup
      buttons={['Short', 'Medium', 'Long']}
      selectedIndex={selectedIndex}
      onPress={value => setSelectedIndex(value)}
      selectedButtonStyle = {{backgroundColor:colors.primary}}
      containerStyle = {{marginVertical:"3%"}}
    />
      <MyText bold>Detail</MyText>
      <MyText bold>Tone</MyText>
      <MyText bold>Structure</MyText>
      <MyText bold>Keywords</MyText>
      <View style = {styles.buttonRow}>
        <MyButton width='30%' title='Cancel' onPress={router.back}/>
        <MyButton width='30%' title='Save' onPress={saveOptions}/>
      </View>
    </Page>
  )
}

export default options

const styles = StyleSheet.create({
  buttonRow:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
    marginVertical:"3%",
    gap:"4%"
  }
})




/**
 * 
 * 1. Summary Length
Short: A concise, high-level overview.
Medium: A balanced summary with key points.
Long: A detailed summary with more information.
Custom: Input length
Reason: This is the most fundamental customization, allowing users to control how much detail they get in the summary.

2. Detail Level
High Detail: Includes all relevant information with depth.
Medium Detail: A balanced level of detail.
Low Detail: Focuses on just the key points.
Reason: This option allows users to control how much they want to know, depending on their needs (e.g., quick summary vs. comprehensive overview).

3. Tone
Formal: Professional, neutral language.
Casual: Informal and conversational.
Optimistic: Focuses on a positive, hopeful perspective.
Reason: The tone of the summary can dramatically affect how the information is perceived. This option tailors the summary to different contexts, such as work or casual reading.

4. Keywords to Include/Exclude
Include: User inputs key terms they want to emphasize.
Exclude: User inputs terms they want to avoid.
Reason: This option gives users control over the content of the summary by emphasizing or excluding specific details, which is especially useful for summarizing articles or reports.

5. Sentence Structure Complexity
Simple: Clear, easy-to-read sentences.
Moderate: More complex sentences for general readers.
Advanced: Complex sentences for a more educated audience.
Reason: The readability of the summary is crucial. Some users may want something simple and straightforward, while others might prefer a more advanced or nuanced version.

Summary of Top 5:
Summary Length (Short, Medium, Long)
Detail Level (High, Medium, Low)
Tone (Formal, Casual, Optimistic)
Keywords to Include/Exclude
Sentence Structure Complexity (Simple, Moderate, Advanced
 */