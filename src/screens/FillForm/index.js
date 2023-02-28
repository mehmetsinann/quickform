import React from "react";
import { Video } from "expo-av";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db, storage } from "../../firebase/firebaseConfig";
import { useEffect } from "react";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { clearAnswers, setAnswers } from "../../redux/slices/answerSlice";
import CompletedVideoStepCard from "../../components/CompletedVideoStepCard/CompletedVideoStepCard";

const FillFormScreen = ({ navigation, route }) => {
  const watchVideo = React.useRef(null);
  const { formId, formName } = route.params;
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [form, setForm] = useState();
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.answer.answers);
  const user = useSelector((state) => state.user.user);
  const [submissionID, setSubmissionID] = useState(null);
  const [downloadableURLs, setDownloadableURLs] = useState([]);

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

  const handleClose = () => {
    navigation.goBack();
    dispatch(clearAnswers());
    setVisibleIndex(0);
  };

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
        ownerId: user?.uid,
        urls: downloadURLs,
      })
      .then(() => {
        dispatch(clearAnswers());
        navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.fillFormHeader}>
        <View style={{ width: 30 }}></View>
        <Text style={styles.title}>{form?.title || formName}</Text>
        <TouchableOpacity style={styles.close} onPress={handleClose}>
          <Ionicons name="ios-close-circle" size={32} color="#C8CEED" />
        </TouchableOpacity>
      </View>
      {visibleIndex < form?.questions.length ? (
        <Video
          ref={watchVideo}
          style={styles.video}
          source={{ uri: form?.questions[visibleIndex] }}
          resizeMode="cover"
          isLooping={true}
          shouldPlay
          //isMuted={visibleBlur || isPreview ? true : false}
        />
      ) : (
        <FlatList
          data={answers}
          renderItem={renderItem}
          style={{
            zIndex: 1000,
            flex: 1,
            marginTop: Dimensions.get("window").height / 5,
            paddingHorizontal: 64,
          }}
        />
      )}

      {visibleIndex <= form?.questions.length - 1 ? (
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => {
            navigation.navigate("NewVideoaskScreen", {
              cameFrom: "form",
              formID: formId,
            });
          }}
        >
          <Text style={styles.answerText}>Answer</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => {
            saveAnswers();
          }}
        >
          <Text style={styles.answerText}>Save Answers</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FillFormScreen;
