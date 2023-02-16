import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    // marginHorizontal: 20,
    backgroundColor: "white",
    width: "100%",
    height: height / 4,
    elevation: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    alignSelf: "center",
  },
  profilePicContainer: {
    width: 112,
    height: 112,
    backgroundColor: "#091141",
    borderRadius: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    width: 106,
    height: 106,
    borderRadius: 53,
    alignSelf: "center",
  },
  userInfo: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: "row",
  },
  infoContainer: {
    marginLeft: 24,
    width: "80%",
  },
  nameLabel: {
    paddingBottom: 11,
  },
  emailLabel: {
    paddingTop: 11,
  },
  nameContainer: {
    paddingBottom: 11,
    borderBottomColor: "#f3f3f3",
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 16,
    color: "#6F76A7",
  },
  emailContainer: {
    paddingTop: 11,
  },
  email: {
    fontSize: 16,
    color: "#6F76A7",
  },
  editContainer: {
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  changePasswordContainer: {
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
  },
  deleteAccountContainer: {
    paddingTop: 11,
  },
  changePasswordText: {
    fontSize: 16,
  },
  deleteAccountText: {
    fontSize: 16,
  },
  signOut: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
});
