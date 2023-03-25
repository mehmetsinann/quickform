// TODO :: edit imports
import React from "react";
import { Video } from "expo-av";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { db, storage } from "../../firebase/firebaseConfig";
import { useEffect } from "react";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { clearAnswers, setAnswers } from "../../redux/slices/answerSlice";
import CompletedVideoStepCard from "../../components/CompletedVideoStepCard/CompletedVideoStepCard";
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
  const [isUserInfoModalVisible, setIsUserInfoModalVisible] = useState(false);
  const [userInfoName, setUserInfoName] = useState(user?.name || "");
  const [userInfoEmail, setUserInfoEmail] = useState(user?.email || "");

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
      navigation.goBack();
      setVisibleIndex(0);
    };

    return (
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  const userInfoModal = () => {
    return (
      <View style={styles.userInfoModal}>
        <TouchableOpacity
          onPress={() => setIsUserInfoModalVisible(false)}
          style={styles.modalCloseIcon}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.userInfoModalText}>Name</Text>
        <TextInput
          style={styles.userInfoModalInput}
          placeholder="Enter your name"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            setUserInfoName(text);
          }}
        />
        <Text style={styles.userInfoModalText}>Email</Text>
        <TextInput
          style={styles.userInfoModalInput}
          placeholder="Enter your email"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            setUserInfoEmail(text);
          }}
        />
        <TouchableOpacity
          style={styles.userInfoModalButton}
          onPress={() => {
            saveAnswers();
            setIsUserInfoModalVisible(false);
          }}
        >
          <Text style={styles.userInfoModalButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
              marginTop: Dimensions.get("window").height / 10,
            }}
          />
        )}

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
            style={[
              styles.answerButton,
              { display: !isUserInfoModalVisible ? "flex" : "none" },
            ]}
            onPress={() => {
              user ? saveAnswers() : setIsUserInfoModalVisible(true);
            }}
          >
            <Text style={styles.answerText}>Save Answers</Text>
          </TouchableOpacity>
        )}

        {isUserInfoModalVisible && !isPreview && userInfoModal()}
        {isUserInfoModalVisible && !isPreview && (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              opacity: 0.9,
              position: "absolute",
              top: 0,
              zIndex: 1000,
            }}
            onTouchStart={() => {
              setIsUserInfoModalVisible(false);
            }}
          ></View>
        )}
      </View>
    );
  }
};

export default FillFormScreen;
