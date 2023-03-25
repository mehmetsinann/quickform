import { useState } from "react";
import { Text, View, TouchableOpacity, Image, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomSheet } from "react-native-btr";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { db, storage } from "../../../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../../../redux/slices/userSlice";

const FormItem = ({ formName, submissionCount, formId, refreshPage }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const user = useSelector((state) => state.user.user);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const navigateTo = (screen) => {
    navigation.navigate(`${screen}`, { formName, formId });
    toggleBottomNavigationView();
  };

  const _deleteForm = () => {
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
          .doc(`${user.uid}`)
          .set({
            ...user,
            formIDs: user.formIDs.filter((id) => id !== formId),
          })
          .then(() => {
            dispatch(
              setUser({
                ...user,
                formIDs: user.formIDs.filter((id) => id !== formId),
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
        toggleBottomNavigationView();
        refreshPage(false);
      });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `exp://192.168.1.18:19000?id=${formId}`, // TODO: Change this to the actual link after deploy website
      }).then(() => {
        toggleBottomNavigationView();
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleBottomNavigationView}
    >
      <Image
        source={require("../../../../assets/images/Icons/formIcon.png")}
        style={styles.formItemIcon}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.formName}>{formName}</Text>
        <Text style={styles.submissions}>
          {submissionCount != 0 && submissionCount
            ? `${submissionCount} submissions`
            : "No submission yet."}
        </Text>
      </View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
          <View style={styles.sheetHeader}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Image
                source={require("../../../../assets/images/Icons/formIcon.png")}
                style={[styles.formItemIcon, { width: 20, height: 26 }]}
                resizeMode="contain"
              />
              <Text style={styles.sheetHeaderText}>{formName}</Text>
            </View>
            <TouchableOpacity onPress={toggleBottomNavigationView}>
              <Ionicons name="close-circle" size={35} color="#C8CEED" />
            </TouchableOpacity>
          </View>
          <View style={styles.sheetOptions}>
            <TouchableOpacity
              style={styles.sheetOptionsItem}
              onPress={() => {
                navigateTo("SubmissionListScreen");
              }}
            >
              <Ionicons name="mail" size={20} color="white" />
              <Text style={styles.sheetOptionsText}>Submissions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetOptionsItem]}
              onPress={() => {
                navigateTo("form");
              }}
            >
              <MaterialCommunityIcons
                name="page-previous-outline"
                size={20}
                color="white"
              />
              <Text style={styles.sheetOptionsText}>Fill Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetOptionsItem]}
              onPress={() => {
                navigateTo("FormEditScreen");
              }}
              // disabled
            >
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={20}
                color="white"
              />
              <Text style={styles.sheetOptionsText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetOptionsItem]}
              onPress={onShare}
            >
              <MaterialCommunityIcons name="share" size={20} color="white" />
              <Text style={styles.sheetOptionsText}>Publish</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetOptionsItem]}
              onPress={_deleteForm}
            >
              <MaterialCommunityIcons name="delete" size={20} color="#FF4948" />
              <Text style={[styles.sheetOptionsText, { color: "#FF4948" }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </TouchableOpacity>
  );
};

export default FormItem;
