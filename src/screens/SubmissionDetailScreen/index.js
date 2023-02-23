import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "./styles";
import HeaderBar from "../../components/HeaderBar";

export default function SubmissionDetailScreen({ route, navigation }) {
  const { answers, name, email, saveTime, formName } = route.params;

  console.log(answers);

  const date = moment(saveTime).toLocaleString();

  const temp = date.split(":");
  const submissionDate = temp[0] + ":" + temp[1];

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.row}>
      <Text style={styles.label}>Question {index + 1}</Text>
      <Text style={styles.answer}>{item.choice}</Text>
      {/* {console.log(item, index)} */}
    </View>
  );

  const headerLeftButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <HeaderBar
        title={`${formName} - ${name}`}
        backgroundColor="#249BB4"
        leftButton={headerLeftButton}
      />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Submission Date</Text>
        <Text style={styles.info}>{submissionDate}</Text>
      </View>
      <FlatList
        data={answers}
        renderItem={renderItem}
        keyExtractor={(item) => answers.indexOf(item)}
      />
    </View>
  );
}
