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
import { refeicaoNome } from "../../constantes//refeicao-nome";
import { styles } from "./style";

export default function Refeicao() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <View>
            <Text> Área inicial</Text>
            <Text>Local das refeições</Text>
            <View>
              <Text>Início</Text>
            </View>
            <View>
              <Text>Refeições</Text>
              <View /* Ficará o espaço para as refeições */>
                {/* {refeicaoNome.map(refeicao) => ()} */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
