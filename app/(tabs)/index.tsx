import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style = {styles.con}>
      <Link href="/user/1">Go to user 1</Link>
      <Pressable onPress={() => router.push('/user/2')}>
       <Text>
         Go to user 2
       </Text>
      </Pressable>
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
