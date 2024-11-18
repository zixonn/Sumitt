import { Stack } from "expo-router";

export default function AuthNavigator () {
    return(
        <Stack>
            <Stack.Screen name = "login"/>
            <Stack.Screen name = "signup"/>
        </Stack>
    )
}