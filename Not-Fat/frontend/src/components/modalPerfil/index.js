import React from "react";
import { Text, TouchableOpacity, View, TextInput, Modal } from "react-native";
import { styles } from "./style";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function ModalPerfil({
  visible,
  onClose,
  nomeCompleto,
  onChangeNome,
}) {
  const lidarComEnvio = () => {
    alert(`Texto preenchido: ${nomeCompleto}`);
    fecharModal();
  };

  const fecharModal = () => {
    onClose?.();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={fecharModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <EvilIcons name="pencil" style={styles.icon} />
            <Text style={styles.title}>Editar nome completo</Text>
            <Text style={styles.subTitle}>
              Este será o nome exibido no seu perfil
            </Text>
          </View>
          <View style={styles.modalAlterName}>
            <Text>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Escreva aqui..."
              placeholderTextColor="#888"
              onChangeText={onChangeNome}
              value={nomeCompleto}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={fecharModal}
              >
                <Text style={styles.buttonCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSave}
                onPress={lidarComEnvio}
              >
                <Text style={styles.buttonSaveText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
