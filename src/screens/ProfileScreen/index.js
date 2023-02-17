import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
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
            <Text style={styles.name}>{userInfo?.name}</Text>
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

      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={{ color: "red", textAlign: "center", fontSize: 16 }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
