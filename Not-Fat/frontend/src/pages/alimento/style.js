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
    marginTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  backButtonText: {
    fontSize: 36,
    color: colors.primary,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  subTitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },

  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },

  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
  },

  list: {
    gap: 12,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },

  foodDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },

  arrow: {
    fontSize: 26,
    color: colors.textSecondary,
  },

  removeButton: {
    backgroundColor: "#fee2e2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  removeButtonText: {
    color: "#b91c1c",
    fontWeight: "bold",
    fontSize: 12,
  },

  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 20,
    maxHeight: "75%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
  },

  closeButtonText: {
    fontSize: 22,
    color: "#777",
  },

  searchInput: {
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },

  modalList: {
    marginBottom: 15,
  },

  modalFoodItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalFoodName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
  },

  modalFoodDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },

  plusButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  plusButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -2,
  },

  minusButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#eeeeee",
    justifyContent: "center",
    alignItems: "center",
  },

  minusButtonText: {
    color: "#555",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -2,
  },

  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  quantityText: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 14,
  },

  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  cancelText: {
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 15,
  },
});