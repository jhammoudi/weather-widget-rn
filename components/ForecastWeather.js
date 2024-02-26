import { StyleSheet, Text, View, Image } from "react-native";
import { unixToShortDate } from "../utils/date";

const ForecastWeather = ({ data = [] }) => {
  if (!data.length) {
    return <Text>No forecast weather data found</Text>;
  }

  return (
    <View style={styles.rootContainer}>
      {data.map(({ date, icon, temp }, index) => (
        <View key={index} style={styles.dayContainer}>
          <View style={styles.edgeCol}>
            <Text style={styles.largeText}>{unixToShortDate(date)}</Text>
          </View>
          <View>
            <Image
              style={styles.icon}
              source={{
                uri: `https://openweathermap.org/img/wn/${icon}@4x.png`,
              }}
            />
          </View>
          <View style={styles.edgeCol}>
            <Text style={styles.largeText}>{temp.min}&#176;</Text>
            <Text style={styles.largeText}>{temp.max}&#176;</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  rootContainer: {
    gap: 15,
    marginBottom: 60,
  },
  dayContainer: {
    backgroundColor: "#dde3ed",
    borderRadius: 20,
    padding: 20,

    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  largeText: {
    fontSize: 20,
  },
  icon: {
    flex: 1,
    height: 50,
    width: 100,
  },
  edgeCol: {
    width: 50,
  },
});

export default ForecastWeather;
