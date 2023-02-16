import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  FlatList,
} from "react-native";
import React from "react";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
import { clearStep } from "../../redux/slices/stepSlice";
import { styles } from "./styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

//https://1761-139-179-202-18.ngrok.io/

export default function CompletedVideoaskPreviewScreen(props) {
  const navigation = useNavigation();
  const previewVideo = React.useRef(null);
  const dispatch = useDispatch();
  const step = useSelector((state) => state.step);
  const formId = useSelector((state) => state.step.formId);
  const userToken = useSelector((state) => state.userToken.token);

  console.log(step);

  const renderItem = ({ item, index }) => (
    <SingleChoice index={index} item={item} />
  );

  const saveStep = async () => {};

  const SingleChoice = ({ index, item }) => {
    return (
      <TouchableOpacity style={styles.choiceContainer}>
        <Text style={styles.choiceIndex}>{index + 1}</Text>
        <Text style={styles.choiceText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const data = step.choices;

  return (
    <View style={styles.container}>
      <Video
        ref={previewVideo}
        style={styles.video}
        source={{
          uri: step.videoUrl,
        }}
        resizeMode="contain"
        // isLooping={true}
        shouldPlay
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={35} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.doneButton} onPress={saveStep}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        style={styles.choiceList}
      />
    </View>
  );
}
