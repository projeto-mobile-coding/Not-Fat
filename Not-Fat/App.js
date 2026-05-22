import { useState } from "react";
import LoginScreen from "./frontend/src/pages/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "./frontend/src/routes/routes";
import { NavigationContainer } from "@react-navigation/native";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";

GoogleSignin.configure({
  webClientId:
    "423858196834-s6hf7ij8s5cbi9ri401bqa40ojvjkq89.apps.googleusercontent.com",
  offlineAccess: true,
});

export default function App() {
  // return (
  //     <NavigationContainer>
  //       <Routes />
  //     </NavigationContainer>
  // );
  const [auth, setAuth] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      alignItems: "center",
    },
    photo: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
  });

  async function handleGoogleSignIn() {
    try {
      console.log("Starting Google SignIn...");
      // await GoogleSignin.hasPlayServices();

      console.log("Attempting to sign in...");
      const response = await GoogleSignin.signIn();
      console.log("SignIn response:", response);

      if (isSuccessResponse(response)) {
        setAuth(response.data);
        console.log("SignIn successful!");
      } else {
        console.log("SignIn response is not a success response");
      }
    } catch (error) {
      console.log("Google SignIn Error:", error.message || error);
      console.log("Error Code:", error.code);
      console.log("Full error object:", JSON.stringify(error, null, 2));
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoogleSignIn}>
        <Text>Hello world</Text>
      </TouchableOpacity>

      {auth && (
        <View style={styles.content}>
          <Image source={{ uri: auth.user.photo }} style={styles.photo} />
          <Text>{auth.user.name}</Text>
          <Text>{auth.user.email}</Text>
        </View>
      )}
    </View>
  );

  // if (!logado) {
  //   return <LoginScreen onLogin={() => setLogado(true)} />;
  // }

  // return (
  //   <NavigationContainer>
  //     <Routes />
  //   </NavigationContainer>
  // );
}
