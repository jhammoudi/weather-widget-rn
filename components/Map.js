import { Text, View, StyleSheet, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRef, useEffect } from "react";
import { router } from "expo-router";
import { useLocationStore, useMarkerLocationStore } from "../store";

const Map = () => {
  const { location, setLocation } = useLocationStore();
  const { lat, lon } = location;

  const { markerLocation, setMarkerLocation } = useMarkerLocationStore();

  useEffect(() => {
    setMarkerLocation({
      latitude: lat,
      longitude: lon,
    });
  }, [lat, lon]);

  useEffect(() => {
    const region = {
      ...markerLocation,
      latitudeDelta: coordinateDelta,
      longitudeDelta: coordinateDelta,
    };
    mapRef.current?.animateToRegion(region);
  }, [markerLocation]);

  const mapRef = useRef(null);

  const coordinateDelta = 0.7;

  if (Object.keys(location).length === 0) {
    return (
      <View style={styles.fallback}>
        <Text>No location data to view on Map</Text>
      </View>
    );
  }

  const hasUpdatedLocation =
    lat !== markerLocation?.latitude || lon !== markerLocation?.longitude;

  const handleOnMapPress = (event) => {
    const selectedLocation = event.nativeEvent.coordinate;
    setMarkerLocation(selectedLocation);
  };

  const handleOnConfirm = () => {
    setLocation({
      lat: markerLocation.latitude,
      lon: markerLocation.longitude,
    });

    router.back();
  };

  return (
    <View style={styles.rootContainer}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleOnMapPress}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: coordinateDelta,
          longitudeDelta: coordinateDelta,
        }}
      >
        {markerLocation.longitude && markerLocation.latitude && (
          <Marker coordinate={markerLocation} />
        )}
      </MapView>
      {hasUpdatedLocation && (
        <View>
          <Pressable
            onPress={handleOnConfirm}
            style={({ pressed }) => [
              pressed ? styles.pressedOverlay : styles.unpressedOverlay,
              styles.mapOverlay,
            ]}
          >
            <View>
              <Text style={styles.mapOverlayText}>Select Location</Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: { flex: 1 },
  map: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    flex: 1,
    color: "white",
    position: "absolute",
    width: "45%",
    height: 45,
    borderRadius: 15,
    bottom: 0,
    alignSelf: "center",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  unpressedOverlay: { backgroundColor: "green" },
  pressedOverlay: { backgroundColor: "darkgreen" },
  mapOverlayText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  fallback: {
    padding: 20,
  },
});

export default Map;
