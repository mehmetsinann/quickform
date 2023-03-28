import { Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import CreateFormItem from "./createFormItem";

import { styles } from "./styles";

const CreateFormScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons name="chevron-back" size={24} color="white" />
        <Text style={{ fontSize: 18, color: "white" }}>Back</Text>
      </TouchableOpacity>
      <CreateFormItem
        imageSource={require("../../../assets/images/classicForm.jpg")}
        text="Classic Form"
        navigateTo="classic"
      />
      <CreateFormItem
        imageSource={require("../../../assets/images/videoForm.jpg")}
        text="Video Form"
        navigateTo="video"
      />
    </View>
  );
};

export default CreateFormScreen;
