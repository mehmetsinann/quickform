import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Device from "expo-device";
import * as Linking from "expo-linking";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { setAnswers } from "../../redux/slices/answerSlice";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const FillFormScreen = ({ navigation, route }) => {
  const video = React.useRef(null);
  const [visibleChoices, setVisibleChoices] = useState(false);
  const [visiblePlayButton, setVisiblePlayButton] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [answerType, setAnswerType] = useState("");

  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const getForm = () => {};

  console.log(data);

  useEffect(() => {
    getForm();
  }, []);

  const renderItem = ({ item, index }) => (
    <SingleChoice index={index} item={item} />
  );

  const SingleChoice = ({ index, item }) => {
    const [isChosen, setIsChosen] = useState(false);
    const choose = (item) => {
      // console.log(item);
      setIsChosen(true);
      dispatch(setAnswers(item));
      setCurrentStepIndex(currentStepIndex + 1);
      setAnswerType("");

      if (currentStepIndex === data.length - 1) {
        navigation.navigate("AnswersPreviewScreen", {
          formId: route.params.id,
          formName: route.params.formName,
        });
      }

      setIsChosen(false);
      setVisibleChoices(false);
      setVisiblePlayButton(false);
      // setChosen(item);
      // console.log(chosen);

      // steps arrayinden kontrol et sonuncuda answers preview ekranına gönder
      // navigation.replace("form", {
      //   videoLink: data.videoLink,
      //   choices: data.choices,
      // });
      //navigate to next video, setIsChosen to false, setChosen to null, visibleChoices to false, visiblePlayButton to false
    };
    // console.log(item, index);
    return (
      <TouchableOpacity
        style={[
          styles.choiceContainer,
          { backgroundColor: isChosen ? "green" : "#04092D" },
        ]}
        onPress={() => {
          choose(item);
        }}
        disabled={isChosen}
      >
        <Text style={styles.choiceText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const AnswerTypeButtons = () => {
    const [_text, setText] = useState("");

    if (answerType === "") {
      return (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              setAnswerType("MultipleChoice");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Multiple Choice</Text>
            <Feather name="list" size={30} color="#C8CEED" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAnswerType("Text");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Text</Text>
            <Ionicons name="text" size={30} color="#C8CEED" />
          </TouchableOpacity>
        </View>
      );
    } else if (answerType === "MultipleChoice") {
      return (
        <FlatList
          data={data[currentStepIndex]?.choices}
          renderItem={renderItem}
          keyExtractor={(item) => data[currentStepIndex]?.choices.indexOf(item)}
          style={styles.choiceList}
        />
      );
    } else if (answerType === "Text") {
      return (
        <KeyboardAvoidingView behavior="position" style={{ zIndex: 10 }}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.choiceTextInput}
              placeholder="type here"
              placeholderTextColor="gray"
              multiline={true}
              value={_text}
              onChangeText={setText}
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                dispatch(setAnswers(_text));
                setCurrentStepIndex(currentStepIndex + 1);
                setAnswerType("");

                if (currentStepIndex === data.length - 1) {
                  navigation.navigate("AnswersPreviewScreen", {
                    formId: route.params.id,
                    formName: route.params.formName,
                  });
                }

                setVisibleChoices(false);
                setVisiblePlayButton(false);
              }}
            >
              <MaterialIcons name="done" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
    // console.log(_text);
  };

  // console.log(_text);

  console.log(route.params);
  if (data === null) {
    return <Text>Loading</Text>;
  } else {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              position: "absolute",
              top: 32,
              left: 20,
              zIndex: 10,
            }}
          >
            <Text style={{ color: "#efefef", fontSize: 32 }}>
              {title} - {currentStepIndex + 1}
            </Text>
          </View>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: data[currentStepIndex]?.videoLink,
            }}
            resizeMode="cover"
            // isLooping={true}
            shouldPlay
            onPlaybackStatusUpdate={(playbackStatus) => {
              if (playbackStatus.didJustFinish) {
                setVisiblePlayButton(true);
                setVisibleChoices(true);
              }
            }}
          />
          {visibleChoices ? <AnswerTypeButtons /> : <></>}

          {visiblePlayButton && (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                video.current.replayAsync();
                setVisiblePlayButton(false);
              }}
            >
              <Ionicons name="play-circle" size={80} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export default FillFormScreen;
