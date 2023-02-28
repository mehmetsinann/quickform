import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import FormItem from "../../components/Home/FormItem";
import { Entypo, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { styles } from "./styles";
import HeaderBar from "../../components/HeaderBar";
import { db } from "../../firebase/firebaseConfig";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {
  const [isSearch, setIsSearch] = useState(false);
  const userInfo = useSelector((state) => state.user.user);
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  // const forms = [
  //   { title: "abc", answerNumber: 10, id: 1 },
  //   { title: "bcd", answerNumber: 10, id: 1 },
  //   { title: "cdcd", answerNumber: 10, id: 1 },
  //   { title: "abc", answerNumber: 10, id: 1 },
  // ];

  const renderItem = ({ item }) => (
    <FormItem
      formName={item.title}
      submissionCount={item?.submissionCount}
      formId={item.id}
    />
  );

  const handleSearch = () => {
    setIsSearch(true);
  };

  const headerLeftButton = () => {
    return (
      <TouchableOpacity onPress={handleSearch}>
        <Feather name="search" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  const headerRightButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProfileScreen");
        }}
      >
        <Feather name="settings" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require("../../../assets/images/emptyScreens/emptyHome.png")}
          style={styles.emptyHomeImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyText1}>YOU DON'T HAVE ANY FORMS YET!</Text>
        <Text style={styles.emptyText2}>Your forms will appear here.</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("NewVideoaskStepsScreen")}
        >
          <Text style={styles.createButtonText}>CREATE FORM</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleUrl = (url) => {
    let data = Linking.parse(url);
    console.log(data);
    const path = data.path;
    const queryParams = data.queryParams;
    if (path == "form") {
      navigation.navigate("form", { id: queryParams.id });
    }
  };

  useEffect(() => {
    Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });

    if (!userInfo) {
      navigation.replace("OnboardingScreen");
      Linking.getInitialURL()
        .then((url) => handleUrl(url))
        .then(() => {
          //dispatch(setFirstRender(true));
        });
    } else {
      fetchForms();
    }

    // return () => {
    //   subscription.remove("url");
    // };
  }, []);

  useEffect(() => {
    setFilteredForms(forms.filter((form) => form.title.includes(searchValue)));
  }, [searchValue]);

  const fetchForms = () => {
    setLoading(true);
    db.collection("forms")
      .where("ownerID", "==", userInfo.uid)
      .get()
      .then((res) => {
        const tempForms = [];
        res.docs.forEach((form) => {
          tempForms.push(form.data());
        });
        setForms(tempForms);
        setFilteredForms(tempForms);
        setLoading(false);
      });
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
        <StatusBar style="light" />
        <HeaderBar
          title={"Home"}
          leftButton={headerLeftButton}
          rightButton={headerRightButton}
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          backgroundColor={"#0A1551"}
        />
        {forms.length > 0 && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CreateFormScreen", {
                cameFrom: "HomeScreen",
              })
            }
            style={styles.newVideoaskButton}
          >
            <Entypo name="plus" size={32} color="white" />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 14,
            paddingHorizontal: 16,
            marginVertical: 20,
            fontWeight: "400",
          }}
        >
          My Forms
        </Text>
        {forms.length > 0 ? (
          <FlatList
            data={filteredForms}
            renderItem={renderItem}
            keyExtractor={(item) => forms.indexOf(item)}
          />
        ) : (
          <EmptyComponent />
        )}
      </View>
    );
  }
}
