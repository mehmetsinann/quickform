import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#43A6BB",
    height: 74,
    // justifyContent: "center",
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
  headerIcon: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 18,
    height: 18,
  },
  emptyInbox: {
    flex: 1,
    height: height - 240,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyInboxImage: {
    width: 106,
    height: 117,
    alignSelf: "center",
  },
  emptyInboxText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0A1551",
    textAlign: "center",
    marginTop: 16,
  },
  backButton: {
    marginTop: 6,
  },
});
