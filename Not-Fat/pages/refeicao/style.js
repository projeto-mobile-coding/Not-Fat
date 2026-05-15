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
    marginTop: 120,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 15,

    marginBottom: 60,
  },
  subTitle: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
