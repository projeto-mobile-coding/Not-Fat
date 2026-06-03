import React from "react";
import { Text, TouchableOpacity, View, TextInput, Modal } from "react-native";
import { styles } from "./style";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function ModalPerfil({
  visible,
  onClose,
  nomeCompleto,
  onChangeNome,
  onSave,
}) {
  const handleSave = () => {
    onSave?.();
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
      accessible={true}
      accessibilityLabel="Modal para editar nome completo"
      accessibilityHint="Use este formulário para alterar o nome exibido no perfil."
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
              accessible={true}
              accessibilityLabel="Campo de nome completo"
              accessibilityHint="Digite o nome que deve aparecer no seu perfil."
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={fecharModal}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Cancelar edição"
                accessibilityHint="Fecha o modal sem salvar as alterações."
              >
                <Text style={styles.buttonCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSave}
                onPress={handleSave}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Salvar nome completo"
                accessibilityHint="Salva o nome digitado e fecha a edição."
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
