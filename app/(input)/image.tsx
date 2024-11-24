import { Button, StyleSheet, View, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Page from '@/components/Page';
import MyText from '@/components/MyText';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import * as ImageManipulator from 'expo-image-manipulator'; 

const ImageComponent = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const screenWidth = Dimensions.get('window').width;

  async function uploadImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setPreviewImage(uri); 

        const resizedImage = await resizeImage(uri);
        const base64 = await convertUriToBase64(resizedImage.uri);
        setBase64Image(base64); 
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  }

  async function resizeImage(uri: string) {
    try {
      const { uri: resizedUri } = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], 
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } 
      );
      return { uri: resizedUri };
    } catch (error) {
      console.error("Error resizing image:", error);
      return { uri };
    }
  }


  async function convertUriToBase64(uri: string): Promise<string> {
    try {
      const response = await fetch(uri); 
      const blob = await response.blob(); 
      
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string; 
          resolve(base64); 
        };
        reader.onerror = (error) => {
          reject("Error reading file: " + error);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting URI to Base64:", error);
      return "";
    }
  }

  function generateSummary() {
    if (base64Image) {
      router.navigate({
        pathname: '/(summary)/summaryimage',
        params: { uri: base64Image }, 
      });
    }
  }

  return (
    <Page style={{ justifyContent: "flex-start" }}>
      <View style={styles.tipCon}>
        <MyText bold>Make Sure</MyText>
        <MyText> • Image is clear</MyText>
        <MyText> • Image contains notes</MyText>
        <MyText> • Text or writing is legible</MyText>
      </View>
      <View style={{ width: "90%" }}>
        <Button title="Select Image" onPress={uploadImage} />
      </View>
      <View style={styles.previewCon}>
        {previewImage && (
          <>
            <View style={styles.divider} />
            <MyText bold>Preview</MyText>
            <Image
              source={{ uri: previewImage }}
              style={[styles.imagePreview, { width: screenWidth * 0.9, height: screenWidth * 0.8 }]}
            />
            <Button title="Generate Summary" onPress={generateSummary} />
          </>
        )}
      </View>
    </Page>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  tipCon: {
    width: "90%",
    margin: "5%",
  },
  previewCon: {
    alignItems: "flex-start",
    marginVertical: "5%",
    width: "90%",
  },
  imagePreview: {
    marginVertical: "3%",
    alignSelf: "center", 
    borderRadius: 5,
  },
  divider: {
    width: "100%", 
    alignSelf: "center", 
    backgroundColor: "gray", 
    height: "0.2%",
    marginBottom: "5%",
  },
});
