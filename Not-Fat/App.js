import { useState } from "react";
import LoginScreen from "./frontend/src/pages/Login";
import { Routes } from "./frontend/src/routes/routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <NavigationContainer>
      <Routes user={user} />
    </NavigationContainer>
  );
}
