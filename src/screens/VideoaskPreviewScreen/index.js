import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
  Animated,
  Easing,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import AddMultipleChoiceCard from "../../components/AddMultipleChoiceCard/AddMultipleChoiceCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addChoice,
  setChoice,
  deleteChoice,
  clearStep,
  setChoices,
} from "../../redux/slices/stepSlice";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
import { styles } from "./styles";
import { db, storage } from "../../firebase/firebaseConfig";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function VideoaskPreviewScreen(props) {
  const navigation = useNavigation();
  const previewVideo = React.useRef(null);
  const [visibleBlur, setVisibleBlur] = useState(false);
  const [isPreview, setPreview] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const userID = useSelector((state) => state.user.user.uid);

  const saveVideo = async () => {
    setLoading(true);
    const form = (
      await db
        .collection("forms")
        .where("id", "==", props.route.params.formID)
        .get()
    ).docs[0].data();

    const storageRef = storage.ref();
    console.log(props.route.params.source);
    const response = await fetch(props.route.params.source);
    const blob = await response.blob();
    const ref = storageRef.child(
      `${props.route.params.formID}/question-${form.questions.length + 1}`
    );

    ref
      .put(blob)
      .then((snapshot) => {
        console.log("snapshot :: ", snapshot);
        console.log("video uploaded successfully");
      })
      .then(async () => {
        const downloadURL = await ref.getDownloadURL();
        console.log("url :: ", downloadURL);
        db.collection("forms")
          .doc(`${props.route.params.formID}`)
          .set({
            ...form,
            questions: [...form.questions, downloadURL],
          });
      })
      .then(() => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "FormEditScreen",
              params: { formId: props.route.params.formID },
            },
          ],
        });
      });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: "#252D5B" }]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  } else {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            scrollEnabled={false}
            opacity={visibleBlur === isPreview ? 1 : 0.7}
          >
            <Video
              ref={previewVideo}
              style={styles.video}
              source={{ uri: props.route.params.source }}
              resizeMode="cover"
              isLooping={true}
              shouldPlay
              isMuted={visibleBlur || isPreview ? true : false}
            />
          </ScrollView>

          {!visibleBlur && (
            <Text style={styles.previewText}>Video Preview</Text>
          )}
          {!visibleBlur && (
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.bottomButton}
                onPress={() => {
                  if (props.route.params.cameFrom === "NewVideoaskScreen") {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "NewVideoaskScreen" }],
                    });
                  } else if (
                    props.route.params.cameFrom === "CompletedVideoStepCard"
                  ) {
                    navigation.goBack();
                  }
                }}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.bottomButton}>
                <Text
                  style={styles.buttonText}
                  onPress={() => {
                    saveVideo();
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
