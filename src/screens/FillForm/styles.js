import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
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
    bottom: height / 36,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    zIndex: 10000,
  },
  answerText: {
    fontSize: 28,
    color: "white",
  },
  videoUploadingText: {
    color: "white",
    fontSize: 18,
    width: "40%",
    marginTop: 16,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    zIndex: 0,
  },
  userInfoContainer: {
    width: width,
    marginBottom: (height / 18) * 2,
    marginTop: height / 36,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  userInfoLabel: {
    fontSize: 18,
    color: "#0A1551",
    fontWeight: "500",
  },
  userInfoInput: {
    borderWidth: 2,
    borderColor: "#C8CEED",
    borderRadius: 4,
    width: "100%",
    height: 36,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
});
