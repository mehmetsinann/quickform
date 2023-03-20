import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

import { removeUser, setUser } from "../../redux/slices/userSlice";
import { auth, db, storage } from "../../firebase/firebaseConfig";

import HeaderBar from "../../components/HeaderBar";

import { styles } from "./styles";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  function signOut() {
    // token state silincek
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
            setIsEdit(false);
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

  const deleteModal = () => {
    return (
      <View style={styles.deleteModalContainer}>
        <Text style={styles.deleteModalText}>
          Are you sure to delete profile photo?
        </Text>
        <View style={styles.deleteModalButtonContainer}>
          <TouchableOpacity
            style={[styles.deleteModalButton, { backgroundColor: "green" }]}
            onPress={deletePhoto}
          >
            <Text style={{ color: "white" }}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.deleteModalButton, { backgroundColor: "red" }]}
            onPress={() => setIsDeleteModal(false)}
          >
            <Text style={{ color: "white" }}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      {isDeleteModal ? deleteModal() : <></>}
      {isDeleteModal ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            opacity: 0.9,
            position: "absolute",
            top: 0,
            zIndex: 999,
          }}
        ></View>
      ) : (
        <></>
      )}
      <HeaderBar
        leftButton={headerLeftButton}
        title="Profile"
        headerRightButton={<View></View>}
        backgroundColor="#0A1551"
      />
      <View style={styles.profileContainer}>
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
          ></Image>
          {userInfo?.photoURL ? (
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                zIndex: 2,
                backgroundColor: "black",
                borderRadius: 20,
                padding: 6,
              }}
              onPress={handleRemovePic}
            >
              <Feather name="trash-2" size={24} color="red" />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.changePasswordContainer}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAccountContainer}>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {isEdit && setName.length > 0 && name !== userInfo?.name ? (
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

      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={{ color: "red", textAlign: "center", fontSize: 16 }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
