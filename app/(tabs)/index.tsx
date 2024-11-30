import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Page from "@/components/Page";
import MyText from "@/components/MyText";
import SavedSummary from "@/components/SavedSummary";

const Index = () => {
  const [summaries, setSummaries] = useState<Array<{ id: string; summary: string; timestamp: string }>>([]);

  useEffect(() => {
    const loadSummaries = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const summariesData = await Promise.all(
          allKeys.map(async (key) => {
            const summaryData = await AsyncStorage.getItem(key);
            if (summaryData) {
              return {
                id: key,
                ...JSON.parse(summaryData),
              };
            }
            return null;
          })
        );

        setSummaries(summariesData.filter(Boolean));
      } catch (error) {
        console.error("Error loading summaries:", error);
      }
    };

    loadSummaries();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this summary?",
      [
        { text: "Cancel"},
        {
          text: "Delete",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(id); 
              setSummaries((prevSummaries) => prevSummaries.filter((summary) => summary.id !== id)); 
            } catch (error) {
              console.error("Error deleting summary:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <Page>
      {summaries.length === 0 ? (
        <>
          <MyText style={{ opacity: 0.5 }}>No previous entries</MyText>
          <MyText style={{ opacity: 0.5 }}>Tap "+" to get started</MyText>
        </>
      ) : (
        <ScrollView contentContainerStyle={{ paddingTop: "5%", paddingBottom: "40%" }}>
          {summaries.map((summary) => (
            <SavedSummary 
              key={summary.id} 
              id={summary.id}
              timeStamp={summary.timestamp} 
              summary={summary.summary}
              onDelete={handleDelete}  
            />
          ))}
        </ScrollView>
      )}
    </Page>
  );
};

const styles = StyleSheet.create({});

export default Index;
