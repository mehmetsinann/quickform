import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import SubmissionListItem from "../../components/SubmissionList/SubmissionListItem";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "./styles";
import HeaderBar from "../../components/HeaderBar";
import { db } from "../../firebase/firebaseConfig";

export default function SubmissionListScreen({ route, navigation }) {
  const { formName, formId } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // const data = new Array(20).fill({
  //   formUser: {
  //     name: "John Doe",
  //     email: "johndoe@example.com",
  //   },
  //   createdAt: "2022-07-28T10:42:41.976Z",
  //   steps: ["Yes", "No", "yes", "no", "yes", "no"],
  // });

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      data.filter((item) => item?.formUser?.name?.includes(searchValue))
    );
  }, [searchValue]);

  const getSubmissionList = () => {
    setLoading(true);
    db.collection("forms")
      .doc(formId)
      .collection("submissions")
      .get()
      .then((querySnapshot) => {
        const submissions = [];
        querySnapshot.forEach((doc) => {
          submissions.push(doc.data());
        });
        setData(submissions);
        setFilteredData(submissions);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSubmissionList();
  }, []);

  const renderItem = ({ item }) => (
    <SubmissionListItem data={item} formName={formName} />
  );

  const emptyScreen = () => {
    return (
      <View style={styles.emptyInbox}>
        <Image
          source={require("../../../assets/images/inbox/inbox-empty.png")}
          style={styles.emptyInboxImage}
        />
        <Text style={styles.emptyInboxText}>
          YOU DON'T HAVE ANY SUBMISSIONS YET!
        </Text>
      </View>
    );
  };

  const headerLeftButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  const headerRightButton = () => {
    return (
      <TouchableOpacity onPress={handleSearch}>
        <Feather name="search" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  const handleSearch = () => {
    setIsSearch(true);
  };

  if (isLoading) {
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
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <HeaderBar
          title={formName}
          backgroundColor="#249BB4"
          leftButton={headerLeftButton}
          rightButton={headerRightButton}
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <View style={styles.listContainer}>
          <Text
            style={{
              fontSize: 13,
              paddingHorizontal: 16,
              marginVertical: 20,
              fontWeight: "400",
            }}
          >
            Inbox
          </Text>
          <FlatList
            ListEmptyComponent={emptyScreen}
            data={filteredData}
            renderItem={renderItem}
            style={{ paddingHorizontal: 16 }}
          />
        </View>
      </View>
    );
  }
}
