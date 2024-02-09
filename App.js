import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./screens/HomeScreen";
import FoodScreen from "./screens/FoodScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import PullScreen from "./screens/PullScreen";
import PushScreen from "./screens/PushScreen";
import LegScreen from "./screens/LegScreen";

// إنشاء Stack Navigator لصفحات التمارين
const WorkoutStack = createStackNavigator();

function WorkoutStackNavigator() {
  return (
    <WorkoutStack.Navigator screenOptions={{ headerShown: true }}>
      <WorkoutStack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={{
          headerStyle: {
            backgroundColor: "#2b2b2b", // لون الخلفية للهيدر لهذه الشاشة
          },
          headerTintColor: "#fff", // لون النص والأيقونات في الهيدر لهذه الشاشة
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <WorkoutStack.Screen
        name="PushScreen"
        component={PushScreen}
        options={{
          headerStyle: {
            backgroundColor: "#2b2b2b", // لون الخلفية للهيدر لهذه الشاشة
          },
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
            backgroundColor: "#2b2b2b", 
          },
          headerBackTitle: "Back", 
          headerTintColor: "#fff", 
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <WorkoutStack.Screen
        name="LegScreen"
        component={LegScreen}
        options={{
          headerStyle: {
            backgroundColor: "#2b2b2b", // لون الخلفية للهيدر لهذه الشاشة
          },
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
        tabBarStyle: { backgroundColor: "#6A0DAD" },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#9B30FF",
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
