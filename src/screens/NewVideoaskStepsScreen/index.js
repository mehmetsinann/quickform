import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import CompletedVideoStepCard from "../../components/CompletedVideoStepCard/CompletedVideoStepCard";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFormId } from "../../redux/slices/stepSlice";
import { styles } from "./styles";

export default function NewVideoaskOptionsScreen(props) {
  const [videos, setVideos] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <CompletedVideoStepCard videoUrl={item.videoUrl} index={index + 1} />
  );

  const createForm = async () => {};

  const AddStepButton = () => {
    return (
      <TouchableOpacity
        style={styles.addStepButton}
        onPress={() => {
          if (formTitle.length > 2) {
            createForm();
            navigation.navigate("NewVideoaskScreen");
          } else {
            setIsEditable(true);
          }
        }}
      >
        <Entypo name="plus" size={50} color="#04092D" />
        <Text style={styles.addStepButtonText}>Create form</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="#D9D9D9" />
        </TouchableOpacity>

        {!isEditable && <Text style={styles.formTitleText}>Form Title</Text>}
        {isEditable && (
          <TextInput
            style={styles.formTitleTextInput}
            placeholder="Form Title"
            placeholderTextColor="gray"
            value={formTitle}
            onChangeText={(text) => {
              setFormTitle(text);
            }}
            autoFocus={true}
          />
        )}
        {!isEditable && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditable(true)}
          >
            <Feather name="edit" size={25} color="#D9D9D9" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={videos}
        renderItem={renderItem}
        ListFooterComponent={() => <AddStepButton />}
        style={styles.flatList}
      />
    </View>
  );
}
