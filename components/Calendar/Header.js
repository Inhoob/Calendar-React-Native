import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import SelectMonthModal from "../Modal/SelectMonthModal";
import SelectYearModal from "../Modal/SelectYearModal";

function Header(props) {
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  return (
    <>
      <View style={S.header}>
        <Pressable
          onPress={props.moveToPreviousMonth.bind(this, props.month)}
          style={({ pressed }) => pressed && S.pressed}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={setMonthModalVisible.bind(this, true)}>
            <Text>{props.month}월 </Text>
          </Pressable>
          <Pressable onPress={setYearModalVisible.bind(this, true)}>
            <Text>{props.year}</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={props.moveToNextMonth.bind(this, props.month)}
          style={({ pressed }) => pressed && S.pressed}
        >
          <Ionicons name="chevron-forward" size={24} color="black" />
        </Pressable>
      </View>
      <SelectMonthModal
        year={props.year}
        modalVisible={monthModalVisible}
        setModalVisible={setMonthModalVisible}
        moveToSpecificYearAndMonth={props.moveToSpecificYearAndMonth}
      />
      <SelectYearModal
        month={props.month}
        year={props.year}
        modalVisible={yearModalVisible}
        setModalVisible={setYearModalVisible}
        moveToSpecificYearAndMonth={props.moveToSpecificYearAndMonth}
      />
    </>
  );
}

export default Header;
const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const S = StyleSheet.create({
  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.3,
  },
});
