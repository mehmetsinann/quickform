import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import moment from "moment";

import { styles } from "./styles";
import { HighlightedText } from "../../HighlightedText";

const SubmissionListItem = ({
  data,
  formName,
  isLast,
  refreshSubmissions,
  searchTerm,
}) => {
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
          formId: data?.formId,
          submissionId: data?.id,
          refreshSubmissions: refreshSubmissions,
        });
      }}
      style={[styles.container, { borderBottomWidth: isLast ? 0 : 1 }]}
    >
      {!data.user ? (
        <View style={styles.infoUser}>
          <Text style={styles.name}>Anonymous user</Text>
        </View>
      ) : (
        <View style={styles.infoUser}>
          <HighlightedText
            style={styles.name}
            searchTerm={searchTerm}
            text={data?.user.name}
          />
          <HighlightedText
            style={styles.email}
            searchTerm={searchTerm}
            text={data?.user.email}
          />
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
