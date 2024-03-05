import * as dotenv from "dotenv";

dotenv.config();

const appId = "com.jhammoudi.weatherapp";

export default ({ config }) => ({
  ...config,
  android: {
    package: appId,
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_MAPS_API_KEY,
      },
    },
  },
  ios: {
    bundleIdentifier: appId,
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_IOS_GOOGLE_MAPS_API_KEY,
    },
  },
});
