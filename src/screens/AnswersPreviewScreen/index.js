import axios from "axios";
import { StatusBar } from "expo-status-bar";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearAnswers } from "../../redux/slices/answerSlice";
import { styles } from "./styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AnswersPreviewScreen = ({ navigation, route }) => {
  const answers = useSelector((state) => state.answer.answers);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userToken = useSelector((state) => state.userToken.token);
  const formId = route.params.formId;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {};

  const saveAnswers = async (id) => {};

  const saveUserInfo = async (id) => {};

  const answer = ({ index, item }) => {
    return (
      <View style={[styles.choiceContainer]}>
        <Text style={styles.choiceIndex}>Question {index + 1}</Text>
        <Text style={styles.choiceText}>{item}</Text>
      </View>
    );
  };

  const collectUserInfo = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="name.."
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email.."
          style={styles.emailInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
    );
  };

  useEffect(() => {
    if (userToken) {
      setName(jwtDecode(userToken).name);
      setEmail(jwtDecode(userToken).email);
    }
  }, []);

  const date = moment().toLocaleString();

  const temp = date.split(":");
  const submissionDate = temp[0] + ":" + temp[1];

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        {userToken ? (
          <View style={styles.userContainer}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
          </View>
        ) : (
          collectUserInfo()
        )}
        <View style={styles.dateContainer}>
          <Text style={styles.choiceIndex}>Submission Date</Text>
          <Text style={{ fontSize: 18, marginTop: 12 }}>{submissionDate}</Text>
        </View>
        <FlatList
          data={answers}
          renderItem={answer}
          keyExtractor={(index) => index.toString()}
          style={styles.answerList}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.submit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: "white", justifyContent: "center" },
        ]}
      >
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#252D5B" />
      </View>
    );
  }
};

export default AnswersPreviewScreen;
