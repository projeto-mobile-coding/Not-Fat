import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import { styles } from "./style";

import ModalPerfil from "../../components/modalPerfil";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function Perfil() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState("");

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
              ></Image>
              <Text style={styles.title}>{nomeCompleto}</Text>
            </View>
            <View style={styles.listra} />
            <View>
              <Text style={styles.title}>Dados pessoais</Text>
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
                <Text style={styles.text}>user123@gmail.com</Text>
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
      />
    </View>
  );
}
