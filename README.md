# Weather App

<img src="./docs/weather-app.gif" alt="Weather app on iOS device" height="600">

## Features

- Fetches your current location's weather information, including the forecasted weather information for the next 7 days.
- Search for locations around the world for its weather information
- Interact with the Map, and press a point on the map to search for its weather information
- Using the Locate button in the Seach bar, to show your location's weather information again.

## Creating environment variables

To set your environment variables with your Weather API credentials, you first need to create your `.env` file. This is done by renaming the existing `.env.example` file to `.env`. In this file, populate the variables with your credentials.

## Installation

**Clone repository**:
Use the below command.

```bash
git clone https://github.com/jhammoudi/weather-widget-rn.git
```

**Dependency Installation**:
Run the below commands to install dependencies.

```bash
cd weather-widget-rn
npm install
```

## Available Scripts

In the project directory, you can run:

## Development

### `npm start`

Runs your app in development mode.

Open it in the Expo app on your phone, or on your virtual simulators, to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

When your app crashes, you may need to restart the app, on your simulators.

## Production

### `npm run create-secret`

Requires EAS CLI to be installed, and Expo Account created for login

Imports all environment variables from your local `.env` file, as secrets within EAS. These secrets are then automatically injected into your app during your app's build.

For more information, visit [here](https://docs.expo.dev/build-reference/variables/#secrets-on-the-expo-website).

### `npm run build:local:android`

Requires EAS CLI to be installed, and Expo Account created for login.

EAS Build allows you to build a ready-to-submit binary of your app for the Google Play Store or Apple App Store. Learn more [here](https://docs.expo.dev/build/setup/).

This script builds your app for the Android platform, using the 'local' build profile declared within your `eas.json` file. To configure your `eas.json` file, visit [here](https://docs.expo.dev/build/eas-json/).

## Expo Router

This project was bootstrapped with [Expo Router](https://docs.expo.dev/router/introduction/).

### Creating a new Expo Router app

```sh
npx create-expo-app -e with-router
```

## Author

Jihad Hammoudi - hammoudij@hotmail.com
