import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

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
    marginTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 15,

    marginBottom: 30,
  },
  subTitle: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
