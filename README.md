# Not-Fat

Aplicativo nutricional, com a finalidade de planejar e monitorar as refeições diárias. Tornando a visualização da dieta fácil e prática.

### Passo a passo para criar o projeto

1. **Instalar o Expo CLI (linha de comando):**

   ```bash
   npm install -g expo-cli
   ```

   **Caso não funcione**

   ```bash
   npm install
   ```

2. **Criar um novo projeto:**

   ```bash

   npx create-expo-app --template blank
   ```

3. **Entrar na pasta do projeto:**

   ```bash

   cd nome-do-app
   ```

4. **Iniciar o servidor Expo:**

   ```bash

   npx expo start
   ```

# Bibliotecas utilizadas para o inicio do projeto:

1. **Biblioteca de icones do Expo**

   ```bash

   @expo/vector-icons
   ```

2. **Navegação entre telas**

   ```bash

   npm install @react-navigation/native @react-navigation/native-stack
   ```

   ```bash

   npx expo install react-native-screens react-native-safe-area-context
   ```

   ```bash

   expo install @react-navigation/bottom-tabs
   ```

# Ícones

1. **Perfil**

   ```bash
   import Ionicons from "@expo/vector-icons/Ionicons";
   ```

   ```bash

   <Ionicons name="person-outline" size={24} color="black" />
   ```

2. **Maçã**

   ```bash

   import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
   ```

   ```bash

   <MaterialCommunityIcons name="food-apple-outline" size={24} color="black"/>
   ```

3. **Mais**

   ```bash

   import Feather from "@expo/vector-icons/Feather";
   ```

   ```bash

   <Feather name="plus" size={24} color="black" />
   ```

4. **Seta**

   ```bash

   import Feather from "@expo/vector-icons/Feather";
   ```

   ```bash

   <Feather name="arrow-left" size={24} color="black" />
   ```

5. **Lupa**

   ```bash

   import EvilIcons from "@expo/vector-icons/EvilIcons";
   ```

   ```bash

   <EvilIcons name="search" size={24} color="black" />
   ```

6. **Maior que**

   ```bash

   import MaterialIcons from '@expo/vector-icons/MaterialIcons';
   ```

   ```bash

   <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
   ```

7. **Lápis**

   ```bash

   import EvilIcons from '@expo/vector-icons/EvilIcons';
   ```

   ```bash

   <EvilIcons name="pencil" size={24} color="black" />
   ```

8. **Menos**

   ```bash

   import AntDesign from '@expo/vector-icons/AntDesign';
   ```

   ```bash

   <AntDesign name="minus" size={24} color="black" />
   ```
