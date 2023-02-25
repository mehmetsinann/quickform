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
import { db } from "../../firebase/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

import firebase from "firebase/app";
import "firebase/storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function VideoaskPreviewScreen(props) {
  const navigation = useNavigation();
  const previewVideo = React.useRef(null);
  const dispatch = useDispatch();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const choices = useSelector((state) => state.step.choices);
  const step = useSelector((state) => state.step);
  const [visibleBlur, setVisibleBlur] = useState(false);
  const [isPreview, setPreview] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const userID = useSelector((state) => state.user.user.uid);

  const createFormAndSaveVideo = async () => {
    // setLoading(true);
    // const userRef = doc(db, "users", userID);
    // const formsCollectionRef = collection(userRef, "forms");
    // await setDoc(formsCollectionRef)
    //   .then(() => {
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //   });
    // setLoading(false);
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
                    createFormAndSaveVideo();
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
