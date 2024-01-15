import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  addStepButton: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
  },
  video: {
    width: "100%",
    height: "100%",
    flex: 1,
    borderRadius: 15,
  },
  deleteIcon: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    position: "absolute",
    right: 10,
    top: 10,
  },
});
