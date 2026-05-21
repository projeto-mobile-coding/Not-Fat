import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./pages/login/index";
import Refeicao from "./pages/refeicao/index";
import AdicionarAlimento from "./pages/refeicao/AdicionarAlimento";

const Stack = createNativeStackNavigator();

export default function App() {
  const [logado, setLogado] = useState(false);

  if (!logado) {
    return <LoginScreen onLogin={() => setLogado(true)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Refeicao"
          component={Refeicao}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Adicionar"
          component={AdicionarAlimento}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}