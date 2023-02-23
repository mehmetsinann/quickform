import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "13%",
    alignItems: "center",
    zIndex: 998,
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    paddingHorizontal: 8,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 36,
    marginTop: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 40,
    width: "90%",
    position: "relative",
  },
  closeSearch: {
    position: "absolute",
    right: 8,
  },
});
