import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Refeicao from "../pages/refeicao";
import Perfil from "../pages/perfil";
import Alimento from "../pages/alimento";

import { colors } from "../styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "./style";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      style={styles.screenOptions}
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "white",
        headerShown: false,
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
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -5,
        },
        tabBarIconStyle: {
          marginTop: 6,
          marginBottom: 2,
        },
      }}
    >
      <Tab.Screen
        name="Refeições"
        component={Refeicao}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 30,
                    width: 80,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 15,
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
                  width: 80,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 10,
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
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 30,
                    width: 80,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 10,
                  }}
                >
                  <Ionicons name="person-outline" size={39} color={color} />
                </View>
              );
            }

            return (
              <View
                style={{
                  width: 80,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 10,
                }}
              >
                <Ionicons name="person-outline" size={35} color={color} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Alimento"
        component={Alimento}
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}