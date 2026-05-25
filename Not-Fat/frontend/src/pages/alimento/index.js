import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";

import { styles } from "./style";

const alimentos = [
  {
    nome: "Pão",
    descricao: "1 unidade",
  },
  {
    nome: "Ovo",
    descricao: "1 unidade",
  },
  {
    nome: "Café",
    descricao: "1 xícara",
  },
  {
    nome: "Frutas",
    descricao: "1 porção",
  },
];

const alimentosDisponiveis = [
  {
    nome: "Pão francês",
    descricao: "150 kcal / unid.",
  },
  {
    nome: "Ovo cozido",
    descricao: "78 kcal / unid.",
  },
  {
    nome: "Café preto",
    descricao: "2 kcal / ml",
  },
  {
    nome: "Aveia",
    descricao: "4 kcal / g",
  },
  {
    nome: "Arroz branco",
    descricao: "130 kcal / 100g",
  },
];

export default function Alimento({ navigation, route }) {
  const refeicao = route.params?.refeicao || "Refeição";

  const [modalVisible, setModalVisible] = useState(false);
  const [alimentosSelecionados, setAlimentosSelecionados] = useState([]);

  function selecionarAlimento(alimento) {
    setAlimentosSelecionados([...alimentosSelecionados, alimento]);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="dark" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>‹</Text>
            </TouchableOpacity>

            <View>
              <Text style={styles.title}>{refeicao}</Text>
              <Text style={styles.subTitle}>Lista de alimentos</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Alimentos</Text>
          </TouchableOpacity>

          <View style={styles.list}>
            {alimentos.map((alimento) => (
              <TouchableOpacity style={styles.card} key={alimento.nome}>
                <View>
                  <Text style={styles.foodName}>{alimento.nome}</Text>
                  <Text style={styles.foodDescription}>
                    {alimento.descricao}
                  </Text>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar alimento</Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar alimento"
              placeholderTextColor="#999"
            />

            <ScrollView style={styles.modalList}>
              {alimentosDisponiveis.map((alimento) => (
                <View style={styles.modalFoodItem} key={alimento.nome}>
                  <View>
                    <Text style={styles.modalFoodName}>{alimento.nome}</Text>
                    <Text style={styles.modalFoodDescription}>
                      {alimento.descricao}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.plusButton}
                    onPress={() => selecionarAlimento(alimento)}
                  >
                    <Text style={styles.plusButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}