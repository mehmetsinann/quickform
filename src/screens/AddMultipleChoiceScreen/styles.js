import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
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
    marginTop: 30,
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
  },
  flatList: {
    marginTop: 50,
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
