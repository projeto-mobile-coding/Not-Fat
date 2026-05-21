import { Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

export function Botao({ variant = "primary", onPress, children, accessible, accessibilityLabel, accessibilityHint, accessibilityRole }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      style={[
        styles.button,
        variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary,
      ]}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}