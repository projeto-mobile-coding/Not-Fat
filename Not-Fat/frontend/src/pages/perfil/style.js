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
    marginTop: 100,
    alignItems: "center",
  },

  profileImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 15,

    marginBottom: 30,
  },
  subTitle: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  text: {
    fontSize: 17,
  },
  listra: {
    width: "100%",
    height: 1,
    backgroundColor: colors.primary,
  },

  cardName: {
    backgroundColor: colors.cardBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    color: colors.primary,
    fontSize: 35,
    height: 35,
    width: 35,
    borderColor: colors.primary,
    borderRadius: 5,
    borderWidth: 1,
  },
  cardEmail: {
    backgroundColor: colors.cardBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
  },
});
