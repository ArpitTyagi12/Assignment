import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icons from "../constants/Icons";
import { apiUrl } from "../../applicationProperties";
import { Responsive } from "../utils/Layout";
import MovieItem from "../components/flatListItems/MovieItem";
import { useFocusEffect } from "@react-navigation/native";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  const fetchMovieData = useCallback(async () => {
    try {
      const response = await fetch(apiUrl);
      const parsedData = await response.json();
      setData(parsedData.data.movies);
      setFilteredData(parsedData.data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    if (debouncedSearchText.trim() === "") {
      setFilteredData(data); // Show all data if search is cleared
    } else {
      const filtered = data.filter((movie) =>
        movie.title.toLowerCase().includes(debouncedSearchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [debouncedSearchText, data]);

  useFocusEffect(
    useCallback(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // Focus the input field
      }
    }, [])
  );

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          ref={inputRef}
          placeholder="Search Movies..."
          placeholderTextColor="#94A3B8"
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Image source={Icons.searchIcon} style={styles.iconSize} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          numColumns={2}
          renderItem={({ item }) => <MovieItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: Responsive.height(20) }}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  input: {
    height: Responsive.height(40),
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: Responsive.width(10),
    borderRadius: 8,
    width: "85%",
  },
  iconSize: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: Responsive.width(20),
    paddingVertical: Responsive.height(30),
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
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
