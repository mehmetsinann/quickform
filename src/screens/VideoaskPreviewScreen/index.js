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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function VideoaskPreviewScreen(props) {
  const navigation = useNavigation();
  const previewVideo = React.useRef(null);
  const dispatch = useDispatch();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const formId = useSelector((state) => state.step.formId);
  const userToken = useSelector((state) => state.userToken.token);

  const choices = useSelector((state) => state.step.choices);
  const step = useSelector((state) => state.step);

  const [visibleBlur, setVisibleBlur] = useState(false);
  const [isPreview, setPreview] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const saveStep = async () => {};

  const toValue = () => {
    if (step.choices.length == 1) {
      return 350;
    } else if (step.choices.length == 2) {
      return 300;
    } else if (step.choices.length == 3) {
      return 230;
    } else if (step.choices.length == 4) {
      return 150;
    } else {
      return 0;
    }
  };
  const duration = () => {
    if (step.choices.length == 1) {
      return 1600;
    } else if (step.choices.length == 2) {
      return 1300;
    } else if (step.choices.length == 3) {
      return 1000;
    } else if (step.choices.length == 4) {
      return 700;
    } else {
      return 0;
    }
  };

  const startAnimationDown = () => {
    Animated.timing(animatedValue, {
      toValue: toValue(),
      duration: duration(),
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const startAnimationUp = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: duration(),
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  // console.log(step);

  const renderItem = ({ item, index }) => (
    <AddMultipleChoiceCard
      onChangeText={onChangeText}
      index={index}
      choice={choices[index]}
      deleteChoice={_deleteChoice}
      isPreview={isPreview}
    />
  );

  // console.log(choices);

  const _addChoice = () => {
    dispatch(addChoice());
  };

  const onChangeText = (text, index) => {
    dispatch(setChoice({ text, index }));
  };

  const _deleteChoice = (index) => {
    dispatch(deleteChoice(index));
  };

  function deleteEmptyChoices(choices) {
    const tempChoices = choices.filter((choice) => choice !== "");
    console.log(tempChoices);
    dispatch(setChoices(tempChoices));
  }

  console.log(step.choices);

  const AddMultipleChoiceButton = () => {
    return (
      <View style={styles.addMultipleChoiceButtonContainer}>
        <TouchableOpacity
          style={styles.addMultipleChoiceButton}
          onPress={_addChoice}
        >
          <Ionicons name="add" size={40} color="#C8CEED" />
          <Text style={styles.addMultipleChoiceButtonText}>Add Choice</Text>
        </TouchableOpacity>
      </View>
    );
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

              <TouchableOpacity
                style={styles.bottomButton}
                onPress={() => {
                  setVisibleBlur(true);
                }}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}

          {visibleBlur && (
            <View style={styles.blurView}>
              {!isPreview && (
                <Text style={styles.previewText}>Add Multiple Choice</Text>
              )}

              <Animated.View
                style={{
                  height: 640,
                  transform: [{ translateY: animatedValue }],
                }}
              >
                <FlatList
                  data={choices}
                  renderItem={renderItem}
                  ListFooterComponent={() =>
                    !isPreview &&
                    choices.length < 4 && <AddMultipleChoiceButton />
                  }
                  style={styles.flatList}
                  contentContainerStyle={{ alignItems: "center" }}
                />
              </Animated.View>
              {!isPreview && (
                <View style={styles.bottomContainer}>
                  <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={() => {
                      setVisibleBlur(false);
                      setPreview(false);
                    }}
                  >
                    <Text style={styles.buttonText}>Back</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={() => {
                      // navigation.navigate("CompletedVideoaskPreviewScreen");
                      deleteEmptyChoices(choices);
                      startAnimationDown();
                      setPreview(true);
                    }}
                  >
                    <Text style={styles.buttonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              )}
              {isPreview && (
                <View style={styles.bottomContainer}>
                  <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={() => {
                      setPreview(false);
                      startAnimationUp();
                    }}
                  >
                    <Text style={styles.buttonText}>Back</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={() => {
                      saveStep();
                    }}
                  >
                    <Text style={styles.buttonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
