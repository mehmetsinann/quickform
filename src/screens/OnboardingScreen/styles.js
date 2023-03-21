import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 36,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "HandleeRegular",
  },
  text: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    width,
    height: height / 2,
    marginTop: 20,
  },
  doneButton: {
    backgroundColor: "#091141",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
  },
  activeDot: {
    backgroundColor: "white",
    width: 40,
  },
});
