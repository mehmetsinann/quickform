import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CompletedVideoStepCard from "../../components/CompletedVideoStepCard/CompletedVideoStepCard";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFormId } from "../../redux/slices/stepSlice";
import { styles } from "./styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function FormEditScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id } = route.params;
  const [steps, setSteps] = useState([]);
  const [title, setTitle] = useState("");
  const userToken = useSelector((state) => state.userToken.token);
  const [isLoading, setLoading] = useState(false);

  console.log(id);

  // console.log(data.videUrl);

  const renderItem = ({ item, index }) => (
    <CompletedVideoStepCard
      videoUrl={item.videoLink}
      index={index + 1}
      stepId={item._id}
      formId={id}
    />
  );

  const getForm = async () => {};

  useEffect(() => {
    getForm();
  }, []);

  const AddStepButton = () => {
    return (
      <TouchableOpacity
        style={styles.addStepButton}
        onPress={() => {
          dispatch(setFormId(id));
          navigation.navigate("NewVideoaskScreen", { formId: id });
        }}
      >
        <Entypo name="plus" size={50} color="black" />
        <Text style={styles.addStepButtonText}>Add a question</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] })
          }
        >
          <Ionicons name="chevron-back" size={30} color="#D9D9D9" />
        </TouchableOpacity>

        <Text style={styles.newVideoaskText}>{title}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit" size={25} color="#D9D9D9" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={[styles.container, { justifyContent: "center" }]}>
          <StatusBar style="light" />
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlatList
          data={steps}
          renderItem={renderItem}
          ListFooterComponent={() => <AddStepButton />}
          style={styles.flatList}
        />
      )}
    </View>
  );
}
