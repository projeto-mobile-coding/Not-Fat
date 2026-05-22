import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.cardBackground,
    overflow: "visible",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    alignItems: "center",
    paddingLeft: 50,
    color: colors.text,
    fontWeight: "500",
    fontSize: 20,
  },

  icon: {
    size: 20,
    color: colors.textSecondary,
  },
});
