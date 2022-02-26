import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/home";
import About from "../screens/about";
import Forecast from "../screens/forecast";

const screens = {
  Home: {
    screen: Home,
  },
  About: {
    screen: About,
  },
  Forecast: {
    screen: Forecast,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
