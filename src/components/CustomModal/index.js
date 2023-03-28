import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export const CustomModal = ({
  modalText,
  modalSubText,
  buttonOptions,
  setIsVisible,
  onConfirmFunc,
  isVisible,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.modalContainer]}>
        <Image
          source={require("../../../assets/images/Icons/deleteIcon.png")}
        />
        <Text style={styles.modalText}>{modalText}</Text>
        <Text style={styles.modalSubText}>{modalSubText}</Text>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity
            style={[
              styles.modalButton,
              { backgroundColor: "#FF4948", borderWidth: 0, marginBottom: 8 },
            ]}
            onPress={onConfirmFunc}
          >
            <Text style={{ color: "white" }}>{buttonOptions[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: "white" }]}
            onPress={() => setIsVisible(!isVisible)}
          >
            <Text style={{ color: "black" }}>{buttonOptions[1]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
