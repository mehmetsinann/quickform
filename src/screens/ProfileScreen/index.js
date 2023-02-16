import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../redux/slices/tokenSlice";
import { clearForms } from "../../redux/slices/dashboardSlice";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import HeaderBar from "../../components/HeaderBar";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userToken.token);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (userToken) {
      setUserInfo(jwt_decode(userToken));
    }
  }, []);

  function signOut() {
    // token state silincek
    dispatch(removeToken());
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

  const headerRightButton = () => {
    return <View></View>;
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
              uri: "https://cdn.jotfor.ms/assets/img/v4/avatar/Podo-Avatar2-03.png?ssl=1",
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
