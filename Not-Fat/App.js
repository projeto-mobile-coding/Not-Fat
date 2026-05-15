import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import Refeicao from "./pages/refeicao";

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
    // <NavigationContainer>
    //   <View>
    //     <Routes />
    //     <StatusBar style="light" />
    //   </View>
    // </NavigationContainer>
  );
}
