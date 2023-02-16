import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 76,
    alignSelf: "center",
    color: "#0A1551",
  },
  textInputContainer: {
    marginTop: 30,
    height: 400,
  },
  label: {
    marginLeft: 30,
    fontWeight: "bold",
    color: "#0A1551",
  },
  textInput: {
    borderWidth: 2,
    marginHorizontal: 30,
    height: 45,
    paddingLeft: 20,
    marginTop: 10,
    borderColor: "#C8CEED",
    borderRadius: 5,
    marginBottom: 30,
  },
  loginButton: {
    borderRadius: 5,
    backgroundColor: "#78BB07",
    height: 50,
    marginHorizontal: 30,
    justifyContent: "center",
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },
});
