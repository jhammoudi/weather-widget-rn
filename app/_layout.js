import { Link, Stack, useNavigationContainerRef } from "expo-router";
import Icon from "../components/Icon";
import * as Sentry from "@sentry/react-native";
import { useEffect } from "react";

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

export const unstable_settings = {
  initialRouteName: "index",
};

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DNS,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
    }),
  ],
});

const Layout = () => {
  // Capture the NavigationContainer ref and register it with the instrumentation.
  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{ contentStyle: { backgroundColor: "white" } }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Weather",
          headerRight: () => (
            <Link href={"/search"}>
              <Icon name="search" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: "Search",
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Sentry.wrap(Layout);
