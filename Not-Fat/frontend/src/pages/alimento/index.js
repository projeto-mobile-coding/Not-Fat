import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./style";

const API_BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

const refeicaoIds = {
  Desjejum: 1,
  "Café da manhã": 2,
  Almoço: 3,
  "lanche da tarde": 4,
  Jantar: 5,
  Ceia: 6,
};

// Funções de persistência local
async function salvarAlimentosLocalmente(idUsuario, idRefeicao, alimentos) {
  try {
    const chave = `alimentos_${idUsuario}_${idRefeicao}`;
    await AsyncStorage.setItem(chave, JSON.stringify(alimentos));
  } catch (err) {
    console.error("Erro ao salvar alimentos localmente:", err);
  }
}

async function carregarAlimentosLocalmente(idUsuario, idRefeicao) {
  try {
    const chave = `alimentos_${idUsuario}_${idRefeicao}`;
    const dados = await AsyncStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
  } catch (err) {
    console.error("Erro ao carregar alimentos localmente:", err);
    return [];
  }
}

async function salvarAlimentosDisponiveisLocalmente(alimentos) {
  try {
    await AsyncStorage.setItem("alimentos_disponiveis", JSON.stringify(alimentos));
  } catch (err) {
    console.error("Erro ao salvar alimentos disponíveis:", err);
  }
}

async function carregarAlimentosDisponiveisLocalmente() {
  try {
    const dados = await AsyncStorage.getItem("alimentos_disponiveis");
    return dados ? JSON.parse(dados) : [];
  } catch (err) {
    console.error("Erro ao carregar alimentos disponíveis:", err);
    return [];
  }
}

async function parseJsonResponse(response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Resposta inválida do servidor: ${text}`);
  }
}

export default function Alimento({ navigation, route, user }) {
  const refeicao = route.params?.refeicao || "Café da manhã";
  const idRefeicao = route.params?.idRefeicao ?? refeicaoIds[refeicao] ?? 1;

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [alimentosDisponiveis, setAlimentosDisponiveis] = useState([]);
  const [salvos, setSalvos] = useState([]);
  const [pendentes, setPendentes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearch("");
    setPendentes({});
    if (user?.idUsuario) {
      carregarDados();
    }
  }, [user, idRefeicao, refeicao]);

  async function carregarDados() {
    // Carregar dados locais primeiro (mais rápido)
    const alimentosLocais = await carregarAlimentosLocalmente(user.idUsuario, idRefeicao);
    const alimentosDisponiveisLocais = await carregarAlimentosDisponiveisLocalmente();

    if (alimentosDisponiveisLocais.length > 0) {
      setAlimentosDisponiveis(alimentosDisponiveisLocais);
    }

    if (alimentosLocais.length > 0) {
      setSalvos(alimentosLocais);
    }

    // Sincronizar com servidor em background
    try {
      await carregarAlimentosDisponiveis();
      await carregarAlimentosSalvos();
    } catch (err) {
      console.error("Erro ao sincronizar com servidor:", err);
    }
  }

  async function carregarAlimentosDisponiveis() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/alimentos`);
      const data = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.erro || "Não foi possível carregar os alimentos.");
      }

      const lista = data.map((item) => ({
        id: item.id,
        nome: item.nome,
        descricao: item.descricao || "",
      }));

      setAlimentosDisponiveis(lista);
      // Salvar no AsyncStorage para uso offline
      await salvarAlimentosDisponiveisLocalmente(lista);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os alimentos do servidor.");
      setAlimentosDisponiveis([]);
    } finally {
      setLoading(false);
    }
  }

  async function carregarAlimentosSalvos() {
    if (!user?.idUsuario) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/refeicao/${user.idUsuario}/${idRefeicao}`);
      const data = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.erro || "Não foi possível buscar os alimentos salvos.");
      }

      const listaSalvos = data.map((item) => ({
        id: item.id_alimento,
        nome: item.nome_alimento,
        descricao: item.descricao || "",
        quantidade: Number(item.quantidade) || 1,
      }));

      setSalvos(listaSalvos);
      // Salvar no AsyncStorage para uso offline
      await salvarAlimentosLocalmente(user.idUsuario, idRefeicao, listaSalvos);
    } catch (err) {
      console.error(err);
      setError("Não foi possível buscar os alimentos salvos.");
      setSalvos([]);
    } finally {
      setLoading(false);
    }
  }

  async function removerAlimentoSalvo(idAlimento) {
    if (!user?.idUsuario) {
      setError("Usuário não identificado.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/refeicao/${user.idUsuario}/${idRefeicao}/${idAlimento}`,
        { method: "DELETE" },
      );

      const data = await parseJsonResponse(response);
      if (!response.ok) {
        throw new Error(data.erro || "Não foi possível remover o alimento.");
      }

      // Remover do estado local também
      const alimentosAtualizados = salvos.filter((item) => item.id !== idAlimento);
      setSalvos(alimentosAtualizados);

      // Atualizar no AsyncStorage
      await salvarAlimentosLocalmente(user.idUsuario, idRefeicao, alimentosAtualizados);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao remover alimento.");
      // Sincronizar novamente em caso de erro
      await carregarAlimentosSalvos();
    } finally {
      setLoading(false);
    }
  }

  function incrementarQuantidade(alimento) {
    setPendentes((prev) => ({
      ...prev,
      [alimento.id]: (prev[alimento.id] || 0) + 1,
    }));
  }

  function diminuirQuantidade(alimento) {
    setPendentes((prev) => {
      const quantidadeAtual = prev[alimento.id] || 0;

      if (quantidadeAtual <= 1) {
        const novoPendentes = { ...prev };
        delete novoPendentes[alimento.id];
        return novoPendentes;
      }

      return {
        ...prev,
        [alimento.id]: quantidadeAtual - 1,
      };
    });
  }

  function fecharModal() {
    setModalVisible(false);
    setSearch("");
    setPendentes({});
  }

  async function confirmarAdicao() {
    if (!user?.idUsuario) {
      setError("Usuário não identificado.");
      return;
    }

    const itens = Object.entries(pendentes)
      .map(([id, quantidade]) => ({
        idAlimento: Number(id),
        quantidade: Number(quantidade),
      }))
      .filter((item) => item.idAlimento > 0 && item.quantidade > 0);

    if (itens.length === 0) {
      fecharModal();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const requests = itens.map((item) =>
        fetch(`${API_BASE_URL}/adicionar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idUsuario: user.idUsuario,
            idRefeicao,
            idAlimento: item.idAlimento,
            quantidade: item.quantidade,
          }),
        }),
      );

      const responses = await Promise.all(requests);
      for (const response of responses) {
        if (!response.ok) {
          const data = await parseJsonResponse(response);
          throw new Error(data.erro || "Erro ao salvar alimentos.");
        }
      }

      await carregarAlimentosSalvos();
      fecharModal();
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao salvar alimentos.");
    } finally {
      setLoading(false);
    }
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
              <Text style={styles.subTitle}>Alimentos cadastrados no banco</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Alimentos</Text>
          </TouchableOpacity>

          <View style={styles.list}>
            {salvos.map((alimento) => (
              <View style={styles.card} key={`${alimento.id}-${alimento.nome}`}>
                <View>
                  <Text style={styles.foodName}>{alimento.nome}</Text>
                  <Text style={styles.foodDescription}>
                    {alimento.descricao} · {alimento.quantidade}x
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removerAlimentoSalvo(alimento.id)}
                >
                  <Text style={styles.removeButtonText}>Apagar</Text>
                </TouchableOpacity>
              </View>
            ))}

            {salvos.length === 0 && (
              <Text style={styles.emptyText}>
                Nenhum alimento salvo para esta refeição ainda.
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
                      style={styles.minusButton}
                      onPress={() => diminuirQuantidade(alimento)}
                    >
                      <Text style={styles.minusButtonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>
                      x{pendentes[alimento.id] || 0}
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