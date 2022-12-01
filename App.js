import { StyleSheet, View } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Calendar from "./screens/Calendar";
import Library from "./screens/Library";
import MyPage from "./screens/MyPage";
import { Ionicons, Feather } from "@expo/vector-icons";
export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <View style={S.appContainer}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color }) => {
              switch (route.name) {
                case "Home":
                  return <Ionicons name="home-sharp" size={24} color={color} />;
                case "Calendar":
                  return (
                    <Ionicons name="calendar-sharp" size={24} color={color} />
                  );
                case "Library":
                  return <Ionicons name="barbell" size={24} color={color} />;
                case "MyPage":
                  return <Feather name="user" size={24} color={color} />;
              }
            },
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Calendar" component={Calendar} />
          <Tab.Screen name="Library" component={Library} />
          <Tab.Screen name="MyPage" component={MyPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const S = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
