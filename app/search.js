import { StyleSheet, View, Text, Pressable } from "react-native";
import * as Location from "expo-location";

import Map from "../components/Map";
import { SearchBar } from "@rneui/themed";
import { useState, useEffect } from "react";
import useDebounce from "../utils/useDebounce";
import { searchLocations } from "../utils/ApiClient";
import { useMarkerLocationStore } from "../store";
import Icon from "../components/Icon";

export default function Page() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 500);
  const setMarkerLocation = useMarkerLocationStore(
    (state) => state.setMarkerLocation
  );

  const updateSearch = (search) => {
    setSearch(search);
  };

  const handlePressSearchResult = ({ lat, lon }) => {
    setMarkerLocation({ longitude: lon, latitude: lat });
    setResults([]);
  };

  const handleLocateBtn = () => {
    setResults([]);
    setIsSearching(true);

    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});

        setMarkerLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsSearching(false);
      }
    };

    getLocation();
  };

  // this function will be triggered when the debouncedSearchTerm is modified
  useEffect(() => {
    if (debouncedSearchTerm) {
      // if debouncedSearchTerm exists, then to display searching prompt, and search for a location
      setIsSearching(true);
      searchLocations(debouncedSearchTerm)
        .then((results) => {
          setResults(results);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsSearching(false);
        });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <SearchBar
              placeholder="Search"
              showLoading={isSearching}
              containerStyle={{
                borderWidth: 0,
                flex: 1,
              }}
              inputContainerStyle={{
                backgroundColor: "#393e42",
              }}
              inputStyle={{
                color: "white",
                backgroundColor: "#393e42",
              }}
              onChangeText={updateSearch}
              value={search}
            />
            <Pressable
              onPress={handleLocateBtn}
              style={({ pressed }) => pressed && styles.opacity}
            >
              <View style={styles.icon}>
                <Icon name="locate" color="lightgrey" />
              </View>
            </Pressable>
          </View>
          <View style={styles.searchResults}>
            {results.map(({ country, name, state, lat, lon }, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={handlePressSearchResult.bind(this, { lat, lon })}
                  style={({ pressed }) =>
                    pressed
                      ? styles.pressedSearchResult
                      : styles.unpressedSearchResult
                  }
                >
                  <View style={styles.searchResult}>
                    <Text style={styles.searchResultText}>
                      {[name, state, country].filter(Boolean).join(", ")}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
        <Map />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  searchContainer: {
    position: "absolute",
    zIndex: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: 40,
    gap: 15,
  },
  searchBar: {
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#393e42",
    alignItems: "center",
  },
  searchResults: {
    borderRadius: 20,
    overflow: "hidden",
  },
  searchResult: {
    height: 70,
    justifyContent: "center",
    paddingLeft: 25,
    borderColor: "#585f66",
    borderBottomWidth: 2,
    borderStyle: "solid",
  },
  searchResultText: {
    fontSize: 18,
    color: "white",
  },
  pressedSearchResult: {
    backgroundColor: "black",
  },
  unpressedSearchResult: {
    backgroundColor: "#393e42",
  },
  icon: {
    paddingRight: 15,
  },
  opacity: {
    opacity: 0.4,
  },
});
