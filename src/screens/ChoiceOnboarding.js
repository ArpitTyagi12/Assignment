import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import CommonButton from "../components/CommonButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSelectedGenre } from "../redux/GenreSlice";
import { Responsive } from "../utils/Layout";

export default function ChoiceOnboarding() {
  const navigation = useNavigation();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const dispatch = useDispatch();

  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"];

  const handlePress = () => {
    if (selectedGenres.length > 0) {
      dispatch(setSelectedGenre(selectedGenres)); // Save to Redux
      navigation.navigate("BottomTabNavigator");
    } else {
      Alert.alert(
        "Selection Required",
        "Please select at least one genre before proceeding."
      );
    }
  };

  const handleGenrePress = (genre) => {
    setSelectedGenres(
      (prevSelectedGenres) =>
        prevSelectedGenres.includes(genre)
          ? prevSelectedGenres.filter((item) => item !== genre) // Deselect if already selected
          : [...prevSelectedGenres, genre] // Add to the selection if not selected
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedGenres.includes(item)
          ? styles.selectedItem
          : styles.unselectedItem,
      ]}
      onPress={() => handleGenrePress(item)}
    >
      <Text
        style={[
          styles.itemText,
          selectedGenres.includes(item)
            ? styles.selectedItemText
            : styles.unselectedItemText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={genres}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        keyExtractor={(item) => item}
        extraData={selectedGenres}
        numColumns={3}
      />
      <CommonButton
        title={"Next"}
        style={styles.buttonContainer}
        onPress={handlePress}
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
    marginTop: Responsive.height(20),
    alignSelf: "center",
    alignSelf: "center",
  },
  buttonContainer: {
    marginHorizontal: Responsive.width(20),
    marginVertical: Responsive.height(20),
  },
  item: {
    padding: 10,
    backgroundColor: "#fffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ECECEC",
    margin: 5,
  },
  selectedItem: {
    backgroundColor: "#5664F5",
  },
  itemText: {
    fontSize: Responsive.font(16),
    color: "#030303",
    fontWeight: "400",
  },
  selectedItemText: {
    color: "#ffffff",
  },
  unselectedItem: {
    backgroundColor: "#ffffff",
  },
  unselectedItemText: {
    color: "#030303",
  },
  flatListStyle: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
});
