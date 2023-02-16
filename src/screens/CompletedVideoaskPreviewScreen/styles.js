import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    alignSelf: "center",
    flex: 1,
    width,
    height,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "gray",
    backgroundColor: "gray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  choiceContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    height: 50,
    width: width - 40,
    alignSelf: "center",
    marginBottom: 10,

    alignItems: "center",
  },
  choiceIndex: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
  },
  choiceText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  doneButton: {
    marginRight: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    top: 30,
    right: 5,
  },
  doneText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  choiceList: {
    alignSelf: "center",
    width: width - 40,
    position: "absolute",
    bottom: 20,
  },
});
