import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View, ScrollView, Image, ActivityIndicator, Platform } from "react-native";
import { styles } from "./style";
import ModalPerfil from "../../components/modalPerfil";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const API_BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

async function parseJsonResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Resposta inválida do servidor (não é JSON):");
    throw new Error(`Resposta inválida do servidor [status ${response.status}]: ${text}`);
  }
}

export default function Perfil({ user }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState(user?.nomeCompleto ?? user?.nome_completo ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.idUsuario) {
      setNomeCompleto(user.nomeCompleto ?? user.nome_completo ?? "");
      setEmail(user.email ?? user.email ?? "");
      buscarPerfil(user.idUsuario);
    }
  }, [user]);

  async function buscarPerfil(idUsuario) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/usuario/${idUsuario}`);
      const data = await parseJsonResponse(response);

      if (!response.ok) {
        // throw new Error(data.erro || data.message || "Erro ao buscar perfil.");
      }

      setNomeCompleto(data.nome_completo || data.nomeCompleto || "");
      // setEmail(data.email || "");
    } catch (err) {
      setError(err.message || "Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }

  async function salvarNome() {
    if (!user?.idUsuario) {
      setError("Usuário não identificado.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/usuario/${user.idUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ novo_nome: nomeCompleto }),
      });

      const data = await parseJsonResponse(response);
      if (!response.ok) {
        throw new Error(data.erro || data.message || "Erro ao atualizar nome.");
      }

      setModalVisible(false);
    } catch (err) {
      setError(err.message || "Erro ao salvar nome.");
    }
  }

  const abrirModal = () => {
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <StatusBar style="auto" />
          <View>
            <View style={styles.content}>
              <Image
                source={require("../../assets/images/splash-logo.png")}
                style={styles.profileImage}
              />
              <Text style={styles.title}>{nomeCompleto || "Seu nome aqui"}</Text>
            </View>
            <View style={styles.listra} />
            <View>
              <Text style={styles.title}>Dados pessoais</Text>
              {loading && <ActivityIndicator size="small" color="#000" />}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.cardName}>
                <View>
                  <Text style={styles.subTitle}>Nome Completo</Text>
                  <Text style={styles.text}>{nomeCompleto || "Não cadastrado"}</Text>
                </View>
                <TouchableOpacity onPress={abrirModal}>
                  <EvilIcons name="pencil" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.cardEmail}>
                <Text style={styles.subTitle}>E-mail</Text>
                <Text style={styles.text}>{email || "Não cadastrado"}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <ModalPerfil
        visible={modalVisible}
        onClose={fecharModal}
        nomeCompleto={nomeCompleto}
        onChangeNome={setNomeCompleto}
        onSave={salvarNome}
      />
    </View>
  );
}
