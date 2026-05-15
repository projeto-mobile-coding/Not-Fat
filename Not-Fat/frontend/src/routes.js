import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Refeicao from "./pages/refeicao";
import Perfil from "./pages/perfil";
import LoginScreen from "./pages/Login";

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
        tabBarStyle: {
          position: "absolute",
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          bottom: 40,
          left: 20,
          right: 20,
          borderRadius: 40,
          elevation: 0,
          height: 70,
          paddingTop: 10,
          paddingBottom: 20,
          overflow: "visible",
          marginLeft: 70,
          marginRight: 70,
        },
        tabBarIconStyle: {
          marginTop: 4,
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
                <View
                  style={{
                    width: 70,
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="food-apple-outline"
                    size={40}
                    color={color}
                  />
                </View>
              );
            }
            return (
              <View
                style={{
                  width: 70,
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="food-apple-outline"
                  size={35}
                  color={color}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="  "
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    width: 70,
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="person-outline" size={39} color={color} />
                </View>
              );
            }
            return (
              <View
                style={{
                  width: 70,
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="person-outline" size={35} color={color} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
