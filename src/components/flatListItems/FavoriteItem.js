import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CommonButton from "../CommonButton";
import { ImageUrl } from "../../../applicationProperties";
import { useNavigation } from "@react-navigation/native";
import { Responsive } from "../../utils/Layout";

export default function FavoriteItem({ item }) {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.upperItemContainer}>
        <View style={{ width: "30%" }}>
          <Image
            source={{ uri: ImageUrl + item.large_cover_image }}
            style={styles.itemImage}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.movieName}>{item.title}</Text>
          <Text style={styles.movieRelease}>
            {item.genres.join(", ")} | {item.year}
          </Text>
          <Text style={styles.movieDescription}>Summary: {item.summary}</Text>

          <View style={styles.buttonMainContainer}>
            <CommonButton
              title={"View Details"}
              textStyle={{ fontSize: 14 }}
              onPress={() =>
                navigation.navigate("DetailScreen", { item: item })
              }
              style={styles.detailButtonContainer}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

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
    marginHorizontal: Responsive.width(20),
  },
  upperItemContainer: {
    flexDirection: "row",
  },
  itemImage: {
    width: Responsive.width(100),
    height: Responsive.height(150),
    borderRadius: 8,
  },
  textContainer: {
    paddingLeft: Responsive.width(10),
    paddingRight: Responsive.width(4),
    width: "70%",
  },
  movieName: {
    color: "#030303",
    fontSize: Responsive.font(20),
    fontWeight: "400",
  },
  movieRelease: {
    color: "#454545",
    fontSize: Responsive.font(12),
    fontWeight: "400",
    paddingVertical: Responsive.height(4),
  },
  movieDescription: {
    color: "#030303",
    fontSize: Responsive.font(12),
    fontWeight: "400",
  },
  buttonMainContainer: {
    width: "100%",
    paddingTop: Responsive.height(6),
    paddingBottom: Responsive.height(4),
  },
  detailButtonContainer: {
    paddingVertical: Responsive.height(2),
    borderRadius: 10,
  },
});
