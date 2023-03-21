import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";

import HeaderBar from "../../components/HeaderBar";
import CompletedVideoStepCard from "../../components/CompletedVideoStepCard/CompletedVideoStepCard";

import { styles } from "./styles";
import { db, storage } from "../../firebase/firebaseConfig";
import firebase from "firebase";

export default function SubmissionDetailScreen({ route, navigation }) {
  const {
    answers,
    name,
    email,
    saveTime,
    formName,
    formId,
    submissionId,
    refreshSubmissions,
  } = route.params;

  const date = moment(saveTime).toLocaleString();

  const temp = date.split(":");
  const submissionDate = temp[0] + ":" + temp[1];

  const renderItem = ({ item, index }) => (
    <CompletedVideoStepCard
      videoUrl={item}
      index={index + 1}
      isLast={index === answers.length - 1}
    />
  );

  const headerLeftButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  const deleteSubmission = () => {
    db.collection("forms")
      .doc(`${formId}`)
      .collection("submissions")
      .doc(`${submissionId}`)
      .delete()
      .then(() => {
        const videosPath = storage.ref(`submissions/${formId}/${submissionId}`);
        videosPath
          .listAll()
          .then((res) => {
            res.items.forEach((itemRef) => {
              itemRef
                .delete()
                .then(() => {
                  console.log("Deleted");
                })
                .catch((error) => {
                  console.log(error);
                });
            });
          })
          .then(() => {
            db.collection("forms")
              .doc(`${formId}`)
              .update({
                submissionCount: firebase.firestore.FieldValue.increment(-1),
              });
          })
          .then(() => {
            refreshSubmissions();
            navigation.goBack();
          });
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <HeaderBar
        title={`${formName} - ${name}`}
        backgroundColor="#249BB4"
        leftButton={headerLeftButton}
      />
      <View style={styles.infoContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteSubmission}
        >
          <MaterialCommunityIcons name="delete" size={20} color="#FF4948" />
          <Text style={[styles.sheetOptionsText, { color: "#FF4948" }]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Submission Date</Text>
        <Text style={styles.info}>{submissionDate}</Text>
      </View>
      <FlatList
        data={answers}
        renderItem={renderItem}
        keyExtractor={(item) => answers.indexOf(item)}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
