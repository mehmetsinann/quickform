import {
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, Entypo } from "@expo/vector-icons";

import CompletedVideoStepCard from "../../components/CompletedVideoStepCard";
import { db } from "../../firebase/firebaseConfig";

import { styles } from "./styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function FormEditScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { formId, formName } = route.params;
  const [steps, setSteps] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState(null);

  console.log("formID :: ", formId);

  const renderItem = ({ item, index }) => (
    <CompletedVideoStepCard
      videoUrl={item}
      index={index + 1}
      formId={formId}
      form={form}
    />
  );

  const getForm = async () => {
    const _form = (await db.collection("forms").doc(`${formId}`).get()).data();
    setForm(_form);
    setSteps(_form.questions);
  };

  useEffect(() => {
    getForm();
  }, []);

  const AddStepButton = () => {
    return (
      <TouchableOpacity
        style={styles.addStepButton}
        onPress={() => {
          navigation.navigate("NewVideoaskScreen", { formID: formId });
        }}
      >
        <Entypo name="plus" size={50} color="black" />
        <Text style={styles.addStepButtonText}>Add a question</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] })
          }
        >
          <Ionicons name="chevron-back" size={30} color="#D9D9D9" />
        </TouchableOpacity>

        <Text style={styles.newVideoaskText}>{formName || form?.title}</Text>
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
    </SafeAreaView>
  );
}
