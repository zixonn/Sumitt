import { Tabs } from "expo-router"

export default function MainNavigator () {
    return(
        <Tabs>
            <Tabs.Screen name="index"  options={{title:"Home"}}/>
            <Tabs.Screen name="upload" options={{title:"Upload"}}/>
            <Tabs.Screen name="study"  options={{title:"Study"}}/>
        </Tabs>
    )
}