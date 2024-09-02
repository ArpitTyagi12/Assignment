import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from "../constants/Icons";
import { apiUrl } from "../../applicationProperties";
import { Responsive } from "../utils/Layout";
import MovieItem from "../components/flatListItems/MovieItem";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMovieData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const parsedData = await response.json();
      setData(parsedData.data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMovieData();
  }, [fetchMovieData]);

  const handleSearchInputFocus = () => {
    navigation.navigate("SearchScreen");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.upperContainer}>
        <View style={styles.leftTopContainer}>
          <Image
            source={Icons.movieIcon}
            style={styles.iconSize}
            contentFit="contain"
          />
          <Text style={styles.bigHeading}>My Movies</Text>
        </View>
        <View style={styles.topRightContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#94A3B8"
            onFocus={handleSearchInputFocus}
          />
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              handleSearchInputFocus();
            }}
          >
            <Image source={Icons.searchIcon} style={styles.iconSize} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <MovieItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: Responsive.height(20) }}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bigHeading: {
    fontSize: Responsive.font(24),
    color: "#030303",
    fontWeight: "700",
    alignSelf: "center",
    marginLeft: Responsive.width(5),
    width: "75%",
  },
  input: {
    height: Responsive.height(30),
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: Responsive.width(10),
    borderRadius: 8,
    width: "85%",
  },
  iconSize: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
  leftTopContainer: {
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
  },
  upperContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    padding: 20,
  },
  topRightContainer: {
    flexDirection: "row",
    width: "60%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    justifyContent: "space-between",
    marginHorizontal: Responsive.width(20),
  },
  loadingContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
