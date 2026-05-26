import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { styles, AVATAR_SIZE } from "./style";
<<<<<<< Updated upstream
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


=======
import {GoogleSignin, user, isSuccessResponse } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  androidClientId:
    "423858196834-oji572gtcqs97sl8cu6hlk4qinkbr9um.apps.googleusercontent.com",
});
>>>>>>> Stashed changes

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
  const [auth, setAuth] = useState<user | null>(null);

  async function handleGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if(isSuccessResponse(response)) {
        cosole.log(response.data);
      }
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  }

  async function enviarTokenParaBackend(idToken: string | null) {
    if (!idToken) return;

    try {
      // Substitua pela URL real do seu servidor/API
      const response = await fetch('http://10.0.2.2:3000/backend/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: idToken }),
      });

  const dadosDoBackend = await response.json();
  
        if (response.ok) {
          console.log("Autenticado no Back-end com sucesso!", dadosDoBackend);
          // Aqui você salvaria o JWT retornado pelo seu back-end (ex: no AsyncStorage)
          // E mudaria o estado global de login do app (ex: setLogado(true))
        } else {
          console.error("Erro retornado pelo Back-end:", dadosDoBackend.message);
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
        
        if (response && response.data) {
          setAuth(response.data);
          
          // ENVIO PARA O BACK-END: Passa o idToken recebido do Google
          await enviarTokenParaBackend(response.data.idToken);
        }
      } catch (error: any) {
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
          activeOpacity={0.85}
          style={styles.googleButton}
        >
          <GoogleIcon />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
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
