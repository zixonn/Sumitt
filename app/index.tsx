import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useState } from "react";

const HomePage = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callOpenAI = async () => {
    setLoading(true);
    setError("");
    try {
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;
      if (!apiKey) throw new Error("API key is missing!");

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: "You are a helpful assistant pirate" }, { role: "user", content: userInput }],
        }),
      });

      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (err) {
      setError(err.message);
      setResponse("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your message:</Text>
      <TextInput style={styles.input} placeholder="Type your question" value={userInput} onChangeText={setUserInput} />
      <Button title="Call OpenAI" onPress={callOpenAI} />
      <Text style={styles.responseText}>{loading ? "Loading..." : response || error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  text: { fontSize: 18, marginBottom: 10 },
  input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, paddingHorizontal: 10, width: "80%" },
  responseText: { fontSize: 16, textAlign: "center", color: (error && "red") || "black" },
});

export default HomePage;
