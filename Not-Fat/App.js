import { useState } from "react";
import LoginScreen from "./pages/login/index";
import DiarioScreen from "./pages/refeicao";

export default function App() {
  const [logado, setLogado] = useState(false);

  if (!logado) {
    return <LoginScreen onLogin={() => setLogado(true)} />;
  }

  return <DiarioScreen />;
}