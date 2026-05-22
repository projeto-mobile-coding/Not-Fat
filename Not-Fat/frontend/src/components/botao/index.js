import { Text, TouchableOpacity } from "react-native";
import { styles } from "./style";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function Botao({ variant = "primary", onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
      <Text style={styles.buttonText}>{children}</Text>
      <MaterialIcons name="arrow-forward-ios" style={styles.icon} />
    </TouchableOpacity>
  );
}
