import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Icons from "../constants/Icons";
import CommonButton from "../components/CommonButton";
import { useNavigation } from "@react-navigation/native";
import { addFavorite, removeFavorite } from "../redux/FavoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImageUrl } from "../../applicationProperties";
import { Responsive } from "../utils/Layout";

export default function DetailScreen(item) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = item.route.params.item;
  console.log("item", items);
  const genres = items.genres.join(", ");

  const [isMarked, setIsMarked] = useState(false);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const isFavorite = favorites.some((favorite) => favorite.id === items.id);
    setIsMarked(isFavorite);
  }, [favorites, items.id]);

  const addToFavorite = () => {
    if (isMarked) {
      dispatch(removeFavorite(items.id));
    } else {
      dispatch(addFavorite(items));
    }
    setIsMarked(!isMarked);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Image
          source={Icons.movieIcon}
          style={styles.iconSize}
          contentFit="contain"
        />
        <Text style={styles.headingText}>My Movies</Text>
      </View>
      <Image
        source={{
          uri: ImageUrl + items.large_cover_image,
        }}
        style={styles.movieImage}
        resizeMode="stretch"
      />
      <Text style={styles.movieNameText}>{items.title}</Text>
      <View style={styles.bottomView}>
        <Text style={styles.descriptionText}>{items.slug}</Text>
        <View
          style={[styles.dateContainer, { paddingTop: Responsive.height(20) }]}
        >
          <Text style={styles.leftSmallHeqadingText}>Release Year:</Text>
          <Text style={styles.rightSmallHeqadingText}>{items.year}</Text>
        </View>
        <View
          style={[styles.dateContainer, { paddingTop: Responsive.height(5) }]}
        >
          <Text style={styles.leftSmallHeqadingText}>Genre</Text>
          <View style={styles.genreContainer}>
            <Text style={styles.rightSmallHeqadingText}>{genres}</Text>
          </View>
        </View>
      </View>
      <CommonButton
        title={isMarked ? "Unmark as Favorite" : "Mark as Favorite"}
        style={[
          styles.buttonContainer,
          isMarked ? styles.changeBachground : styles.buttonContainer,
        ]}
        onPress={addToFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: Responsive.height(20),
  },

  iconSize: {
    height: Responsive.height(16),
    width: Responsive.width(20),
    resizeMode: "contain",
  },
  headingText: {
    color: "#030303",
    fontWeight: "400",
    fontSize: Responsive.font(20),
    paddingLeft: Responsive.height(5),
  },
  movieImage: {
    height: Responsive.height(300),
    width: Responsive.width(200),
    alignSelf: "center",
    borderRadius: 8,
  },
  movieNameText: {
    color: "#030303",
    fontSize: Responsive.font(24),
    fontWeight: "700",
    alignSelf: "center",
    paddingTop: Responsive.height(18),
    paddingBottom: Responsive.height(20),
  },
  descriptionText: {
    color: "#030303",
    fontWeight: "400",
    fontSize: Responsive.font(18),
  },
  bottomView: {
    paddingHorizontal: Responsive.width(20),
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSmallHeqadingText: {
    color: "#545454",
    fontWeight: "400",
    fontSize: Responsive.font(14),
  },
  rightSmallHeqadingText: {
    color: "#030303",
    fontWeight: "400",
    fontSize: Responsive.font(14),
  },
  buttonContainer: {
    margin: 20,
  },
  genreContainer: {
    width: "60%",
    alignItems: "flex-end",
  },
  changeBachground: {
    backgroundColor: "#545454",
  },
});
