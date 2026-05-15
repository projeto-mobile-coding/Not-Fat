import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const AVATAR_SIZE = width * 0.60;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  helpText: {
    fontSize: 16,
    color: "#34A853",
    fontWeight: "500",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#dadce0",
    borderRadius: 12,
    backgroundColor: "#fff",
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#3c4043",
    fontWeight: "500",
  },
  remindRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
    alignSelf: "flex-start",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#34A853",
  },
  checkboxUnchecked: {
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "transparent",
  },
  remindText: {
    fontSize: 15,
    color: "#444",
  },
});