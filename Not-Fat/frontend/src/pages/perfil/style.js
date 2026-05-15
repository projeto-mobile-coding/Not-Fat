import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "red",
    color: colors.text,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
