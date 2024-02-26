const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const WEATHER_API_URL = process.env.EXPO_PUBLIC_WEATHER_API_URL;
const WEATHER_GEO_API_URL = process.env.EXPO_PUBLIC_WEATHER_GEO_API_URL;

export const searchLocations = async (search) => {
  const params = {
    limit: 5,
    q: search,
    appid: API_KEY,
  };

  const res = await fetch(
    `${WEATHER_GEO_API_URL}/direct?${new URLSearchParams(params).toString()}`
  );

  return res.json();
};

export const fetchWeather = async (units, location) => {
  const params = {
    lat: location.lat,
    lon: location.lon,
    units,
    appid: API_KEY,
  };

  const fetchCurrentWeather = async () => {
    const res = await fetch(
      `${WEATHER_API_URL}/weather?${new URLSearchParams(params).toString()}`
    );

    return res.json();
  };

  const fetchOneCallWeather = async () => {
    const res = await fetch(
      `${WEATHER_API_URL}/onecall?${new URLSearchParams({
        ...params,
        exclude: "hourly,minutely,current",
      }).toString()}`
    );

    return res.json();
  };

  const [currentWeatherData, forecastWeatherData] = await Promise.all([
    fetchCurrentWeather(),
    fetchOneCallWeather(),
  ]);

  return {
    current: mapCurrentWeatherData(currentWeatherData),
    forecast: mapForecastData(forecastWeatherData.daily),
  };
};

const mapCurrentWeatherData = (data) => ({
  location: data.name,
  country: data.sys.country,
  date: data.dt,
  humidity: data.main.humidity,
  icon: data.weather[0].icon,
  windSpeed: data.wind.speed.toFixed(1),
  temperature: data.main.temp.toFixed(1),
  description: data.weather[0].description,
  feelsLike: data.main.feels_like.toFixed(1),
});

const mapForecastData = (data) =>
  data.map((day) => ({
    date: day.dt,
    humidity: day.humidity,
    icon: day.weather[0].icon,
    precipitation: day.rain,
    temp: {
      min: day.temp.min.toFixed(1),
      max: day.temp.max.toFixed(1),
    },
    description: day.weather[0].main,
  }));
