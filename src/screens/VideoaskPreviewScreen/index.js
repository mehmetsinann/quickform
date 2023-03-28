import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { db, storage } from "../../firebase/firebaseConfig";
import { setAnswers } from "../../redux/slices/answerSlice";

import { styles } from "./styles";

export default function VideoaskPreviewScreen(props) {
  const navigation = useNavigation();
  const previewVideo = React.useRef(null);
  const [visibleBlur, setVisibleBlur] = useState(false);
  const [isPreview, setPreview] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const saveVideo = async () => {
    setLoading(true);
    const form = (
      await db
        .collection("forms")
        .where("id", "==", props.route.params.formID)
        .get()
    ).docs[0].data();

    const storageRef = storage.ref();
    const response = await fetch(props.route.params.source);
    const blob = await response.blob();
    const ref = storageRef.child(
      `forms/${props.route.params.formID}/question-${form.questions.length + 1}`
    );

    ref
      .put(blob)
      .then((snapshot) => {
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
        <Text style={styles.videoUploadingText}>
          The video is loading, it may take a while depending on your internet
          speed
        </Text>
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
                style={[
                  styles.bottomButton,
                  props.route.params.cameFrom === "CompletedVideoStepCard"
                    ? { width: "80%" }
                    : {},
                ]}
                onPress={() => {
                  if (
                    props.route.params.cameFrom === "NewVideoaskScreen" ||
                    props.route.params.cameFrom === "form"
                  ) {
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

              {props.route.params.cameFrom !== "CompletedVideoStepCard" ? (
                <TouchableOpacity
                  style={styles.bottomButton}
                  onPress={() => {
                    if (props.route.params.cameFrom === "form") {
                      dispatch(setAnswers(props.route.params.source));
                      props.route.params.setShouldPlay(true);
                      navigation.navigate("form", {
                        formId: props.route.params.formID,
                        index: "+1",
                      });
                    } else {
                      saveVideo();
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
