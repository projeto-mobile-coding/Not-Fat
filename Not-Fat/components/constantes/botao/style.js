import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 20,
  },
  buttonPrimary: {
    backgroundColor: colors.cardBackground,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: "transparent",
  },
});