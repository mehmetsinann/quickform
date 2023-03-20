import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import * as Linking from "expo-linking";
import { Entypo, Feather } from "@expo/vector-icons";

import HeaderBar from "../../components/HeaderBar";
import FormItem from "../../components/Home/FormItem";

import { db } from "../../firebase/firebaseConfig";

import { styles } from "./styles";

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

  const renderItem = ({ item, index }) => (
    <FormItem
      key={index}
      formName={item.title}
      submissionCount={item?.submissionCount}
      formId={item.id}
      refreshPage={fetchForms}
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
      fetchForms(true);
    }

    // return () => {
    //   subscription.remove("url");
    // };
  }, []);

  useEffect(() => {
    setFilteredForms(forms.filter((form) => form.title.includes(searchValue)));
  }, [searchValue]);

  const fetchForms = (loading) => {
    setLoading(loading);
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
              navigation.navigate("NewVideoaskStepsScreen", {
                cameFrom: "HomeScreen",
              })
            }
            style={styles.newVideoaskButton}
          >
            <Entypo name="plus" size={32} color="white" />
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
            }}
          >
            My Forms
          </Text>
          <TouchableOpacity
            onPress={() => {
              fetchForms(true);
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ marginRight: 4 }}>Sync Data</Text>
            <Feather name="refresh-cw" size={16} color="black" />
          </TouchableOpacity>
        </View>
        {forms.length > 0 ? (
          <FlatList data={filteredForms} renderItem={renderItem} />
        ) : (
          <EmptyComponent />
        )}
      </View>
    );
  }
}
