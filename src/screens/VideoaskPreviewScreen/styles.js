import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    zIndex: 0,
  },
  video: {
    alignSelf: "center",
    flex: 1,
    width,
    height,
  },
  previewText: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    fontSize: 40,
    color: "#C8CEED",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-around",
    width: width - 40,
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 40,
    flex: 1,
  },
  bottomButton: {
    padding: 10,
    backgroundColor: "#04092D",
    borderRadius: 4,
    width: 130,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  blurView: {
    flex: 1,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.3)",
    width,
    height,
    zIndex: 1,
  },

  //AddMultipleChoiceScreen
  container2: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    marginLeft: 10,
  },
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  addMultipleChoiceButtonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  addMultipleChoiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  addMultipleChoiceButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#C8CEED",
  },
  flatList: {
    marginTop: 110,
    padding: 10,
  },
  doneButton: {
    marginRight: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
  },
  doneText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  textInputContainer: {
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "darkblue",
    borderRadius: 35,
    height: 70,
    width: 300,
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  choiceTextInput: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    width: "60%",
  },
  choiceIndex: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    marginLeft: 20,
  },
  trashIcon: {
    marginRight: 20,
  },
});
