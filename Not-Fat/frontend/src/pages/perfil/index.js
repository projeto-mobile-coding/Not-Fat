import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { styles } from "./style";

import ModalPerfil from "../../components/modalPerfil";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const getApiBaseUrl = () => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;

  if (envUrl) {
    return envUrl;
  }

  return Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://localhost:3000";
};

export default function Perfil() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeEditado, setNomeEditado] = useState("");
  const [email, setEmail] = useState("");
  const [carregandoPerfil, setCarregandoPerfil] = useState(true);
  const [erroPerfil, setErroPerfil] = useState("");
  const [salvandoNome, setSalvandoNome] = useState(false);

  useEffect(() => {
    async function carregarPerfil() {
      setCarregandoPerfil(true);
      setErroPerfil("");

      try {
        const idUsuario = await AsyncStorage.getItem("current-user-id");

        if (!idUsuario) {
          setErroPerfil("Nenhum usuário conectado.");
          return;
        }

        const resposta = await fetch(`${getApiBaseUrl()}/usuario/${idUsuario}`);

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar o perfil.");
        }

        const usuario = await resposta.json();
        setNomeCompleto(usuario.nome_completo || "");
        setNomeEditado(usuario.nome_completo || "");
        setEmail(usuario.email || "");
      } catch (erro) {
        setErroPerfil("Não foi possível carregar o perfil.");
      } finally {
        setCarregandoPerfil(false);
      }
    }

    carregarPerfil();
  }, []);

  const abrirModal = () => {
    setNomeEditado(nomeCompleto);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
  };

  const salvarNome = async () => {
    const nome = nomeEditado.trim();

    if (!nome) {
      setErroPerfil("O nome não pode ficar vazio.");
      return;
    }

    try {
      setSalvandoNome(true);
      setErroPerfil("");

      const idUsuario = await AsyncStorage.getItem("current-user-id");

      if (!idUsuario) {
        setErroPerfil("Nenhum usuário conectado.");
        return;
      }

      const resposta = await fetch(`${getApiBaseUrl()}/usuario/${idUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ novo_nome: nome }),
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível atualizar o nome.");
      }

      setNomeCompleto(nome);
      setModalVisible(false);
    } catch (erro) {
      setErroPerfil("Não foi possível atualizar o nome.");
    } finally {
      setSalvandoNome(false);
    }
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
              ></Image>
              <Text style={styles.title}>{nomeCompleto || "Usuário"}</Text>
            </View>
            <View style={styles.listra} />
            <View>
              <Text style={styles.title}>Dados pessoais</Text>

              {carregandoPerfil && (
                <Text style={styles.text}>Carregando perfil...</Text>
              )}

              {!carregandoPerfil && erroPerfil && (
                <Text style={styles.text}>{erroPerfil}</Text>
              )}

              {!carregandoPerfil && !erroPerfil && (
                <>
                  <View style={styles.cardName}>
                    <View>
                      <Text style={styles.subTitle}>Nome Completo</Text>
                      <Text style={styles.text}>{nomeCompleto}</Text>
                    </View>
                    <TouchableOpacity onPress={abrirModal}>
                      <EvilIcons name="pencil" style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardEmail}>
                    <Text style={styles.subTitle}>E-mail</Text>
                    <Text style={styles.text}>{email}</Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <ModalPerfil
        visible={modalVisible}
        onClose={fecharModal}
        nomeCompleto={nomeEditado}
        onChangeNome={setNomeEditado}
        onSave={salvarNome}
        salvando={salvandoNome}
      />
    </View>
  );
}
