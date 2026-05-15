import { useState } from "react";
import LoginScreen from "./pages/login/index";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "./src/routes";
import DiarioScreen from "./pages/refeicao";

export default function App() {
  const [logado, setLogado] = useState(false);

  if (!logado) {
    return <LoginScreen onLogin={() => setLogado(true)} />;
  }

  return <DiarioScreen />;
}
