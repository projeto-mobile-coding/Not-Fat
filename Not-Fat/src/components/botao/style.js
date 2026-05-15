import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  button: {
    overflow: "visible",
    // backgroundColor: colors.inputBackground,
    // paddingHorizontal: 40,
    paddingVertical: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 18,
  },
  buttonPrimary: {
    backgroundColor: colors.cardBackground,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
