import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function BottomNavigation() {
  //home-sharp
  return (
    <View style={S.navigationContainer}>
      <View style={S.screen}>
        <Ionicons name={"home-outline"} size={24} />
        <Text style={S.text}>HOME</Text>
      </View>
      <View style={S.screen}>
        <Ionicons name={"home-outline"} size={24} />
        <Text style={S.text}>CALENDAR</Text>
      </View>
      <View style={S.screen}>
        <Ionicons name={"home-outline"} size={24} />
        <Text style={S.text}>LIBRARY</Text>
      </View>
      <View style={S.screen}>
        <Ionicons name={"home-outline"} size={24} />
        <Text style={S.text}>MY PAGE</Text>
      </View>
    </View>
  );
}

export default BottomNavigation;
const S = StyleSheet.create({
  navigationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "10%",
    // alignItems: "center",
    justifyContent: "center",
    borderColor: "#f2f2f2", //회색 선 색상
    borderWidth: 1,
  },
  screen: {
    marginHorizontal: 32,
    alignItems: "center",
    marginTop: 8,
  },
  text: {
    fontSize: 8,
    fontWeight: "bold",
  },
});
