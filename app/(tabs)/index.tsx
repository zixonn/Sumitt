import MyText from "@/components/MyText";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style = {styles.con}>
      <MyText>Hello World!</MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  con:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
