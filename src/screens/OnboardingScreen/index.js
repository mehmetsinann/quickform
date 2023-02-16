import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useFonts } from "expo-font";
import { styles } from "./styles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const slides = [
  {
    key: 1,
    title: "Welcome to\nQuickForm",
    image: require("../../../assets/images/onboarding/onboarding1.png"),
    backgroundColor: "#0099FF",
  },
  {
    key: 2,
    title: "You can create\n wonderful forms\nin minutes",
    text: "QuickForm is a powerful form builder\nthat lets you create forms in minutes.",
    image: require("../../../assets/images/onboarding/onboarding2.png"),
    backgroundColor: "#FF6100",
  },
  {
    key: 3,
    title: "Share forms\n with other peoples\nand collect their\nresponses",
    text: "You can share your forms with your\nusers and collect their responses\nin real time.",
    image: require("../../../assets/images/onboarding/onboarding3.png"),
    backgroundColor: "#FFB629",
  },
];

export default function OnboardingScreen({ navigation }) {
  const [loaded] = useFonts({
    HandleeRegular: require("../../../assets/fonts/Handlee-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <StatusBar style="dark" />
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.buttonText}>Get Started</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      showSkipButton
      renderDoneButton={renderDoneButton}
      activeDotStyle={styles.activeDot}
      onDone={() => navigation.replace("LoginScreen")}
      onSkip={() => navigation.replace("LoginScreen")}
    />
  );
}
