import { StyleSheet, View, Modal, TouchableOpacity, ScrollView, Share, Alert } from 'react-native';
import React, { useState } from 'react';
import MyText from './MyText';
import { useTheme } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import * as Clipboard from 'expo-clipboard';

interface SavedSummaryProps {
  id: string;
  timeStamp: string;
  summary: string;
  title: string;
  onDelete: (id: string) => void;
}

const SavedSummary = ({ id, timeStamp, summary, onDelete, title }: SavedSummaryProps) => {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleCopy = () => {
    Clipboard.setStringAsync(summary);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCloseModal = () => {
    setIsExpanded(false);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: summary,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={[styles.con, { borderColor: colors.border, backgroundColor: colors.card }]}>
      <MyText numberOfLines={1} fontSize='large' bold>{title}</MyText>
      <View style = {styles.topRow}>
        <Icon name='calendar' type='feather' style={{opacity:0.5}} size={15} />
        <MyText bold fontSize='small' opacity={0.5} style={{marginVertical:"2%" }}>{timeStamp}</MyText>
      </View>
      <MyText numberOfLines={3}>{summary}</MyText>
      <View style={styles.bottomRow}>
          <Icon size={25} color={colors.primary} name="delete" onPress={handleDelete} />
          <Icon size={25} color={colors.primary} name="copy" type="ionicon"  onPress={handleCopy} />
          <Icon size={25} color={colors.primary} name="share" type='ionicon' onPress={handleShare} />
          <Icon size={25} color={colors.primary} name="expand" type='ionicon' onPress={handleExpand} />
      </View>
      <Modal visible={isExpanded} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <MyText bold fontSize="large">{title}</MyText>
              <Icon name="close" type="ionicon" color={colors.primary} onPress={handleCloseModal} />
            </View>
            <ScrollView style={styles.scrollContainer}>
              <MyText>{summary}</MyText>
            </ScrollView>
            <View style={styles.modalActions}>
              <Icon size={25} color={colors.primary} name="delete" onPress={handleDelete} />
              <Icon size={25} color={colors.primary} name="copy" type="ionicon"  onPress={handleCopy} />
              <Icon size={25} color={colors.primary} name="share" type='ionicon' onPress={handleShare} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SavedSummary;

const styles = StyleSheet.create({
  con: {
    borderWidth: 1,
    marginVertical: '2%',
    alignSelf: 'center',
    width: '95%',
    padding: '4%',
    paddingBottom: '10%',
  },
  topRow:{
    flexDirection:"row",
    alignItems: 'center',
    gap:'1%'
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop:"4%",
    marginBottom:"-5%",
    gap:"2%"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxHeight: '80%',
    padding:"5%"
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContainer: {
    marginVertical: "3%",
  },
  modalActions: {
    flexDirection: 'row',
    marginVertical:"3%",
    gap:"2%",
  },
});
