import { Text, View, StyleSheet } from "react-native";
const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello from about</Text>
      <Text style={styles.text}>
        Here is an application I have made as a final exercise for a school
        software course.
      </Text>
      <Text style={styles.text}>
        The idea wasn't to make a ready application but to more or less showcase
        what I had learned
      </Text>

      <Text style={{ flexDirection: "row" }}>
        <Text style={styles.text}>
          Application is simple. Go back to home page and select
        </Text>
        <Text style={styles.red}> Forecast. </Text>
        <Text style={styles.text}>
          After that enter the city you want and press the{" "}
        </Text>
        <Text style={styles.purple}>Get forecast</Text>
        <Text style={styles.text}>
          {" "}
          button. Tampere is set as a default. Or if you want the weather for
          your own location, press{" "}
        </Text>
        <Text style={styles.purple}>Use GPS. </Text>
        <Text style={styles.text}>
          If nothing comes up on the screen, press again.
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
  },
  header: { textAlign: "center", fontSize: 30, margin: 15 },
  text: {
    textAlign: "left",
    fontSize: 24,
    marginBottom: 10,
  },
  red: { color: "red", textAlign: "left", fontSize: 24, marginBottom: 10 },
  purple: {
    color: "purple",
    textAlign: "left",
    fontSize: 24,
    marginBottom: 10,
  },
});

export default About;
