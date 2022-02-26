import {
  Text,
  FlatList,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  PermissionsAndroid,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import { useState, useEffect } from "react";

//----------------------------------------------

const Forecast = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("tampere");
  const [location, setLocation] = useState({
    where: { lat: null, lon: null },
  });

  //------------------------------------- Functions

  const requestLocationPermission = async () => {
    //See if we have permission to use location
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "WEATHER FORECAST NEEDS GPS",
          message: "NEED ACCESS TO GPS",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the gps");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleChange = (text) => {
    //Input change handler, only needed with the city variable
    setCity(text);
  };
  let geoOptions = {
    enableHighAccuracy: false,
    timeOut: 20000,
    maximumAge: 3600000,
  };

  const synchronousFunction = () => {
    //This function isn't really needed, I could have called the functions in different way
    requestLocationPermission();
    fetchDataByLocation();
  };

  const geoSuccess = (position) => {
    setLocation({
      where: {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      },
    });
  };

  const geoFailure = (err) => {
    console.log(err);
  };

  //Function to get weather forecast data using GPS. Originally function was the same for GPS and city fetches, but
  //debugging led to them being different and since there isn't too much repetition, I didn't mind.
  const fetchDataByLocation = async () => {
    //  Geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.where.lat}&lon=${location.where.lon}&units=metric&appid=d97af94456e7d905f3ce277141789624`
      );
      const jsonData = await response.json();
      setData(jsonData.list);
    } catch (error) {
      console.log(error);
    }
  };

  //Here is the other fethc function.
  const fetchDataByCityName = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=d97af94456e7d905f3ce277141789624`
      );
      const jsonData = await response.json();
      setData(jsonData.list);
      console.log(jsonData.list[0].weather[0].main);
    } catch (error) {
      console.log(error);
    }
  };

  //GPS didn't push the lat and lon into place when you first pressed the GPS button. So you got null. This seemed to fix it.
  useEffect(() => {
    Geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);
  }, []);

  //-------------------------RENDER
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="City Name"
        onChangeText={handleChange}
      />
      <Pressable style={styles.button} onPress={fetchDataByCityName}>
        <Text style={styles.text}>Get forecast</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={synchronousFunction}>
        <Text style={styles.text}>Use GPS</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          setData([]);
          setCity("");
        }}
      >
        <Text style={styles.text}>Clear</Text>
      </Pressable>

      <FlatList
        keyExtractor={(item) => item.dt}
        data={data}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            {item.dt_txt + "   "} {item.main.temp + " C   "}{" "}
            {item.weather[0].main}
          </Text>
        )}
      />
    </View>
  );
};

export default Forecast;
//--------------------------------STYLING
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  input: {
    fontSize: 24,
    margin: 10,
    height: 40,
    borderColor: "black",
  },
  button: {
    backgroundColor: "pink",
    padding: 10,
    margin: 10,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
