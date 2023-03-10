import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

const width = Dimensions.get("window").width;

export default function NewVideoaskScreen({ navigation, route }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [isCancelled, setIsCancelled] = useState(true);

  useEffect(() => {
    const advanceTime = () => {
      setTimeout(() => {
        let nSeconds = time.seconds;
        let nMinutes = time.minutes;
        let nHours = time.hours;

        nSeconds++;

        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        if (nMinutes > 59) {
          nHours++;
          nMinutes = 0;
        }
        if (nHours > 24) {
          nHours = 0;
        }

        !isCancelled &&
          setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };
    advanceTime();
  }, [time, isCancelled, isCameraReady]);

  useEffect(() => {
    setTime({ seconds: 0, minutes: 0, hours: 0 });
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status == "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermission(audioStatus.status == "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status == "granted");

      if (galleryStatus.status == "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      navigation.navigate("VideoaskPreviewScreen", {
        source: result?.uri,
        cameFrom: "NewVideoaskScreen",
        formID: route.params.formID,
      });
    }
  };
  const recordVideo = async () => {
    setIsRecording(true);
    if (cameraRef) {
      console.log(cameraRef);
      try {
        const options = {
          quality: Camera.Constants.VideoQuality["480"],
          maxDuration: 10,
        };
        const videoRecordPromise = cameraRef.recordAsync(options);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;

          navigation.navigate("VideoaskPreviewScreen", {
            source: source,
            cameFrom:
              route.params.cameFrom === "form" ? "form" : "NewVideoaskScreen",
            formID: route.params.formID,
            setShouldPlay: route.params.setShouldPlay,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const stopVideo = async () => {
    setIsCancelled(true);
    if (cameraRef) {
      cameraRef.stopRecording();
      setIsRecording(false);
      console.log("video stopped");
    }
    setTime({ seconds: 0, minutes: 0, hours: 0 });
  };

  if (!hasCameraPermission || !hasAudioPermission || !hasGalleryPermission) {
    return (
      <View>
        <Text>No Permissions</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          ref={(ref) => setCameraRef(ref)}
          ratio="16:9"
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        />
        <View style={styles.topControllersContainer}>
          <TouchableOpacity
            onPress={() =>
              setCameraFlash(
                cameraFlash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              )
            }
          >
            <Ionicons
              name={
                cameraFlash === Camera.Constants.FlashMode.off
                  ? "flash-off"
                  : "flash"
              }
              size={25}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.timer}>{`${
            time.hours < 10 ? "0" + time.hours : time.hours
          } : ${time.minutes < 10 ? "0" + time.minutes : time.minutes} : ${
            time.seconds < 10 ? "0" + time.seconds : time.seconds
          }`}</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
              })
            }
          >
            <Ionicons name="close" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomBarContainer}>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={pickFromGallery}
          >
            {galleryItems[0] == undefined ? (
              <></>
            ) : (
              <Image
                style={styles.galleryButtonImage}
                source={{ uri: galleryItems[0].uri }}
              />
            )}
          </TouchableOpacity>

          <View style={styles.recordButtonContainer}>
            <TouchableOpacity
              disabled={!isCameraReady}
              onLongPress={() => {
                recordVideo();
                setIsCancelled(false);
              }}
              onPressOut={stopVideo}
              style={[
                styles.recordButton,
                {
                  backgroundColor: isRecording ? "red" : "transparent",
                  borderColor: isRecording ? "red" : "white",
                  width: isRecording ? 100 : 80,
                  height: isRecording ? 100 : 80,
                },
              ]}
            />
          </View>
          <TouchableOpacity
            style={styles.sideBarButton}
            onPress={() =>
              setCameraType(
                cameraType === Camera.Constants.Type.front
                  ? Camera.Constants.Type.back
                  : Camera.Constants.Type.front
              )
            }
          >
            <MaterialIcons name="flip-camera-android" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
