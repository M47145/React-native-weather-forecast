import { Text, View, StyleSheet, Pressable } from "react-native";

const Home = ({ navigation }) => {
  const toAbout = () => {
    navigation.navigate("About");
  };
  const toForecast = () => {
    navigation.navigate("Forecast");
  };

  return (
    <View>
      <View>
        <Pressable style={styles.button} title="Go to about" onPress={toAbout}>
          <Text style={styles.text}> Go to About </Text>
        </Pressable>

        <Pressable
          style={styles.button}
          title="Go to forecast"
          onPress={toForecast}
        >
          <Text style={styles.text}>Forecast</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "pink",
    padding: 10,
    margin: 10,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  text: { color: "black", fontSize: 24, fontWeight: "bold" },
});

export default Home;
