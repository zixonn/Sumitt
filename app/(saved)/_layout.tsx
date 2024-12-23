import { Stack, useLocalSearchParams } from "expo-router";

export default function SavedNavigator() {
    const { id } = useLocalSearchParams()
    return(
        <Stack screenOptions={{headerTitleAlign:"left"}}>
            <Stack.Screen name="[id]" options={{headerBackVisible:true,title:id}}/>
        </Stack>
    )
}