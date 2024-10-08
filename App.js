import { StatusBar, StyleSheet, Text, View } from "react-native";
import StackNavigator from "./src/navigation/StachNavigator";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      {/* Add the StatusBar component */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <StackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
