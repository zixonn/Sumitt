import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import MyText from './MyText';
import { useTheme } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import * as Clipboard from 'expo-clipboard';

interface SavedSummaryProps {
  id: string; 
  timeStamp: string;
  summary: string;
  onDelete: (id: string) => void;  
}

const SavedSummary = ({ id, timeStamp, summary, onDelete }: SavedSummaryProps) => {
  const { colors } = useTheme();

  const handleDelete = () => {
    onDelete(id); 
  };

  const handleCopy = () => {
    Clipboard.setStringAsync(summary);
  };

  return (
    <View style={[styles.con, { borderColor: colors.border, backgroundColor: colors.card }]}>
        <View style = {styles.topRow}>
            <MyText bold style={{ marginVertical: "2%" }}>{timeStamp}</MyText>
            <View style = {{flexDirection:"row", gap:10}}>
              <Icon name="copy1" type="antdesign" color={colors.primary} onPress={handleCopy} />
              <Icon  color={colors.primary} name='delete' onPress={handleDelete} />
            </View>
        </View>
      <MyText fontSize="small">{summary}</MyText>
    </View>
  );
};

export default SavedSummary;

const styles = StyleSheet.create({
  con: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: "2%",
    alignSelf: "center",
    width: "95%",
    padding: "5%",
    paddingBottom:"10%"
  },
  topRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:"2%"
  }
});
