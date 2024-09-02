import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Responsive } from "../utils/Layout";

export default function ProfileScreen() {
  const name = useSelector((state) => state.user.name);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingText}>Name</Text>
      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    color: "#030303",
    fontSize: Responsive.font(16),
    fontWeight: "400",
  },
  nameText: {
    color: "#030303",
    fontSize: Responsive.font(24),
    fontWeight: "700",
  },
});
