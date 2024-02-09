import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (


    <View style={styles.container}>
      <View style={gbtn.container}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate("WorkoutScreen")}
        >
          <ImageBackground
            source={require("./img/gym.jpeg")} // تحديث المسار لصورتك
            style={styles.buttonBackground}
            blurRadius={4}
          >
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("FoodScreen")}
        >
          <ImageBackground
            source={require("./img/food.jpeg")} // تحديث المسار لصورتك
            style={styles.buttonBackground}
            blurRadius={4}
          >
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const gbtn = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "10",
  },
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003366",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button1: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderBlockColor:'#ffffff',
    width: '100%',
    height: 200,
    marginVertical: 5, // مسافة رأسية بين الأزرار
  },
  button2: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderBlockColor:'#ffffff',
    width: "100%",
    height: 200,
    marginVertical: 5, // مسافة رأسية بين الأزرار
  },
  buttonBackground: {
    // resizeMode:"contain",
    flex:1,
    width: 500, // يمكنك تعديل العرض حسب الحاجة
    height: 200, // يمكنك تعديل الارتفاع حسب الحاجة
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // لتطبيق borderRadius على الصورة
  },
});

export default HomeScreen;
