import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Refeicao from "../pages/refeicao";
import Perfil from "../pages/perfil";
import { colors } from "./styles/colors";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FFB703",
        tabBarInactiveTintColor: "#000",
        headerShown: false,
        tabBarShowLabel: false,
        // left: 20,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          bottom: 40,
          left: 20,
          right: 20,
          borderRadius: 40,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name=" "
        component={Refeicao}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <MaterialCommunityIcons
                  name="food-apple-outline"
                  size={size}
                  color={color}
                />
              );
            }
            return (
              <MaterialCommunityIcons
                name="food-apple-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="  "
        component={Perfil}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons name="person-outline" size={size} color={color} />
              );
            }
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
