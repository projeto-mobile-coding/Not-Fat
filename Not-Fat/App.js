import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import LoginScreen from "./frontend/src/pages/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "./frontend/src/routes/routes";
import { NavigationContainer } from "@react-navigation/native";

const getApiBaseUrl = () => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;

  if (envUrl) {
    return envUrl;
  }

  return Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://localhost:3000";
};

export default function App() {
  const [logado, setLogado] = useState(false);

  const handleLogin = async () => {
    try {
      const resposta = await fetch(`${getApiBaseUrl()}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_completo: "Usuário",
          email: "user@notfat.app",
        }),
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível autenticar o usuário.");
      }

      const dados = await resposta.json();

      await AsyncStorage.setItem("current-user-id", String(dados.idUsuario));
      setLogado(true);
    } catch (erro) {
      console.log(erro.message);
    }
  };

  if (!logado) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
