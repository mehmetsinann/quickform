import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import Navigation from "./src/navigation/Navigation";
import store from "./src/redux/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <Navigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
