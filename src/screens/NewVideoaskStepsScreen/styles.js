import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252D5B",
  },
  header: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 10,
    right: 0,
    width: 30,
  },
  formTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 40,
    color: "#D9D9D9",
  },
  formTitleTextInput: {
    width: 150,
    fontSize: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    paddingHorizontal: 10,
    color: "#D9D9D9",
    textAlign: "center",
  },
  flatList: {
    padding: 15,
    marginTop: 100,
  },
  addStepButton: {
    width: 120,
    height: 120,
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 6,
  },
  addStepButtonText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  editButton: {
    marginLeft: 20,
  },
});
