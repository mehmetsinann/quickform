import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252D5B",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  itemContainer: {
    width: "80%",
    height: "25%",
    borderRadius: 16,
  },
  back: {
    position: "absolute",
    left: 12,
    top: 56,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: 0.75,
    position: "absolute",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "600",
    color: "black",
  },
});
