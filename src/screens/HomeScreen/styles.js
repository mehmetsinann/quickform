import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: "center",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginVertical: 14,
  },
  newVideoaskButton: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: "#FF4F5A",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 24,
    bottom: 24,
    zIndex: 10,
  },
  newVideoaskButtonText: {
    fontSize: 40,
    color: "white",
  },
  emptyContainer: {
    height: height / 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyHomeImage: {
    height: 200,
    width,
  },
  emptyText1: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#0A1551",
    marginTop: 10,
  },
  emptyText2: {
    color: "#6F76A7",
    fontSize: 15,
    marginTop: 15,
  },
  createButton: {
    padding: 10,
    marginTop: 15,
    backgroundColor: "#FF4F5A",
    borderRadius: 5,
    paddingHorizontal: 80,
  },
  createButtonText: {
    color: "white",
    fontSize: 17,
  },
  formList: {
    width: "100%",
  },
});
