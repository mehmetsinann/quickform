import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

const CreateFormItem = ({ text, imageSource, navigateTo }) => {
  const navigation = useNavigation();
  const navigateCreateForm = () => {
    if (navigateTo === "video") {
      navigation.navigate("NewVideoaskStepsScreen");
    }
  };
  return (
    <TouchableOpacity
      style={[styles.itemContainer]}
      onPress={navigateCreateForm}
      disabled={text === "Classic Form"}
    >
      <Image
        source={imageSource}
        resizeMode="cover"
        style={{ width: "100%", height: "100%", borderRadius: 16, zIndex: -1 }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        {text === "Classic Form" ? <Text>Soon</Text> : <></>}
      </View>
    </TouchableOpacity>
  );
};

export default CreateFormItem;
