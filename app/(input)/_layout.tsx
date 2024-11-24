import { Stack } from "expo-router";

export default function InputNavigator(){
    return(
        <Stack>
            <Stack.Screen name="picture"  options={{ title: "Take Picture"}} />
            <Stack.Screen name="image" options={{ title: "Upload Image"}}/>
            <Stack.Screen name="manual"  options={{ title: "Manual Input"}} />
        </Stack>
    )
}