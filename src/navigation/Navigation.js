import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SubmissionListScreen from "../screens/SubmissionListScreen";
import FormEditScreen from "../screens/FormEditScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import NewVideoaskScreen from "../screens/NewVideoaskScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SubmissionDetailScreen from "../screens/SubmissionDetailScreen";
import VideoaskPreviewScreen from "../screens/VideoaskPreviewScreen";
import NewVideoaskStepsScreen from "../screens/NewVideoaskStepsScreen";
import FillFormScreen from "../screens/FillForm";
import AnswersPreviewScreen from "../screens/AnswersPreviewScreen";
import * as Linking from "expo-linking";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const prefix = Linking.createURL("/");

export default function Navigation() {
  const linking = {
    prefixes: [prefix],
  };

  console.log(Linking.useURL());

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubmissionListScreen"
          component={SubmissionListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubmissionDetailScreen"
          component={SubmissionDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormEditScreen"
          component={FormEditScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewVideoaskStepsScreen"
          component={NewVideoaskStepsScreen}
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="NewVideoaskScreen"
          component={NewVideoaskScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.RevealFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="VideoaskPreviewScreen"
          component={VideoaskPreviewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="form"
          component={FillFormScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AnswersPreviewScreen"
          component={AnswersPreviewScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
