import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  Platform,
} from "react-native";

import { refeicaoNome } from "../../constantes/refeicao-nome";
import { styles } from "./style";
import { Botao } from "../../components/botao";

export default function Refeicao({ navigation }) {
  function irParaAlimentos(refeicao) {
    navigation.navigate("Alimento", {
      refeicao: refeicao.nome,
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="light" />

          <View>
            <Text style={styles.title}>Refeições</Text>

            <View>
              {refeicaoNome.map((refeicao) => (
                <Botao
                  variant="primary"
                  key={refeicao.nome}
                  onPress={() => irParaAlimentos(refeicao)}
                >
                  {refeicao.nome}
                </Botao>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}