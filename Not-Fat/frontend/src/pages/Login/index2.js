import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Configure com os IDs reais obtidos no Google Cloud Console / Firebase
GoogleSignin.configure({
  // O webClientId é OBRIGATÓRIO para o Android e para obter o idToken que vai para o Back-end
  webClientId: 'SEU_ID_DE_CLIENTE_WEB.apps.googleusercontent.com', 
  iosClientId: 'SEU_CLIENT_ID_DO_IOS.apps.googleusercontent.com',
  offlineAccess: true, // Garante que você possa receber o serverAuthCode se necessário
});

interface AuthState {
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  };
  idToken: string | null;
  serverAuthCode: string | null;
}

export default function App() {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(false);

  // Função para enviar o token de autenticação para o seu Back-end
  async function enviarTokenParaBackend(idToken: string | null) {
    if (!idToken) return;

    try {
      // Substitua pela URL real do seu servidor/API
      const response = await fetch('https://sua-api.com/api/auth/google', {
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
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#34A853" />
      ) : auth ? (
        <View style={styles.content}>
          {auth.user.photo && (
            <Image source={{ uri: auth.user.photo }} style={styles.foto} />
          )}
          <Text style={styles.texto}>{auth.user.name}</Text>
          <Text style={styles.texto}>{auth.user.email}</Text>
        </View>
      ) : (
        <Button title="Entrar com o Google" onPress={handleGoogleSignIn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});