import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { fetchWeather } from "../utils/ApiClient";
import CurrentWidget from "../components/CurrentWeather";
import ForecastWeather from "../components/ForecastWeather";
import { useLocationStore } from "../store";
import { useFocusEffect } from "expo-router";
import * as Location from "expo-location";

export default function Page() {
  const [weatherData, setWeatherData] = useState({});
  const [units] = useState("metric");
  const { location, setLocation } = useLocationStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
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
        } finally {
          setIsLoading(false);
        }
      };

      if (location.lon && location.lat) {
        handleFetch();
      }
    }, [units, location])
  );

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
    <ScrollView style={styles.container}>
      <View style={styles.main}>
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
});
