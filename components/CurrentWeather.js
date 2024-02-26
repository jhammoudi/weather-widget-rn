import { StyleSheet, Text, View, Image } from "react-native";
import { unixToFullDate } from "../utils/date";

const CurrentWidget = ({ data = {} }) => {
  const {
    location,
    country,
    date,
    humidity,
    icon,
    windSpeed,
    temperature,
    description,
    feelsLike,
  } = data;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  if (Object.keys(data).length === 0) {
    return <Text>No current weather data found</Text>;
  }

  return (
    <View>
      <Text style={styles.subtitle}>{country || ""}</Text>
      <Text style={[styles.location, styles.bold]}>{location || ""}</Text>
      <Text style={styles.subtitle}>{unixToFullDate(date)}</Text>
      <View style={styles.currentContent}>
        <View style={styles.currentDetails}>
          <Text style={[styles.title, styles.bold]}>
            {(temperature || "") + `\u00b0`}
          </Text>
          <Text style={styles.subtitle}>
            {description &&
              feelsLike &&
              `${
                description[0].toUpperCase() + description.slice(1)
              }. Feels like ${feelsLike}\u00b0`}
          </Text>
        </View>
        <Image
          style={styles.icon}
          source={{
            uri: iconUrl,
          }}
        />
      </View>

      <Text style={styles.subtitle}>
        <Text style={styles.bold}>Humidity:</Text> {humidity || ""}&#37;
      </Text>
      <Text style={styles.subtitle}>
        <Text style={styles.bold}>Wind Speed:</Text> {windSpeed || ""} m/s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  currentContent: {
    flexDirection: "row",
    gap: 15,
  },
  currentDetails: {
    flex: 1,
  },
  icon: {
    flex: 1,
    height: 120,
    width: 120,
  },
  title: {
    fontSize: 60,
  },
  location: { fontSize: 30 },
  subtitle: {
    fontSize: 18,
    color: "#38434D",
  },
});

export default CurrentWidget;
