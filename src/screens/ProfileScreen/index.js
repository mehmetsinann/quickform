import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { removeUser, setUser } from "../../redux/slices/userSlice";
import { auth, db, storage } from "../../firebase/firebaseConfig";

import HeaderBar from "../../components/HeaderBar";

import { styles } from "./styles";
import { CustomModal as DeleteModal } from "../../components/CustomModal";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [newPassword, setNewPassword] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  function signOut() {
    dispatch(removeUser());
    navigation.reset({
      index: 0,
      routes: [{ name: "OnboardingScreen" }],
    });
  }

  const saveProfile = async () => {
    setIsLoading(true);
    const user = auth.currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        db.collection("users")
          .doc(`${userInfo.uid}`)
          .set({
            ...userInfo,
            name,
          })
          .then(() => {
            dispatch(
              setUser({
                ...userInfo,
                name,
              })
            );
            setIsEdit("");
            console.log("user name changed successfully to ", name);
            setIsLoading(false);
          });
      });
  };

  const headerLeftButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();

      // Fotoğrafı Firebase Storage'a yükleyin ve fotoğrafın URL'sini alın
      const snapshot = await storage
        .ref()
        .child("users/" + userInfo.uid + "/profilePhoto")
        .put(blob);
      const photoURL = await snapshot.ref.getDownloadURL();

      // Kullanıcının profil fotoğrafını güncelleyin
      await auth.currentUser
        .updateProfile({
          photoURL: photoURL,
        })
        .then(() => {
          db.collection("users")
            .doc(`${userInfo.uid}`)
            .set({
              ...userInfo,
              photoURL: photoURL,
            })
            .then(() => {
              dispatch(setUser({ ...userInfo, photoURL: photoURL }));
            });
        });
    }
  };

  const handleRemovePic = () => {
    setIsDeleteModal(true);
  };

  const deletePhoto = async () => {
    await storage
      .ref()
      .child("users/" + userInfo.uid + "/profilePhoto")
      .delete();
    await auth.currentUser.updateProfile({ photoURL: null }).then(() => {
      db.collection("users")
        .doc(`${userInfo.uid}`)
        .set({
          ...userInfo,
          photoURL: null,
        })
        .then(() => {
          dispatch(setUser({ ...userInfo, photoURL: null }));
        })
        .then(() => {
          setIsDeleteModal(false);
        });
    });
  };

  const updatePassword = () => {
    const user = auth.currentUser;
    user
      .updatePassword(newPassword)
      .then(() => {
        setNewPassword("");
        setShowNewPassword(false);
        setIsEdit("");
        signOut();
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={[styles.container]}>
      <HeaderBar
        leftButton={headerLeftButton}
        title="Profile"
        headerRightButton={<View></View>}
        backgroundColor="#0A1551"
      />
      <View style={styles.profileContainer}>
        <TouchableOpacity
          style={{ position: "absolute", top: 12, left: 12 }}
          onPress={pickImage}
        >
          <MaterialIcons name="system-update-tv" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profilePicContainer}
          onPress={pickImage}
        >
          <Image
            style={styles.profilePic}
            source={{
              uri: userInfo?.photoURL
                ? userInfo?.photoURL
                : "https://cdn.jotfor.ms/assets/img/v4/avatar/Podo-Avatar2-03.png?ssl=1",
            }}
          />
        </TouchableOpacity>
        {userInfo?.photoURL ? (
          <TouchableOpacity
            style={{ position: "absolute", top: 12, right: 12 }}
            onPress={handleRemovePic}
          >
            <Feather name="trash-2" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <></>
        )}
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
                setIsEdit("username");
              }}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.editContainer}>
        <TouchableOpacity
          style={styles.changePasswordContainer}
          onPress={() => {
            setIsEdit("password");
          }}
        >
          {isEdit !== "password" ? (
            <Text style={styles.changePasswordText}>Change Password</Text>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ width: "85%" }}
                onChangeText={setNewPassword}
                value={newPassword}
                secureTextEntry={!showNewPassword}
                placeholder="New Password"
              />
              <TouchableOpacity
                onPress={() => {
                  setShowNewPassword(!showNewPassword);
                }}
                style={{ paddingRight: 10 }}
              >
                <Feather
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsEdit("");
                  setNewPassword("");
                }}
              >
                <Ionicons name="close-circle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {isEdit === "username" &&
      setName.length > 0 &&
      name !== userInfo?.name ? (
        <TouchableOpacity style={styles.signOut} onPress={saveProfile}>
          {!isLoading ? (
            <Text style={{ color: "green", textAlign: "center", fontSize: 16 }}>
              Save Profile
            </Text>
          ) : (
            <ActivityIndicator />
          )}
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {isEdit === "password" && newPassword.length > 5 ? (
        <TouchableOpacity style={styles.signOut} onPress={updatePassword}>
          {!isLoading ? (
            <Text style={{ color: "green", textAlign: "center", fontSize: 16 }}>
              Save Password
            </Text>
          ) : (
            <ActivityIndicator />
          )}
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={{ color: "red", textAlign: "center", fontSize: 16 }}>
          Sign Out
        </Text>
      </TouchableOpacity>

      {isDeleteModal && (
        <DeleteModal
          modalText={"Delete Profile Photo"}
          modalSubText={"This operation cannot be undone."}
          buttonOptions={["Delete", "Cancel"]}
          onConfirmFunc={deletePhoto}
          isVisible={isDeleteModal}
          setIsVisible={setIsDeleteModal}
        />
      )}
    </View>
  );
}
