import { StyleSheet, View, Text } from "react-native";
import BasicButton from "../Button/BasicButton";
import BasicModal from "./BasicModal";

function SelectYearModal({
  month,
  year,
  modalVisible,
  setModalVisible,
  moveToSpecificYearAndMonth,
}) {
  const yearList = Array.from({ length: 8 }, (v, i) => year - 4 + i + "년");
  const handlePressYear = (year, month) => {
    moveToSpecificYearAndMonth(year, month);
    setModalVisible(false);
  };

  return (
    <>
      <BasicModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        padding={12}
      >
        <View style={S.modalContaner}>
          {yearList.map((year) => (
            <View style={S.button} key={year}>
              <BasicButton
                title={year}
                fontSize={12}
                color={"white"}
                height={40}
                onPress={handlePressYear.bind(
                  this,
                  Number(year.slice(0, 4)),
                  month
                )}
              />
            </View>
          ))}
        </View>
      </BasicModal>
    </>
  );
}

const S = StyleSheet.create({
  modalContaner: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    marginHorizontal: 4,
    marginVertical: 2,
    width: "30%",
  },
});
export default SelectYearModal;
