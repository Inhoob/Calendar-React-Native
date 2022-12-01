import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BottomNavigation from "./components/BottomNavigation";

export default function App() {
  return (
    <View style={S.appContainer}>
      <BottomNavigation />
    </View>
  );
}

const S = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
