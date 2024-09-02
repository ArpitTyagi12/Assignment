import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CommonButton from "../components/CommonButton";
import { useNavigation } from "@react-navigation/native";
import Icons from "../constants/Icons";
import { useDispatch } from "react-redux";
import { setName } from "../redux/UserSlice";
import { Responsive } from "../utils/Layout";

export default function Onboarding() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handlePress = () => {
    if (text.trim().length === 0) {
      alert("Please enter your name before proceeding.");
    } else {
      dispatch(setName(text));
      navigation.navigate("ChoiceOnboarding");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        source={Icons.onboardingIcon}
        style={styles.iconSize}
        contentFit="contain"
      />
      <Text style={styles.bigHeading}>Welcome to My Movies</Text>
      <Text style={styles.smallHeading}>Let’s get to know you!</Text>

      <Text style={[styles.smallHeading, { marginTop: Responsive.height(30) }]}>
        Enter your name
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor={"#94A3B8"}
        onChangeText={(value) => setText(value)}
        value={text}
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
  input: {
    height: Responsive.height(40),
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: Responsive.width(10),
    margin: 20,
    borderRadius: 8,
  },
  buttonContainer: {
    marginHorizontal: Responsive.width(20),
  },
  bigHeading: {
    fontSize: Responsive.font(24),
    color: "#030303",
    fontWeight: "700",
    marginTop: Responsive.height(20),
    alignSelf: "center",
    alignSelf: "center",
  },
  smallHeading: {
    fontSize: Responsive.font(16),
    color: "#030303",
    marginTop: Responsive.height(20),
    alignSelf: "center",
    fontWeight: "500",
  },
  iconSize: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: Responsive.height(40),
  },
});
