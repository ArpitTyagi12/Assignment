// MovieItem.js
import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageUrl } from "../../../applicationProperties";
import { Responsive } from "../../utils/Layout";

const MovieItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("DetailScreen", { item })}
    >
      <Image
        source={{ uri: ImageUrl + item.large_cover_image }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>Rating: {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    marginVertical: Responsive.height(8),
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemImage: {
    width: Responsive.width(145),
    height: Responsive.height(200),
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    paddingTop: Responsive.height(4),
    width: Responsive.width(130),
  },
  itemTitle: {
    fontSize: Responsive.font(16),
    fontWeight: "400",
    color: "#030303",
  },
  itemSubtitle: {
    fontSize: Responsive.font(12),
    color: "#545454",
    fontWeight: "400",
    paddingTop: Responsive.height(4),
  },
});

export default MovieItem;
