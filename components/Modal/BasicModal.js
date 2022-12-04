import { Modal, View, Alert, StyleSheet, SafeAreaView } from "react-native";

const BasicModal = ({
  width,
  height,
  minWidth = 200,
  minHeight = 150,
  position,
  borderRadius = 20,
  boxShadow,
  transparent = true,
  modalVisible,
  setModalVisible,
  children,
  padding = 25,
}) => {
  return (
    <>
      <SafeAreaView style={S.centeredView}>
        <Modal
          animationType="slide"
          transparent={transparent}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(false);
          }}
        >
          <View style={S.centeredView}>
            <View
              style={[
                S.modalView,
                {
                  width: width,
                  height: height,
                  minWidth: minWidth,
                  minHeight: minHeight,
                  position: position,
                  borderRadius: borderRadius,
                  boxShadow: boxShadow,
                  padding: padding,
                },
              ]}
            >
              {children}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default BasicModal;
const S = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
