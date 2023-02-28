import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  fillFormHeader: {
    width,
    height: height / 6,
    backgroundColor: "black",
    opacity: 0.5,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 998,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 32,
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 32,
    color: "white",
  },
  video: {
    alignSelf: "center",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  close: {
    zIndex: 999,
    alignSelf: "flex-end",
  },
  answerButton: {
    width: width - 80,
    height: 52,
    position: "absolute",
    bottom: height / 18,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    zIndex: 999,
  },
  answerText: {
    fontSize: 28,
    color: "white",
  },
});
