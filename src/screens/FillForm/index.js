// TODO :: edit imports
import React from "react";
import { Video } from "expo-av";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db, storage } from "../../firebase/firebaseConfig";
import { useEffect } from "react";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { clearAnswers, setAnswers } from "../../redux/slices/answerSlice";
import CompletedVideoStepCard from "../../components/CompletedVideoStepCard";
import HeaderBar from "../../components/HeaderBar";
import moment from "moment";

const FillFormScreen = ({ navigation, route }) => {
  const watchVideo = React.useRef(null);
  const { formId, formName } = route.params;
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [form, setForm] = useState();
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.answer.answers);
  const user = useSelector((state) => state.user.user);
  const [submissionID, setSubmissionID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [userInfoName, setUserInfoName] = useState(user?.name || "");
  const nameInputRef = React.useRef(null);
  const [userInfoEmail, setUserInfoEmail] = useState(user?.email || "");
  const emailInputRef = React.useRef(null);

  const getForm = () => {
    db.collection("forms")
      .doc(`${formId}`)
      .get()
      .then((res) => {
        setForm(res.data());
      });
  };

  const _setSubmissionID = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    setSubmissionID(s4() + s4() + "-" + s4() + "-" + s4());
  };

  useEffect(() => {
    getForm();
    if (route.params.index === "+1") {
      setVisibleIndex(visibleIndex + 1);
    }
  }, [route.params]);

  useEffect(() => {
    _setSubmissionID();
  }, []);

  // console.log(answers, visibleIndex);

  const renderItem = ({ item, index }) => {
    return (
      <CompletedVideoStepCard
        videoUrl={item}
        index={index + 1}
        isLast={index === form?.questions.length - 1}
      />
    );
  };

  const saveAnswers = async () => {
    setIsLoading(true);
    const storageRef = storage.ref();
    const promises = answers.map(async (url, index) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const ref = storageRef.child(
        `submissions/${formId}/${submissionID}/answer-${index + 1}`
      );
      await ref.put(blob);
      const downloadURL = await ref.getDownloadURL();
      return downloadURL;
    });

    const downloadURLs = await Promise.all(promises);
    console.log("urls :: ", downloadURLs);
    // Handle the uploaded videos here
    await db
      .collection("forms")
      .doc(`${formId}`)
      .collection("submissions")
      .doc(`${submissionID}`)
      .set({
        id: submissionID,
        formId,
        user: {
          name: userInfoName,
          email: userInfoEmail,
          uid: user?.uid || "anonymous",
        },
        urls: downloadURLs,
        createdAt: moment.now(),
      })
      .then(() => {
        dispatch(clearAnswers());
        db.collection("forms")
          .doc(`${formId}`)
          .update({
            submissionCount: form?.submissionCount + 1 || 1,
          });
        setIsLoading(false);
        navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
      });
  };

  const headerLeftButton = () => {
    const handleBack = () => {
      dispatch(clearAnswers());
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: "OnboardingScreen" }] });
      }
      setVisibleIndex(0);
    };

    return (
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  const userInfoSide = () => {
    // TODO :: set this side like name and email in the profile
    return (
      <KeyboardAvoidingView
        style={styles.userInfoContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.userInfoLabel}>Name</Text>
        <TextInput
          style={styles.userInfoInput}
          onChangeText={(text) => {
            setUserInfoName(text);
          }}
          value={userInfoName}
          ref={nameInputRef}
        />
        <Text style={styles.userInfoLabel}>Email</Text>
        <TextInput
          style={styles.userInfoInput}
          onChangeText={(text) => {
            setUserInfoEmail(text);
          }}
          value={userInfoEmail}
          keyboardType={"email-address"}
          ref={emailInputRef}
        />
      </KeyboardAvoidingView>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: "#252D5B" }]}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.videoUploadingText}>
          Your submission is saving, it may take a while depending on your
          internet speed
        </Text>
      </View>
    );
  } else {
    const isPreview = visibleIndex < form?.questions.length;
    return (
      <View style={styles.container}>
        <HeaderBar
          title={
            isPreview
              ? `${form?.title} - Q${visibleIndex + 1}`
              : `${form?.title} - Preview`
          }
          leftButton={headerLeftButton}
          backgroundColor={"#0A1551"}
        />
        {isPreview ? (
          <Video
            ref={watchVideo}
            style={styles.video}
            source={{ uri: form?.questions[visibleIndex] }}
            resizeMode="cover"
            isLooping={true}
            shouldPlay={shouldPlay}
            volume={1}
          />
        ) : (
          <FlatList
            data={answers}
            renderItem={renderItem}
            style={{
              zIndex: 1000,
              marginTop: Dimensions.get("window").height / 36,
              width: "100%",
              marginVertical: !isPreview && !user ? 0 : 100,
            }}
          />
        )}

        {!isPreview && !user && userInfoSide()}

        {isPreview ? (
          <TouchableOpacity
            style={styles.answerButton}
            onPress={() => {
              setShouldPlay(false);
              navigation.navigate("NewVideoaskScreen", {
                cameFrom: "form",
                formID: formId,
                setShouldPlay,
              });
            }}
          >
            <Text style={styles.answerText}>Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.answerButton]}
            onPress={() => {
              user
                ? saveAnswers()
                : userInfoName === ""
                ? nameInputRef.current.focus()
                : userInfoEmail === ""
                ? emailInputRef.current.focus()
                : saveAnswers(); // if user is not logged in, focus to input side
            }}
          >
            <Text style={styles.answerText}>Save Answers</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
};

export default FillFormScreen;
