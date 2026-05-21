import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import { refeicaoNome } from "../../components/constantes/refeicao-nome";
import { styles } from "./style";

export default function Refeicao({ navigation }) {
  const [mealFoods, setMealFoods] = useState(
    Object.fromEntries(refeicaoNome.map(r => [r.nome, []]))
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="light" />
          <Text style={styles.title}>Refeições</Text>
          <View>
            {refeicaoNome.map((refeicao) => (
              <TouchableOpacity
                key={refeicao.nome}
                style={cardStyle.card}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("Adicionar", {
                    mealNome: refeicao.nome,
                    onAdicionar: (novos) => {
                      setMealFoods(prev => ({
                        ...prev,
                        [refeicao.nome]: [...prev[refeicao.nome], ...novos],
                      }));
                    },
                  })
                }
              >
                <Text style={cardStyle.cardText}>{refeicao.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const cardStyle = StyleSheet.create({
  card: {
    backgroundColor: "#F4F6F8",
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2D2D2D",
  },
});