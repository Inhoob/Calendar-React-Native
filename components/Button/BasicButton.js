import { Pressable, StyleSheet, Text } from "react-native";

function BasicButton({
  onPress,
  title = "Button",
  backgroudColor = "#007AFF",
  fontSize = 16,
  width,
  height,
  color,
}) {
  return (
    <Pressable
      style={[
        S.button,
        { backgroundColor: backgroudColor, width: width, height: height },
      ]}
      onPress={onPress}
    >
      <Text style={[S.text, { fontSize: fontSize, color: color }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const S = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
export default BasicButton;
