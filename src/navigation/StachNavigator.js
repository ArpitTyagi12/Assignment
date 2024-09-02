import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "../screens/Onboarding";
import ChoiceOnboarding from "../screens/ChoiceOnboarding";
import BottomTabNavigator from "./BottomTabNavigator";
import DetailScreen from "../screens/DetailScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("hasSeenOnboarding");
        if (value === null) {
          // If no value is found, it means the user is launching the app for the first time
          setIsFirstLaunch(true);
          await AsyncStorage.setItem("hasSeenOnboarding", "true");
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // Optionally, you can return a loading screen here while the app checks the storage
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen
              name="ChoiceOnboarding"
              component={ChoiceOnboarding}
            />
            {/* Add BottomTabNavigator as a screen that can be accessed */}
            <Stack.Screen
              name="BottomTabNavigator"
              component={BottomTabNavigator}
            />
          </>
        ) : (
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
        )}
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
