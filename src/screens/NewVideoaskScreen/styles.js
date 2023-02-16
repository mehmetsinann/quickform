import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    backgroundColor: "black", //if camera doesn't load right away
    aspectRatio: 9 / 16, //necessary
  },
  bottomBarContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    justifyContent: "center",
    width: width - 40,
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 30,
    flex: 1,
  },
  recordButtonContainer: {
    flex: 1,
    height: 100,
    justifyContent: "center",
  },
  recordButton: {
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "white",
    height: 80,
    width: 80,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 6,
  },
  galleryButton: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    width: 50,
    height: 50,
  },
  galleryButtonImage: {
    width: 50,
    height: 50,
  },
  topControllersContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "space-between",
    width: width - 40,
    alignItems: "center",
    marginLeft: 20,
    marginTop: 40,
  },
  timer: {
    color: "white",
    fontSize: 25,
  },
});
