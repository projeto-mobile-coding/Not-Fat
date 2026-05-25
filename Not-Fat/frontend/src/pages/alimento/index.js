import React, { useEffect, useState } from "react";
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

const versoes = {
  "Café da manhã": {
    subTitle: "Lista do café da manhã",
    alimentos: [
      { nome: "Pão", descricao: "1 unidade" },
      { nome: "Ovo", descricao: "1 unidade" },
      { nome: "Café", descricao: "1 xícara" },
      { nome: "Frutas", descricao: "1 porção" },
    ],
    alimentosDisponiveis: [
      { nome: "Pão francês", descricao: "150 kcal / unid." },
      { nome: "Ovo cozido", descricao: "78 kcal / unid." },
      { nome: "Café preto", descricao: "2 kcal / ml" },
      { nome: "Aveia", descricao: "4 kcal / g" },
      { nome: "Arroz branco", descricao: "130 kcal / 100g" },
    ],
  },
  Desjejum: {
    subTitle: "Lista de itens do desjejum",
    alimentos: [
      { nome: "Iogurte", descricao: "1 pote" },
      { nome: "Granola", descricao: "2 colheres" },
      { nome: "Banana", descricao: "1 unidade" },
    ],
    alimentosDisponiveis: [
      { nome: "Iogurte natural", descricao: "90 kcal / pote" },
      { nome: "Granola integral", descricao: "120 kcal / colher" },
      { nome: "Banana prata", descricao: "89 kcal / unid." },
      { nome: "Muesli", descricao: "110 kcal / porção" },
    ],
  },
  Almoço: {
    subTitle: "Lista do almoço",
    alimentos: [
      { nome: "Arroz", descricao: "1 concha" },
      { nome: "Feijão", descricao: "1 concha" },
      { nome: "Carne", descricao: "1 porção" },
      { nome: "Salada", descricao: "1 prato" },
    ],
    alimentosDisponiveis: [
      { nome: "Arroz branco", descricao: "130 kcal / 100g" },
      { nome: "Feijão carioca", descricao: "70 kcal / 100g" },
      { nome: "Frango grelhado", descricao: "165 kcal / 100g" },
      { nome: "Salada verde", descricao: "20 kcal / prato" },
    ],
  },
  "lanche da tarde": {
    subTitle: "Lista do lanche da tarde",
    alimentos: [
      { nome: "Biscoito", descricao: "3 unidades" },
      { nome: "Suco", descricao: "1 copo" },
      { nome: "Queijo", descricao: "1 fatia" },
    ],
    alimentosDisponiveis: [
      { nome: "Biscoito cream cracker", descricao: "45 kcal / unid." },
      { nome: "Suco de laranja", descricao: "60 kcal / copo" },
      { nome: "Queijo minas", descricao: "100 kcal / fatia" },
      { nome: "Castanha", descricao: "50 kcal / porção" },
    ],
  },
  Jantar: {
    subTitle: "Lista do jantar",
    alimentos: [
      { nome: "Macarrão", descricao: "1 porção" },
      { nome: "Tomate", descricao: "1 unidade" },
      { nome: "Peixe", descricao: "1 porção" },
    ],
    alimentosDisponiveis: [
      { nome: "Macarrão integral", descricao: "160 kcal / porção" },
      { nome: "Tomate cereja", descricao: "5 kcal / unid." },
      { nome: "Peixe assado", descricao: "140 kcal / porção" },
      { nome: "Brócolis", descricao: "30 kcal / porção" },
    ],
  },
  Ceia: {
    subTitle: "Lista da ceia",
    alimentos: [
      { nome: "Chá", descricao: "1 xícara" },
      { nome: "Pão integral", descricao: "1 fatia" },
      { nome: "Frutas", descricao: "1 porção" },
    ],
    alimentosDisponiveis: [
      { nome: "Chá verde", descricao: "2 kcal / xícara" },
      { nome: "Pão integral", descricao: "80 kcal / fatia" },
      { nome: "Maçã", descricao: "95 kcal / unid." },
      { nome: "Mel", descricao: "60 kcal / colher" },
    ],
  },
};

export default function Alimento({ navigation, route }) {
  const refeicao = route.params?.refeicao || "Café da manhã";
  const conteudo = versoes[refeicao] || versoes["Café da manhã"];

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [alimentosSelecionados, setAlimentosSelecionados] = useState(
    (versoes[refeicao]?.alimentos || versoes["Café da manhã"].alimentos).map(
      (alimento) => ({ ...alimento, quantidade: 1 }),
    ),
  );
  const [pendentes, setPendentes] = useState({});

  useEffect(() => {
    setAlimentosSelecionados(
      (versoes[refeicao]?.alimentos || versoes["Café da manhã"].alimentos).map(
        (alimento) => ({ ...alimento, quantidade: 1 }),
      ),
    );
    setPendentes({});
    setSearch("");
  }, [refeicao]);

  function incrementarQuantidade(alimento) {
    setPendentes((prev) => ({
      ...prev,
      [alimento.nome]: (prev[alimento.nome] || 0) + 1,
    }));
  }

  function removerAlimento(alimento) {
    setAlimentosSelecionados((prev) =>
      prev.filter((item) => item.nome !== alimento.nome),
    );
  }

  function fecharModal() {
    setModalVisible(false);
    setSearch("");
    setPendentes({});
  }

  function confirmarAdicao() {
    setAlimentosSelecionados((prev) => {
      const selecionados = [...prev];

      Object.entries(pendentes).forEach(([nome, quantidade]) => {
        const alimento = conteudo.alimentosDisponiveis.find(
          (item) => item.nome === nome,
        );

        if (!alimento) {
          return;
        }

        const existente = selecionados.find((item) => item.nome === nome);

        if (existente) {
          existente.quantidade += quantidade;
          return;
        }

        selecionados.push({
          ...alimento,
          quantidade,
        });
      });

      return selecionados;
    });

    fecharModal();
  }

  const alimentosFiltrados = conteudo.alimentosDisponiveis.filter((alimento) =>
    alimento.nome.toLowerCase().includes(search.toLowerCase()),
  );

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
              <Text style={styles.subTitle}>{conteudo.subTitle}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Alimentos</Text>
          </TouchableOpacity>

          <View style={styles.list}>
            {alimentosSelecionados.map((alimento) => (
              <View style={styles.card} key={alimento.nome}>
                <View>
                  <Text style={styles.foodName}>{alimento.nome}</Text>
                  <Text style={styles.foodDescription}>
                    {alimento.descricao} · {alimento.quantidade}x
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removerAlimento(alimento)}
                >
                  <Text style={styles.removeButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            ))}

            {alimentosSelecionados.length === 0 && (
              <Text style={styles.emptyText}>
                Nenhum alimento selecionado ainda.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => fecharModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar alimento</Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={fecharModal}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar alimento"
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />

            <ScrollView style={styles.modalList}>
              {alimentosFiltrados.map((alimento) => (
                <View style={styles.modalFoodItem} key={alimento.nome}>
                  <View>
                    <Text style={styles.modalFoodName}>{alimento.nome}</Text>
                    <Text style={styles.modalFoodDescription}>
                      {alimento.descricao}
                    </Text>
                  </View>

                  <View style={styles.quantitySelector}>
                    <TouchableOpacity
                      style={styles.plusButton}
                      onPress={() => incrementarQuantidade(alimento)}
                    >
                      <Text style={styles.plusButtonText}>+</Text>
                    </TouchableOpacity>

                    {pendentes[alimento.nome] ? (
                      <Text style={styles.quantityText}>
                        x{pendentes[alimento.nome]}
                      </Text>
                    ) : null}
                  </View>
                </View>
              ))}

              {alimentosFiltrados.length === 0 && (
                <Text style={styles.emptyText}>
                  Nenhum alimento encontrado.
                </Text>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmarAdicao}
            >
              <Text style={styles.confirmButtonText}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={fecharModal}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
