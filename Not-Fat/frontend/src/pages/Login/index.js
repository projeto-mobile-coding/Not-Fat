import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { styles } from "./style";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: '423858196834-s6hf7ij8s5cbi9ri401bqa40ojvjkq89.apps.googleusercontent.com',
  offlineAccess: true,
});

const GoogleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <Path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <Path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <Path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </Svg>
);

const CheckIcon = () => (
  <Svg width={11} height={9} viewBox="0 0 11 9" fill="none">
    <Path
      d="M1 4L4 7L10 1"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function LoginScreen({ onLogin }) {
  const [remindMe, setRemindMe] = useState(true);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(false);

  // MUDANÇA 1: A função agora recebe nome_completo e email enviados pelo Google
  async function enviarTokenParaBackend(nome_completo, email) {
    try {
      // MUDANÇA 2: Alterado a rota para coincidir com o 'app.post("/login")' do back-end
      const response = await fetch('http://10.0.2.2:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // MUDANÇA 3: Enviando o objeto com as chaves exatas que o banco de dados espera
        body: JSON.stringify({ 
          nome_completo: nome_completo, 
          email: email 
        }),
      });

      const dadosDoBackend = await response.json();

      if (response.ok) {
        console.log("Autenticado no Back-end com sucesso!", dadosDoBackend);
        if (onLogin) onLogin(dadosDoBackend); 
      } else {
        console.error("Erro retornado pelo Back-end:", dadosDoBackend.erro || dadosDoBackend.message);
      }
    } catch (error) {
      console.error("Erro ao conectar com o Back-end:", error);
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      
      // MUDANÇA 4: Extraindo nome e email de dentro do objeto retornado pelo Google
      if (response && response.data && response.data.user) {
        setAuth(response.data);
        
        const { name, email } = response.data.user;
        
        // Dispara os dados para salvar no banco
        await enviarTokenParaBackend(name, email);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("O usuário cancelou o fluxo de login.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("O login já está em andamento.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services não está disponível ou está desatualizado.");
      } else {
        console.log("Erro na autenticação:", error.message || error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <View />
        <TouchableOpacity>
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.center}>
        <Image
          style={styles.avatarImage}
          resizeMode="cover"
          source={require("../../assets/images/splash-logo.png")}
        />

        <View style={{ height: 40 }} />

        <TouchableOpacity
          onPress={handleGoogleSignIn}
          disabled={loading}
          activeOpacity={0.85}
          style={[styles.googleButton, loading && { opacity: 0.6 }]}
        >
          <GoogleIcon />
          <Text style={styles.googleButtonText}>
            {loading ? "Connecting..." : "Continue with Google"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setRemindMe(!remindMe)}
          style={styles.remindRow}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.checkbox,
              remindMe ? styles.checkboxChecked : styles.checkboxUnchecked,
            ]}
          >
            {remindMe && <CheckIcon />}
          </View>
          <Text style={styles.remindText}>Remind me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}