import { Tabs } from "expo-router"

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="user/[id]" />
        </Tabs>
    )
}

export default TabsLayout