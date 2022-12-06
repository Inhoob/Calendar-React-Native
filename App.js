import { StyleSheet, View } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./screens/HomePage";
import CalendarPage from "./screens/CalendarPage";
import LibraryPage from "./screens/LibraryPage";
import MyPage from "./screens/MyPage";
import { Ionicons, Feather } from "@expo/vector-icons";
import "react-native-get-random-values";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={S.appContainer}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color }) => {
                switch (route.name) {
                  case "HomePage":
                    return (
                      <Ionicons name="home-sharp" size={24} color={color} />
                    );
                  case "CalendarPage":
                    return (
                      <Ionicons name="calendar-sharp" size={24} color={color} />
                    );
                  case "LibraryPage":
                    return <Ionicons name="barbell" size={24} color={color} />;
                  case "MyPage":
                    return <Feather name="user" size={24} color={color} />;
                }
              },
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="HomePage" component={HomePage} />
            <Tab.Screen name="CalendarPage" component={CalendarPage} />
            <Tab.Screen name="LibraryPage" component={LibraryPage} />
            <Tab.Screen name="MyPage" component={MyPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  );
}

const S = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
