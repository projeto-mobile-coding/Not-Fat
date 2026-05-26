import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const getApiBaseUrl = () => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;

  if (envUrl) {
    return envUrl;
  }

  return Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://localhost:3000";
};

const subTitulos = {
  "Café da manhã": "Lista do café da manhã",
  Desjejum: "Lista de itens do desjejum",
  Almoço: "Lista do almoço",
  "lanche da tarde": "Lista do lanche da tarde",
  Jantar: "Lista do jantar",
  Ceia: "Lista da ceia",
};

export default function Alimento({ navigation, route }) {
  const refeicao = route.params?.refeicao || "Café da manhã";
  const subTitle = subTitulos[refeicao] || "Lista de alimentos";

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [alimentosSelecionados, setAlimentosSelecionados] = useState([]);
  const [pendentes, setPendentes] = useState({});
  const [alimentosDisponiveis, setAlimentosDisponiveis] = useState([]);
  const [carregandoAlimentos, setCarregandoAlimentos] = useState(true);
  const [erroAlimentos, setErroAlimentos] = useState("");
  const [selecoesCarregadas, setSelecoesCarregadas] = useState(false);
  const selecaoFoiEditadaRef = useRef(false);
  const carregandoSelecoesRef = useRef(false);

  const storageKey = `selected-foods-${refeicao}`;

  useEffect(() => {
    setPendentes({});
    setSearch("");
    setSelecoesCarregadas(false);
    selecaoFoiEditadaRef.current = false;
    carregandoSelecoesRef.current = true;

    let cancelado = false;

    async function carregarSelecionados() {
      try {
        const salvo = await AsyncStorage.getItem(storageKey);

        if (cancelado) {
          return;
        }

        if (!selecaoFoiEditadaRef.current && salvo) {
          const selecionadosSalvos = JSON.parse(salvo);

          if (Array.isArray(selecionadosSalvos)) {
            setAlimentosSelecionados(selecionadosSalvos);
            setSelecoesCarregadas(true);
            carregandoSelecoesRef.current = false;
            return;
          }
        }

        if (!selecaoFoiEditadaRef.current) {
          setAlimentosSelecionados([]);
        }

        setSelecoesCarregadas(true);
        carregandoSelecoesRef.current = false;
      } catch (erro) {
        if (!cancelado) {
          setSelecoesCarregadas(true);
          carregandoSelecoesRef.current = false;
        }
      }
    }

    carregarSelecionados();

    return () => {
      cancelado = true;
    };
  }, [refeicao, storageKey]);

  useEffect(() => {
    let estaMontado = true;

    async function carregarAlimentos() {
      setCarregandoAlimentos(true);
      setErroAlimentos("");

      try {
        const resposta = await fetch(`${getApiBaseUrl()}/alimentos`);

        if (!resposta.ok) {
          throw new Error("Não foi possível buscar os alimentos.");
        }

        const dados = await resposta.json();

        if (!estaMontado) {
          return;
        }

        setAlimentosDisponiveis(
          dados.map((alimento) => ({
            id: alimento.id,
            nome: alimento.nome,
            descricao: alimento.descricao || "1 porção / 100g",
          })),
        );
      } catch (erro) {
        if (!estaMontado) {
          return;
        }

        setErroAlimentos("Não foi possível carregar os alimentos do backend.");
      } finally {
        if (estaMontado) {
          setCarregandoAlimentos(false);
        }
      }
    }

    carregarAlimentos();

    return () => {
      estaMontado = false;
    };
  }, []);

  useEffect(() => {
    if (!selecoesCarregadas || carregandoSelecoesRef.current) {
      return;
    }

    AsyncStorage.setItem(
      storageKey,
      JSON.stringify(alimentosSelecionados),
    ).catch(() => {});
  }, [alimentosSelecionados, selecoesCarregadas, storageKey]);

  function incrementarQuantidade(alimento) {
    setPendentes((prev) => ({
      ...prev,
      [alimento.nome]: (prev[alimento.nome] || 0) + 1,
    }));
  }

  function diminuirQuantidade(alimento) {
    setPendentes((prev) => {
      const quantidadeAtual = prev[alimento.nome] || 0;

      if (quantidadeAtual <= 1) {
        const novoPendentes = { ...prev };
        delete novoPendentes[alimento.nome];
        return novoPendentes;
      }

      return {
        ...prev,
        [alimento.nome]: quantidadeAtual - 1,
      };
    });
  }

  function removerAlimento(alimento) {
    selecaoFoiEditadaRef.current = true;
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
    selecaoFoiEditadaRef.current = true;
    setAlimentosSelecionados((prev) => {
      const selecionados = [...prev];

      Object.entries(pendentes).forEach(([nome, quantidade]) => {
        const alimento = alimentosDisponiveis.find(
          (item) => item.nome === nome,
        );
        const quantidadeNumerica = Number(quantidade);

        if (!alimento || quantidadeNumerica <= 0) {
          return;
        }

        const existente = selecionados.find((item) => item.nome === nome);

        if (existente) {
          existente.quantidade += quantidadeNumerica;
          return;
        }

        selecionados.push({
          ...alimento,
          quantidade: quantidadeNumerica,
        });
      });

      return selecionados;
    });

    fecharModal();
  }

  const alimentosFiltrados = alimentosDisponiveis.filter((alimento) =>
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
              <Text style={styles.subTitle}>{subTitle}</Text>
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
              {carregandoAlimentos && (
                <Text style={styles.emptyText}>Carregando alimentos...</Text>
              )}

              {!carregandoAlimentos && erroAlimentos && (
                <Text style={styles.emptyText}>{erroAlimentos}</Text>
              )}

              {!carregandoAlimentos &&
                !erroAlimentos &&
                alimentosFiltrados.map((alimento) => (
                  <View
                    style={styles.modalFoodItem}
                    key={alimento.id ?? alimento.nome}
                  >
                    <View>
                      <Text style={styles.modalFoodName}>{alimento.nome}</Text>
                      <Text style={styles.modalFoodDescription}>
                        {alimento.descricao}
                      </Text>
                    </View>

                    <View style={styles.quantitySelector}>
                      <TouchableOpacity
                        style={styles.minusButton}
                        onPress={() => diminuirQuantidade(alimento)}
                      >
                        <Text style={styles.minusButtonText}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>
                        x{pendentes[alimento.nome] || 0}
                      </Text>

                      <TouchableOpacity
                        style={styles.plusButton}
                        onPress={() => incrementarQuantidade(alimento)}
                      >
                        <Text style={styles.plusButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

              {!carregandoAlimentos &&
                !erroAlimentos &&
                alimentosFiltrados.length === 0 && (
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
