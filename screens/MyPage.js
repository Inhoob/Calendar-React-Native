import { View, Text } from "react-native";
import BasicButton from "../components/Button/BasicButton";
import { useState } from "react";
import BasicModal from "../components/Modal/BasicModal";
function MyPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalVisible = (boolean = false) => {
    setModalVisible(boolean);
  };

  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 200,
        }}
      >
        <BasicButton
          title={"MyPage"}
          onPress={handleModalVisible.bind(this, true)}
        />
        <BasicModal
          modalVisible={modalVisible}
          setModalVisible={handleModalVisible}
        >
          <Text>hi</Text>
        </BasicModal>
      </View>
    </>
  );
}
export default MyPage;
