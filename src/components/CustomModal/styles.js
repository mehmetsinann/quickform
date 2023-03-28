import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
  },
  modalContainer: {
    width: width - 60,
    top: height / 2.5,
    alignSelf: "center",
    backgroundColor: "white",
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  modalText: {
    fontSize: 24,
    textAlign: "center",
    paddingVertical: 12,
    color: "black",
  },
  modalSubText: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  modalButtonContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 4,
    width: width - 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
});
