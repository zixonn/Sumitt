import { Stack } from "expo-router";

export default function OptionsNavigator() {
    return(
        <Stack>
            <Stack.Screen name="options" options={{title:"Options",headerBackVisible:false}}/>
        </Stack>
    )
}