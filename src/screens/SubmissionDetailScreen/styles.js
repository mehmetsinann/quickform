import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#43A6BB",
    height: 74,
  },
  headerTextContainer: {
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    height: 54,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 14,
    color: "white",
    marginLeft: 18,
  },
  userInfo: {
    width: "100%",
    paddingHorizontal: 12,
    borderBottomColor: "#dfdfdf",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  name: {
    fontSize: 17,
    paddingTop: 24,
  },
  email: {
    fontSize: 13,
    paddingTop: 12,
    paddingBottom: 24,
  },
  row: {
    marginHorizontal: 12,
    borderBottomColor: "#dfdfdf",
    borderBottomWidth: 1,
    paddingVertical: 8,
    justifyContent: "center",
  },
  label: {
    color: "gray",
    fontSize: 13,
    marginBottom: 4,
    paddingTop: 16,
  },
  info: {
    fontSize: 16,
    paddingBottom: 18,
    paddingTop: 12,
  },
  backButton: {
    marginTop: 6,
  },
  answer: {
    fontSize: 16,
    color: "#0099FF",
    paddingBottom: 18,
    paddingTop: 12,
  },
});
