import { useState } from "react";
import LoginScreen from "./frontend/src/pages/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "./frontend/src/routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );

  // const [logado, setLogado] = useState(false);

  // if (!logado) {
  //   return <LoginScreen onLogin={() => setLogado(true)} />;
  // }

  // return <DiarioScreen />;
}
