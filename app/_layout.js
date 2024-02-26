import { Link, Stack } from "expo-router";
import Icon from "../components/Icon";

export const unstable_settings = {
  initialRouteName: "index",
};

const Layout = () => {
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

export default Layout;
