import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Refeicao from "../pages/refeicao";
import Perfil from "../pages/perfil";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name=" " component={Refeicao} />

      <Tab.Screen name="  " component={Perfil} />
    </Tab.Navigator>
  );
}
