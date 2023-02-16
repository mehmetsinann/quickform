import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
  dateContainer: {
    marginHorizontal: 16,
    paddingTop: 16,
    borderBottomColor: "#f3f3fe",
    borderBottomWidth: 1,
    paddingBottom: 18,
  },
  choiceContainer: {
    paddingVertical: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3FE",
  },
  choiceIndex: {
    fontSize: 14,
    color: "#6F76A7",
  },
  choiceText: {
    fontSize: 18,
    color: "#0099FF",
    marginTop: 12,
  },
  userContainer: {
    width: "100%",
    paddingBottom: 24,
    borderBottomColor: "#F3F3FE",
    borderBottomWidth: 1,
    marginTop: 16,
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  name: {
    fontSize: 18,
    marginBottom: 12,
  },
  email: {
    fontSize: 16,
  },
  answerList: {
    // marginTop: 30,
  },
  submit: {
    borderRadius: 5,
    backgroundColor: "#FF6100",
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 15,
    width: width * 0.5,
  },
  submitText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    paddingBottom: 20,
    borderBottomColor: "#F3F3FE",
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 16,
  },
  emailInput: {
    borderWidth: 2,
    marginHorizontal: 16,
    height: 38,
    paddingLeft: 20,
    borderColor: "#C8CEED",
    borderRadius: 5,
    marginTop: 10,
  },
  nameInput: {
    borderWidth: 2,
    marginHorizontal: 16,
    height: 38,
    paddingLeft: 20,
    borderColor: "#C8CEED",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
  },
});
