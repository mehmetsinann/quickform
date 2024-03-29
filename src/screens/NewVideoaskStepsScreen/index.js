import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StatusBar,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { Ionicons, Entypo } from "@expo/vector-icons";

import CompletedVideoStepCard from "../../components/CompletedVideoStepCard";

import { db } from "../../firebase/firebaseConfig";
import { setUser } from "../../redux/slices/userSlice";

import { styles } from "./styles";

export default function NewVideoaskOptionsScreen(props) {
  const [videos, setVideos] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const textInputRef = useRef();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const setFormID = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + "-" + s4();
  };

  const renderItem = ({ item, index }) => (
    <CompletedVideoStepCard videoUrl={item.videoUrl} index={index + 1} />
  );

  const createForm = async () => {
    const formID = setFormID();
    await db
      .collection("forms")
      .doc(`${formID}`)
      .set({
        title: formTitle,
        ownerID: user.uid,
        id: formID,
        questions: [],
      })
      .then(() => {
        db.collection("users")
          .doc(`${user.uid}`)
          .set({
            ...user,
            formIDs: [...user.formIDs, formID],
          })
          .then(() => {
            dispatch(
              setUser({
                ...user,
                formIDs: [...user.formIDs, formID],
              })
            );
          });
      })
      .then(() => {
        navigation.navigate("NewVideoaskScreen", { formID });
      });
  };

  const AddStepButton = () => {
    return (
      <TouchableOpacity
        style={styles.addStepButton}
        onPress={() => {
          if (formTitle.length > 2) {
            createForm();
          } else {
            textInputRef.current.focus();
          }
        }}
      >
        <Entypo name="plus" size={50} color="#04092D" />
        <Text style={styles.addStepButtonText}>Create form</Text>
      </TouchableOpacity>
    );
  };

  const focusTitleInput = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#D9D9D9" />
        </TouchableOpacity>

        <TextInput
          style={styles.formTitleTextInput}
          placeholder="Form Title"
          placeholderTextColor="gray"
          value={formTitle}
          onChangeText={(text) => {
            setFormTitle(text);
          }}
          autoFocus={true}
          ref={textInputRef}
        />
      </View>
      <FlatList
        data={videos}
        renderItem={renderItem}
        ListFooterComponent={() => <AddStepButton />}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
}
