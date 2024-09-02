import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let bottomIcon;
          if (route.name === "HomeScreen") {
            bottomIcon = "home";
          } else if (route.name === "SearchScreen") {
            bottomIcon = "search";
          } else if (route.name === "FavoriteScreen") {
            bottomIcon = "heart";
          } else if (route.name === "ProfileScreen") {
            bottomIcon = "person";
          }

          return <Ionicons name={bottomIcon} size={size} color={color} />;
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#5664F5",
        tabBarInactiveTintColor: "#030303",
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
