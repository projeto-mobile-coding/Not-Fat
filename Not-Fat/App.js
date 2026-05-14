import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Refeicao from "./pages/refeicao";

export default function App() {
  return (
    <View>
      <Refeicao />
      <StatusBar style="light" />
    </View>
  );
}
