import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { styles } from "./style";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function Perfil() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <StatusBar style="auto" />
          <View>
            <View style={styles.content}>
              <Image
                source={require("../../assets/images/splash-logo.png")}
                style={styles.profileImage}
              ></Image>
              <Text style={styles.title}>Lula & Bolsonaro</Text>
            </View>
            <View style={styles.listra} />
            <View>
              <Text style={styles.title}>Dados pessoais</Text>
              <View style={styles.cardName}>
                <View>
                  <Text style={styles.subTitle}>Nome Completo</Text>
                  <Text style={styles.text}>Lula&Bolso</Text>
                </View>
                <TouchableOpacity>
                  <EvilIcons name="pencil" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.cardEmail}>
                <Text style={styles.subTitle}>E-mail</Text>
                <Text style={styles.text}>user123@gmail.com</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
