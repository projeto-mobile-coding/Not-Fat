import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import AdicionarAlimento from "./AdicionarAlimento";

const meals = [
  { id: "desjejum", label: "Desjejum", time: "06:00" },
  { id: "cafe", label: "Café da Manhã", time: "08:00" },
  { id: "almoco", label: "Almoço", time: "12:00" },
  { id: "lanche", label: "Lanche da Tarde", time: "15:00" },
  { id: "janta", label: "Janta", time: "19:00" },
  { id: "ceia", label: "Ceia", time: "21:00" },
];

const emptyMeals = {
  desjejum: [], cafe: [], almoco: [], lanche: [], janta: [], ceia: [],
};

export default function DiarioScreen() {
  const [screen, setScreen] = useState("home"); // home | meal | adicionar
  const [activeMeal, setActiveMeal] = useState(null);
  const [mealFoods, setMealFoods] = useState(emptyMeals);

  const mealKcal = (id) =>
    mealFoods[id].reduce((a, f) => a + f.totalKcal, 0);

  const handleAdicionar = (novosAlimentos) => {
    if (novosAlimentos.length > 0) {
      setMealFoods(prev => ({
        ...prev,
        [activeMeal.id]: [...prev[activeMeal.id], ...novosAlimentos],
      }));
    }
  };

  const removeFood = (mealId, index) => {
    setMealFoods(prev => ({
      ...prev,
      [mealId]: prev[mealId].filter((_, i) => i !== index),
    }));
  };

  // TELA ADICIONAR ALIMENTO
  if (screen === "adicionar") {
    return (
      <AdicionarAlimento
        onVoltar={() => setScreen("meal")}
        onAdicionar={handleAdicionar}
      />
    );
  }

  // TELA DA REFEIÇÃO
  if (screen === "meal" && activeMeal) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <View style={styles.mealHeader}>
          <TouchableOpacity onPress={() => setScreen("home")} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.mealHeaderTitle}>{activeMeal.label}</Text>
            <Text style={styles.mealHeaderTime}>{activeMeal.time}</Text>
          </View>
        </View>

        <View style={styles.addBtnContainer}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setScreen("adicionar")}
            activeOpacity={0.85}
          >
            <Text style={styles.addBtnText}>+ ALIMENTOS</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.list}>
          {mealFoods[activeMeal.id].length === 0 ? (
            <Text style={styles.emptyText}>Nenhum alimento adicionado ainda</Text>
          ) : (
            mealFoods[activeMeal.id].map((f, i) => (
              <View key={i} style={styles.foodCard}>
                <View>
                  <Text style={styles.foodName}>{f.name}</Text>
                  <Text style={styles.foodSub}>
                    {f.kcal} kcal / {f.unit} ·{" "}
                    <Text style={styles.green}>{f.totalKcal} kcal</Text>
                  </Text>
                </View>
                <View style={styles.foodRight}>
                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyText}>x{f.qty}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeFood(activeMeal.id, i)}>
                    <Text style={styles.removeBtn}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // HOME — lista de refeições
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.homeHeader}>
        <Text style={styles.homeTitle}>Diário Alimentar</Text>
        <Text style={styles.homeDate}>
          Hoje ·{" "}
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {meals.map(meal => (
          <TouchableOpacity
            key={meal.id}
            style={styles.mealCard}
            onPress={() => { setActiveMeal(meal); setScreen("meal"); }}
            activeOpacity={0.7}
          >
            <View>
              <Text style={styles.mealLabel}>{meal.label}</Text>
              <Text style={styles.mealSub}>
                {mealFoods[meal.id].length > 0
                  ? `${mealKcal(meal.id)} kcal · ${mealFoods[meal.id].length} item(s)`
                  : "Nenhum alimento"}
              </Text>
            </View>
            <View style={styles.mealRight}>
              {mealFoods[meal.id].length > 0 && (
                <View style={styles.kcalBadge}>
                  <Text style={styles.kcalBadgeText}>{mealKcal(meal.id)} kcal</Text>
                </View>
              )}
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },

  // Home
  homeHeader: { backgroundColor: "#fff", padding: 20, marginBottom: 8 },
  homeTitle: { fontSize: 22, fontWeight: "800", color: "#1a1a1a" },
  homeDate: { fontSize: 13, color: "#888", marginTop: 2 },
  list: { padding: 12, paddingBottom: 32 },
  mealCard: {
    backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 8,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    elevation: 1,
  },
  mealLabel: { fontSize: 15, fontWeight: "700", color: "#1a1a1a" },
  mealSub: { fontSize: 12, color: "#999", marginTop: 2 },
  mealRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  kcalBadge: { backgroundColor: "#e8f5e9", borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  kcalBadgeText: { color: "#2d7a2d", fontSize: 11, fontWeight: "700" },
  arrow: { fontSize: 20, color: "#ccc" },

  // Meal screen
  mealHeader: {
    backgroundColor: "#fff", padding: 16,
    flexDirection: "row", alignItems: "center", gap: 12,
  },
  backBtn: { padding: 4 },
  backText: { fontSize: 24, color: "#4CAF50" },
  mealHeaderTitle: { fontSize: 18, fontWeight: "800", color: "#1a1a1a" },
  mealHeaderTime: { fontSize: 12, color: "#999" },
  addBtnContainer: { backgroundColor: "#fff", paddingHorizontal: 20, paddingBottom: 16 },
  addBtn: {
    backgroundColor: "#4CAF50", borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 20, alignSelf: "flex-start",
  },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 14, letterSpacing: 0.5 },
  emptyText: { textAlign: "center", marginTop: 60, color: "#bbb", fontSize: 15 },
  foodCard: {
    backgroundColor: "#fff", borderRadius: 14, padding: 14, marginBottom: 8,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    elevation: 1,
  },
  foodName: { fontSize: 14, fontWeight: "600", color: "#1a1a1a" },
  foodSub: { fontSize: 12, color: "#999", marginTop: 2 },
  green: { color: "#4CAF50", fontWeight: "700" },
  foodRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBadge: { backgroundColor: "#f0f9f0", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  qtyText: { color: "#2d7a2d", fontWeight: "700", fontSize: 13 },
  removeBtn: { color: "#ccc", fontSize: 16, paddingHorizontal: 4 },
});