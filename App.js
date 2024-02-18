import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./screens/HomeScreen";
import FoodScreen from "./screens/FoodScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
// import PullScreen from "./screens/PullScreen";
// import PushScreen from "./screens/PushScreen";
import LegScreen from "./screens/LegScreen";

// إنشاء Stack Navigator لصفحات التمارين
const WorkoutStack = createStackNavigator();

function WorkoutStackNavigator() {
  return (
    <WorkoutStack.Navigator screenOptions={{ headerShown: false }}>
      <WorkoutStack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={{
          headerStyle: {
            backgroundColor: "#003366", // لون الخلفية للهيدر لهذه الشاشة
          },

          headerTintColor: "#fff", // لون النص والأيقونات في الهيدر لهذه الشاشة
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      {/* <WorkoutStack.Screen
        name="PushScreen"
        component={PushScreen}
        options={{
          headerStyle: {
            backgroundColor: "#003366", // لون الخلفية للهيدر لهذه الشاشة
          },
          headerShown: true,
          headerBackTitle: "Back",
          headerTintColor: "#fff", // لون النص والأيقونات في الهيدر لهذه الشاشة
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <WorkoutStack.Screen
        name="PullScreen"
        component={PullScreen}
        options={{
          headerStyle: {
            backgroundColor: "#003366", 
          },
          headerShown: true,
          headerBackTitle: "Back", 
          headerTintColor: "#fff", 
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      /> */}
      <WorkoutStack.Screen
        name="LegScreen"
        component={LegScreen}
        options={{
          headerStyle: {
            backgroundColor: "#003366", // لون الخلفية للهيدر لهذه الشاشة
          },
          headerShown: true,
          headerBackTitle: "Back",
          headerTintColor: "#fff", // لون النص والأيقونات في الهيدر لهذه الشاشة
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </WorkoutStack.Navigator>
  );
}

// إنشاء Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0D47A1" },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#1E88E5",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutStackNavigator}
        options={{
          title: "Workout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="weight-lifter"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FoodScreen"
        component={FoodScreen}
        options={{
          title: "Food",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="food-fork-drink"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
