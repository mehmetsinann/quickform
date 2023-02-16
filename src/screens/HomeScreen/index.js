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
import { setFirstRender, setForms } from "../../redux/slices/dashboardSlice";
import { styles } from "./styles";
import HeaderBar from "../../components/HeaderBar";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {
  const [isSearch, setIsSearch] = useState(false);
  const userToken = useSelector((state) => state.userToken.token);
  //const forms = useSelector((state) => state.dashboard.forms);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const firstRender = useSelector((state) => state.dashboard.firstRender);
  const [searchValue, setSearchValue] = useState("");
  const forms = [
    { title: "abc", answerNumber: 10, id: 1 },
    { title: "bcd", answerNumber: 10, id: 1 },
    { title: "cdcd", answerNumber: 10, id: 1 },
    { title: "abc", answerNumber: 10, id: 1 },
  ];
  // console.log(userToken);

  const renderItem = ({ item }) => (
    <FormItem
      formName={item.title}
      submissionInfo={item.answerNumber}
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

    if (!userToken) {
      navigation.replace("OnboardingScreen");
      if (!firstRender) {
        Linking.getInitialURL()
          .then((url) => handleUrl(url))
          .then(() => {
            dispatch(setFirstRender(true));
          });
      }
    } else {
      fetchForms();
    }

    // return () => {
    //   subscription.remove("url");
    // };
  }, []);

  const fetchForms = () => {};

  const notSignIn = () => {
    return (
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: width * 0.5, height: width * 0.5 }}
        />
        <Text style={styles.logoText}>PlayPodo</Text>
      </View>
    );
  };

  if (!userToken) {
    return notSignIn();
  } else {
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
                navigation.navigate("NewVideoaskStepsScreen", {
                  cameFrom: "HomeScreen",
                })
              }
              style={styles.newVideoaskButton}
            >
              <Entypo name="plus" size={32} color="white" />
            </TouchableOpacity>
          )}

          <FlatList
            ListEmptyComponent={<EmptyComponent />}
            data={
              searchValue.length > 0
                ? forms.filter((form) => {
                    form.title === searchValue;
                  })
                : forms
            }
            renderItem={renderItem}
            keyExtractor={(item) => forms.indexOf(item)}
          />
        </View>
      );
    }
  }
}
