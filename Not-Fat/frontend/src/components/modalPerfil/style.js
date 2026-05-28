import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centeredView: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 130,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    alignItems: "center",
    marginBottom: 30,
  },
  modalAlterName: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonSave: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: "40%",
  },
  buttonSaveText: {
    color: "white",
    textAlign: "center",
  },
  buttonCancel: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
    marginRight: 10,
    width: "40%",
    marginRight: 60,
  },
  buttonCancelText: {
    color: colors.primary,
    textAlign: "center",
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  icon: {
    color: colors.primary,
    backgroundColor: "#27ae5f23",
    backgroundOpacity: 0.1,
    fontSize: 50,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
