import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { db, storage } from "../../firebase/firebaseConfig";
import { deleteObject } from "firebase/storage";

export default function CompletedVideoStepCard({
  videoUrl,
  index,
  form,
  isLast,
}) {
  const previewVideo = React.useRef(null);
  const navigation = useNavigation();

  const deleteStep = async () => {
    const deletedQuestion = form.questions.splice(index - 1, 1);
    db.collection("forms")
      .doc(`${form.id}`)
      .set({
        ...form,
        questions: form.questions,
      })
      .then(() => {
        const videoPath = `${form.id}/question-${index}`;
        const videoRef = storage.ref(videoPath);
        videoRef.delete();
      })
      .then(() => {
        console.log("question deleted successfully :: ", deletedQuestion);
        navigation.navigate("FormEditScreen", {
          source: videoUrl,
          cameFrom: "HomeScreen",
          formName: form.title,
          formId: form.id,
        });
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addStepButton}
        onPress={() =>
          navigation.navigate("VideoaskPreviewScreen", {
            source: videoUrl,
            cameFrom: "CompletedVideoStepCard",
          })
        }
      >
        <Video
          ref={previewVideo}
          style={styles.video}
          source={{ uri: videoUrl }}
          resizeMode="cover"
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
            position: "absolute",
            left: 10,
            top: 10,
          }}
        >
          {index}
        </Text>
        {form ? (
          <TouchableOpacity onPress={deleteStep} style={styles.deleteIcon}>
            <AntDesign name="delete" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </TouchableOpacity>
      {!form && !isLast && (
        <Ionicons
          name="ellipsis-vertical"
          size={30}
          color="gray"
          style={{ alignSelf: "center" }}
        />
      )}
    </View>
  );
}
