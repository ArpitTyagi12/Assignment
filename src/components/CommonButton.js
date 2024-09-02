import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Responsive } from "../utils/Layout";

const CommonButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5664F5",
    paddingVertical: Responsive.height(12),
    paddingHorizontal: Responsive.width(20),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: Responsive.font(16),
    fontWeight: "400",
  },
});

export default CommonButton;
