import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { refeicaoNome } from "../../constantes/refeicao-nome";
import { styles } from "./style";
import { Botao } from "../../components/botao";

export default function Refeicao() {
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
                <Botao variant="primary" key={refeicao.nome}>
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
