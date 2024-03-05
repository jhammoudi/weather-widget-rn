import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import { fetchWeather } from "../utils/ApiClient";
import CurrentWidget from "../components/CurrentWeather";
import ForecastWeather from "../components/ForecastWeather";
import { useLocationStore } from "../store";
import { useFocusEffect, SplashScreen } from "expo-router";
import * as Location from "expo-location";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Page() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [units] = useState("metric");
  const { location, setLocation } = useLocationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});

        setLocation({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
      } catch (e) {
        console.log(e);
        setError({
          msg: e.message,
        });
      } finally {
        setAppIsReady(true);
      }
    };

    getLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const handleFetch = async () => {
        try {
          setIsLoading(true);
          const data = await fetchWeather(units, location);
          setWeatherData(data);
        } catch (e) {
          console.log(e);
          setError({
            msg: e.message,
          });
        } finally {
          setIsLoading(false);
        }
      };

      if (location.lon && location.lat) {
        handleFetch();
      }
    }, [units, location])
  );

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const currentWeather = weatherData?.current;
  const forecastWeather = weatherData?.forecast;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.main}>
        {!!error && (
          <Text style={styles.error}>Error: {JSON.stringify(error)}</Text>
        )}
        <CurrentWidget data={currentWeather} />
        <ForecastWeather data={forecastWeather} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  main: {
    flex: 1,
    gap: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
});
