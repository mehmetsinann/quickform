import {
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

export default function CompletedVideoaskPreviewScreen(props) {
  const navigation = useNavigation();
  const previewVideo = React.useRef(null);
  const step = useSelector((state) => state.step);

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
