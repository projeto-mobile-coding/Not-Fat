import { Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

export function Botao({ variant = "primary", onPress, children }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary,
      ]}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}
