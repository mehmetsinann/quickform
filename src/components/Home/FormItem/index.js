import { useState } from "react";
import { Text, View, TouchableOpacity, Image, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomSheet } from "react-native-btr";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { HighlightedText } from "../../HighlightedText";

import { styles } from "./styles";

const FormItem = ({
  formName,
  submissionCount,
  formId,
  setIsDeleteModalVisible,
  searchTerm,
}) => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const navigateTo = (screen) => {
    navigation.navigate(`${screen}`, { formName, formId });
    toggleBottomNavigationView();
  };

  const onShare = async () => {
    const initialUrl = "https://quickform-web.vercel.app/?id=";
    try {
      const result = await Share.share({
        message: `${initialUrl}${formId}`,
      }).then(() => {
        toggleBottomNavigationView();
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleBottomNavigationView}
    >
      <Image
        source={require("../../../../assets/images/Icons/formIcon.png")}
        style={styles.formItemIcon}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <HighlightedText
          searchTerm={searchTerm}
          text={formName}
          style={styles.formName}
        />
        <Text style={styles.submissions}>
          {submissionCount != 0 && submissionCount
            ? `${submissionCount} submissions`
            : "No submission yet."}
        </Text>
      </View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
          <View style={styles.sheetHeader}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Image
                source={require("../../../../assets/images/Icons/formIcon.png")}
                style={[styles.formItemIcon, { width: 20, height: 26 }]}
                resizeMode="contain"
              />
              <Text style={styles.sheetHeaderText}>{formName}</Text>
            </View>
            <TouchableOpacity onPress={toggleBottomNavigationView}>
              <Ionicons name="close-circle" size={35} color="#C8CEED" />
            </TouchableOpacity>
          </View>
          <View style={styles.sheetOptions}>
            <TouchableOpacity
              style={styles.sheetOptionsItem}
              onPress={() => {
                navigateTo("SubmissionListScreen");
              }}
            >
              <Ionicons name="mail" size={20} color="white" />
              <Text style={styles.sheetOptionsText}>Submissions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetOptionsItem]}
              onPress={() => {
                navigateTo("form");
              }}
            >
              <MaterialCommunityIcons
                name="page-previous-outline"
                size={20}
                color="white"
              />
              <Text style={styles.sheetOptionsText}>Fill Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetOptionsItem]}
              onPress={() => {
                navigateTo("FormEditScreen");
              }}
              // disabled
            >
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={20}
                color="white"
              />
              <Text style={styles.sheetOptionsText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetOptionsItem]}
              onPress={onShare}
            >
              <MaterialCommunityIcons name="share" size={20} color="white" />
              <Text style={styles.sheetOptionsText}>Publish</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetOptionsItem]}
              onPress={() => {
                toggleBottomNavigationView();
                setIsDeleteModalVisible({ isVisible: true, formId });
              }}
            >
              <MaterialCommunityIcons name="delete" size={20} color="#FF4948" />
              <Text style={[styles.sheetOptionsText, { color: "#FF4948" }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </TouchableOpacity>
  );
};

export default FormItem;
