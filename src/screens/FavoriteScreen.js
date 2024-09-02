import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icons from "../constants/Icons";
import CommonButton from "../components/CommonButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Responsive } from "../utils/Layout";
import FavoriteItem from "../components/flatListItems/FavoriteItem";

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.favorites);

  const EmptyConatiner = () => {
    return (
      <View style={styles.emptyContainerStyle}>
        <Text style={styles.movieName}>No favorites added yet</Text>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.upperContainer}>
        <View style={styles.leftTopContainer}>
          <Image
            source={Icons.movieIcon}
            style={styles.iconSize}
            contentFit="contain"
          />
          <Text style={styles.bigHeading}>Favorite Movies</Text>
        </View>
        <CommonButton
          title={"Back"}
          onPress={() => navigation.goBack()}
          style={styles.buttonStyleContainer}
        />
      </View>

      <FlatList
        data={favorites}
        renderItem={({ item }) => <FavoriteItem item={item} />}
        ListEmptyComponent={() => <EmptyConatiner />}
        contentContainerStyle={{ paddingBottom: Responsive.height(20) }}
        keyExtractor={(item) => item.id}
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
    lineHeight: 28,
  },
  leftTopContainer: {
    flexDirection: "row",
    width: "75%",
    alignItems: "center",
  },
  iconSize: {
    height: Responsive.height(24),
    width: Responsive.width(24),
    resizeMode: "contain",
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  movieName: {
    color: "#030303",
    fontSize: Responsive.font(20),
    fontWeight: "400",
  },
  buttonStyleContainer: {
    paddingVertical: Responsive.height(5),
    paddingHorizontal: Responsive.width(15),
  },
  emptyContainerStyle: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
});
