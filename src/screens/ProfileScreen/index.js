import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";
import { clearForms } from "../../redux/slices/dashboardSlice";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import HeaderBar from "../../components/HeaderBar";
import { Feather } from "@expo/vector-icons";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const [setName, setSetName] = useState("");
  const [setEmail, setSetEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  function signOut() {
    // token state silincek
    dispatch(removeUser());
    dispatch(clearForms());
    navigation.reset({
      index: 0,
      routes: [{ name: "OnboardingScreen" }],
    });
  }

  const saveProfile = async () => {
    const user = auth.currentUser;
    await updateProfile(user, {
      displayName: setName,
    })
      .then(() => {
        Alert.alert("display name updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const headerLeftButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        leftButton={headerLeftButton}
        title="Profile"
        headerRightButton={<View></View>}
        backgroundColor="#0A1551"
      />
      <View style={styles.profileContainer}>
        <View style={styles.profilePicContainer}>
          <Image
            style={styles.profilePic}
            source={{
              uri: userInfo?.photoURL
                ? userInfo?.photoURL
                : "https://cdn.jotfor.ms/assets/img/v4/avatar/Podo-Avatar2-03.png?ssl=1",
            }}
          ></Image>
        </View>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.labelContainer}>
          <Text style={styles.nameLabel}>Name</Text>
          <Text style={styles.emailLabel}>Email</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <TextInput
              style={styles.name}
              onFocus={() => {
                setIsEdit(true);
              }}
              value={userInfo?.name}
              onChangeText={setSetName}
            >
              {userInfo?.name}
            </TextInput>
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.email}>{userInfo?.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.editContainer}>
        <TouchableOpacity style={styles.changePasswordContainer}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAccountContainer}>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {isEdit &&
      (setName.length > 0 ||
        (setEmail.length > 0 && setEmail.includes("@"))) ? (
        <TouchableOpacity style={styles.signOut} onPress={saveProfile}>
          <Text style={{ color: "green", textAlign: "center", fontSize: 16 }}>
            Save Profile
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={{ color: "red", textAlign: "center", fontSize: 16 }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
