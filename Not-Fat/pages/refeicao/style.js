import { StyleSheet } from "react-native";
import { colors } from "../../src/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 20,
  },
  subTitle: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
