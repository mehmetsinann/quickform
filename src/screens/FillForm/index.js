import React from "react";
import { Video } from "expo-av";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { db } from "../../firebase/firebaseConfig";
import { useEffect } from "react";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

// TODO :: add answer onpress function (it should open the camera and when finishe the record goBack and ++visibleIndex)
const FillFormScreen = ({ navigation, route }) => {
  const watchVideo = React.useRef(null);
  const { formId, formName } = route.params;
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [form, setForm] = useState();

  const getForm = () => {
    db.collection("forms")
      .doc(`${formId}`)
      .get()
      .then((res) => {
        setForm(res.data());
      });
  };

  useEffect(() => {
    getForm();
  }, []);

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.fillFormHeader}>
        <View style={{ width: 30 }}></View>
        <Text style={styles.title}>{formName}</Text>
        <TouchableOpacity style={styles.close} onPress={handleClose}>
          <Ionicons name="ios-close-circle" size={32} color="#C8CEED" />
        </TouchableOpacity>
      </View>
      <Video
        ref={watchVideo}
        style={styles.video}
        source={{ uri: form?.questions[visibleIndex] }}
        resizeMode="cover"
        isLooping={false}
        shouldPlay
        //isMuted={visibleBlur || isPreview ? true : false}
      />
      <TouchableOpacity style={styles.answerButton}>
        <Text style={styles.answerText}>Answer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FillFormScreen;
