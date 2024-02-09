import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const WorkoutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Push Day</Text>

      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate("PushScreen")}
      >
        <ImageBackground
          source={require("./img/push.png")} // تحديث المسار لصورتك
          style={styles.buttonBackground}
          blurRadius={4}
        >
          <Text style={styles.buttonText}></Text>
        </ImageBackground>
      </TouchableOpacity>
      <Text style={styles.title}>Pull Day</Text>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("PullScreen")}
      >
        <ImageBackground
          source={require("./img/pull.png")} // تحديث المسار لصورتك
          style={styles.buttonBackground}
          blurRadius={4}
        >
          <Text style={styles.buttonText}></Text>
        </ImageBackground>
      </TouchableOpacity>
      <Text style={styles.title}>Legs Day</Text>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("LegScreen")}
      >
        <ImageBackground
          source={require("./img/leg.png")} // تحديث المسار لصورتك
          style={styles.buttonBackground}
          blurRadius={4}
        >
          <Text style={styles.buttonText}></Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003366",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white", // لون الخط أبيض
    fontSize: 25,
    marginBottom: 5,
  },
  button1: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderBlockColor: "#ffffff",
    width: "100%",
    height: 175,
    marginVertical: 5, // مسافة رأسية بين الأزرار
  },
  button2: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderBlockColor: "#ffffff",
    width: "100%",
    height: 175,
    marginVertical: 5, // مسافة رأسية بين الأزرار
  },
  buttonBackground: {
    // resizeMode:"contain",
    flex: 1,
    width: 500, // يمكنك تعديل العرض حسب الحاجة
    height: 175, // يمكنك تعديل الارتفاع حسب الحاجة
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // لتطبيق borderRadius على الصورة
  },
  buttonText: {
    fontSize: 30,
    color: "white", // لون الخط أبيض
    textAlign: "center", // محاذاة النص إلى الوسط
  },
});

export default WorkoutScreen;
