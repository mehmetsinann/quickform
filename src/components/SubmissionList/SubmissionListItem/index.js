import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const SubmissionListItem = ({ data, formName }) => {
  const navigation = useNavigation();
  const time = moment(data.createdAt);
  const now = moment();
  const timeAgo = Math.abs(time.diff(now, "days"));
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SubmissionDetailScreen", {
          name: data.user?.name,
          email: data.user?.email,
          saveTime: data?.createdAt,
          answers: data?.urls,
          formName: formName,
        });
      }}
      style={styles.container}
    >
      {!data.user ? (
        <View style={styles.infoUser}>
          <Text style={styles.name}>Anonymous user</Text>
        </View>
      ) : (
        <View style={styles.infoUser}>
          <Text style={styles.name}>{data?.user.name}</Text>
          <Text style={styles.email}>{data?.user.email}</Text>
        </View>
      )}

      <Text style={{ color: "gray", fontSize: 12, fontWeight: "400" }}>
        {timeAgo === 0
          ? "today"
          : timeAgo === 1
          ? "yesterday"
          : `${timeAgo} days ago`}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmissionListItem;
