import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar style="auto" />
      <Text>HELLO WORLD!!</Text>
    </View>
  );
}
