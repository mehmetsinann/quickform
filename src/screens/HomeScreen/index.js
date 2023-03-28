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
import { CustomModal } from "../../components/CustomModal";

import { setUser } from "../../redux/slices/userSlice";

import { db, storage } from "../../firebase/firebaseConfig";

import { styles } from "./styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {
  const [isSearch, setIsSearch] = useState(false);
  const userInfo = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState({
    isVisible: false,
    formId: null,
  });
  const [isLoading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const renderItem = ({ item, index }) => (
    <FormItem
      key={index}
      formName={item.title}
      submissionCount={item?.submissionCount}
      formId={item.id}
      refreshPage={fetchForms}
      setIsDeleteModalVisible={setIsDeleteModalVisible}
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
    navigation.navigate("form", { formId: queryParams.id });
  };

  useEffect(() => {
    Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });

    if (!userInfo) {
      navigation.replace("OnboardingScreen");
      Linking.getInitialURL().then((url) =>
        url.includes("?id") ? handleUrl(url) : null
      );
    } else {
      fetchForms(true);
    }

    // return () => {
    //   remove("url");
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

  const _deleteForm = (formId) => {
    db.collection("forms")
      .doc(`${formId}`)
      .delete()
      .then(() => {
        db.collection("forms")
          .doc(`${formId}`)
          .collection("submissions")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            });
          });
      })
      .then(() => {
        console.log("Form deleted!");
        db.collection("users")
          .doc(`${userInfo.uid}`)
          .set({
            ...userInfo,
            formIDs: userInfo.formIDs.filter((id) => id !== formId),
          })
          .then(() => {
            dispatch(
              setUser({
                ...userInfo,
                formIDs: userInfo.formIDs.filter((id) => id !== formId),
              })
            );
          })
          .then(() => {
            const videosRef = storage.ref(`forms/${formId}`);

            videosRef
              .listAll()
              .then((res) => {
                res.items.forEach((itemRef) => {
                  itemRef
                    .delete()
                    .then(() => {
                      console.log("Video deleted successfully!");
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .then(async () => {
            const submissionIDs = [];
            await db
              .collection("forms")
              .doc(`${formId}`)
              .collection("submissions")
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  submissionIDs.push(doc.id);
                });
              });
            const folderRef = storage.ref(`submissions/${formId}`);

            submissionIDs.forEach((id) => {
              folderRef
                .child(`${id}`)
                .listAll()
                .then((res) => {
                  res.items.forEach(async (itemRef) => {
                    await itemRef
                      .delete()
                      .then(() => {
                        console.log("Video deleted successfully!");
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  });
                });
            });
          })
          .then(() => {
            console.log("Videos deleted");
          });
      })
      .then(() => {
        // toggleBottomNavigationView();
        // refreshPage(false);
        setIsDeleteModalVisible({
          isVisible: false,
          formId: null,
        });
        fetchForms();
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
        {isDeleteModalVisible.isVisible && (
          <CustomModal
            modalText={"Delete Form"}
            modalSubText={"This operation cannot be undone."}
            isVisible={isDeleteModalVisible}
            setIsVisible={setIsDeleteModalVisible}
            onConfirmFunc={() => _deleteForm(isDeleteModalVisible.formId)}
            buttonOptions={["Delete", "Cancel"]}
          />
        )}
      </View>
    );
  }
}
