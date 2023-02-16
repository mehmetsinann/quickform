import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import AddMultipleChoiceCard from "../../components/AddMultipleChoiceCard/AddMultipleChoiceCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addChoice,
  setChoice,
  deleteChoice,
} from "../../redux/slices/stepSlice";
import { styles } from "./styles";

export default function AddMultipleChoiceScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const choices = useSelector((state) => state.step.choices);
  const step = useSelector((state) => state.step);

  console.log(step);

  const renderItem = ({ item, index }) => (
    <AddMultipleChoiceCard
      onChangeText={onChangeText}
      index={index}
      choice={choices[index]}
      deleteChoice={_deleteChoice}
    />
  );

  console.log(choices);

  const _addChoice = () => {
    dispatch(addChoice());
  };

  const onChangeText = (text, index) => {
    dispatch(setChoice({ text, index }));
  };

  const _deleteChoice = (index) => {
    dispatch(deleteChoice(index));
  };

  // const submit = () => {
  //   console.log(choices);
  // }

  const AddMultipleChoiceButton = () => {
    return (
      <View style={styles.addMultipleChoiceButtonContainer}>
        <TouchableOpacity
          style={styles.addMultipleChoiceButton}
          onPress={_addChoice}
        >
          <Ionicons name="add" size={30} color="black" />
          <Text style={styles.addMultipleChoiceButtonText}>Add Choice</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.profileText}>Add Multiple Choice</Text>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            navigation.navigate("CompletedVideoaskPreviewScreen");
            // submit()
          }}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={choices}
          renderItem={renderItem}
          ListFooterComponent={() => <AddMultipleChoiceButton />}
          style={styles.flatList}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
    </View>
  );
}
