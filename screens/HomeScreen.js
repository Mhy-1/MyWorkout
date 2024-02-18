import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
  TextInput,
  Button,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";

const CircularProgress = ({
  size,
  strokeWidth,
  progress,
  tintColor,
  zIndex,
}) => {
  const radius = (size - strokeWidth) / 2.3;
  const circumference = radius * 2 * Math.PI;
  const adjustedProgress = Math.min(progress, 100);
  const strokeDashoffset = circumference - (adjustedProgress / 100) * circumference;

  return (
    <View style={[styles.circularProgress, { zIndex }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#eee"
            strokeWidth={strokeWidth}
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={tintColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
};

const MacroGoalsModal = ({
  visible,
  onClose,
  calories,
  setCalories,
  protein,
  setProtein,
  carbs,
  setCarbs,
  fat,
  setFat,
}) => {
  const handleClose = async () => {
    try {
      const targetMacros = {
        targetCalories: calories,
        targetProtein: protein,
        targetCarbs: carbs,
        targetFat: fat,
      };
      const jsonValue = JSON.stringify(targetMacros);
      await AsyncStorage.setItem("targetMacros", jsonValue);
      onClose(); // إغلاق المودال
    } catch (e) {
      Alert.alert("Error", "Failed to save macro goals");
    }
  };

  const handleSetMacros = (macro, value) => {
    let newValue = parseFloat(value) || 0;
    let otherValues =
      macro === "protein"
        ? [carbs, fat]
        : macro === "carbs"
        ? [protein, fat]
        : [protein, carbs];
    let otherValuesTotal = otherValues.reduce(
      (a, b) => a + parseFloat(b) || 0,
      0
    );
    if (otherValuesTotal + newValue <= 100) {
      if (macro === "protein") {
        setProtein(newValue);
      } else if (macro === "carbs") {
        setCarbs(newValue);
      } else {
        setFat(newValue);
      }
    } else {
      Alert.alert("Error", "Total percentage cannot exceed 100%");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={calories.toString()}
            onChangeText={(text) => setCalories(Number(text))}
            keyboardType="numeric"
          />
          <Text>Protein: {((calories * protein) / 100 / 4).toFixed(1)} g</Text>
          <TextInput
            style={styles.input}
            value={protein.toString()}
            onChangeText={(value) => handleSetMacros("protein", value)}
            keyboardType="numeric"
          />
          <Text>Carbs: {((calories * carbs) / 100 / 4).toFixed(1)} g</Text>
          <TextInput
            style={styles.input}
            value={carbs.toString()}
            onChangeText={(value) => handleSetMacros("carbs", value)}
            keyboardType="numeric"
          />
          <Text>Fat: {((calories * fat) / 100 / 9).toFixed(1)} g</Text>
          <TextInput
            style={styles.input}
            value={fat.toString()}
            onChangeText={(value) => handleSetMacros("fat", value)}
            keyboardType="numeric"
          />
          <Button title="Close" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};

const HomeScreen = () => {
  const [mealFoods, setMealFoods] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const mealIcons = {
    breakfast: "egg-fried",
    lunch: "rice",
    dinner: "food-steak",
    snacks: "food-apple-outline",
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMealType, setCurrentMealType] = useState("");
  const [foods, setFoods] = useState([]);

  // New state for nutrition values
  const [nutrition, setNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const targetProteinGrams = targetMacros
    ? (targetMacros.targetCalories * targetMacros.targetProtein) / 100 / 4
    : 0;
  const targetCarbsGrams = targetMacros
    ? (targetMacros.targetCalories * targetMacros.targetCarbs) / 100 / 4
    : 0;
  const targetFatGrams = targetMacros
    ? (targetMacros.targetCalories * targetMacros.targetFat) / 100 / 9
    : 0;

  const [macroModalVisible, setMacroModalVisible] = useState(false);
  const [targetMacros, setTargetMacros] = useState({
    targetCalories: 2000,
    targetProtein: 20,
    targetCarbs: 50,
    targetFat: 30,
  });

  useEffect(() => {
    loadFoods();
    loadMealFoods();
    loadTargetMacros();
  }, []);

  
  useEffect(() => {
    // تحديث التغذية كلما تغيرت mealFoods
    calculateNutrition(mealFoods);
  }, [mealFoods]);
  useEffect(() => {
    const loadMealFoods = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("mealFoods");
        if (jsonValue != null) {
          setMealFoods(JSON.parse(jsonValue));
        }
      } catch (e) {
        Alert.alert("Error", "Failed to load the meal data");
      }
    };

    loadMealFoods();
  }, []);
  const loadFoods = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("foods");
      if (jsonValue != null) setFoods(JSON.parse(jsonValue));
    } catch (e) {
      Alert.alert("Error", "Failed to load the food data");
    }
  };
  const loadTargetMacros = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("targetMacros");
      if (jsonValue != null) setTargetMacros(JSON.parse(jsonValue));
    } catch (e) {
      Alert.alert("Error", "Failed to load macro goals");
    }
  };

  useEffect(() => {
    loadFoods();
    loadMealFoods();
    loadTargetMacros(); // تحميل النسب المستهدفة عند بدء التطبيق
  }, []);

  const loadMealFoods = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("mealFoods");
      if (jsonValue != null) {
        const meals = JSON.parse(jsonValue);
        setMealFoods(meals);
        calculateNutrition(meals);
      }
    } catch (e) {
      Alert.alert("Error", "Failed to load meal data");
    }
  };

  const saveMealFoods = async () => {
    try {
      const jsonValue = JSON.stringify(mealFoods);
      await AsyncStorage.setItem("mealFoods", jsonValue);
    } catch (e) {
      Alert.alert("Error", "Failed to save meal data");
    }
  };

  const addFoodToMeal = (food) => {
    const updatedMeals = {
      ...mealFoods,
      [currentMealType]: [...mealFoods[currentMealType], food],
    };
    setMealFoods(updatedMeals);
    calculateNutrition(updatedMeals);
  };

  const removeFoodFromMeal = (mealType, index) => {
    const updatedMeals = { ...mealFoods };
    updatedMeals[mealType].splice(index, 1);
    setMealFoods(updatedMeals);
    calculateNutrition(updatedMeals);
    saveMealFoods();
  };

  const calculateNutrition = (meals) => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    Object.values(meals).forEach((meal) => {
      meal.forEach((food) => {
        // التأكد من وجود الخصائص الغذائية
        totalCalories += Number(food.calories) || 0;
        totalProtein += Number(food.protein) || 0;
        totalCarbs += Number(food.carbs) || 0;
        totalFat += Number(food.fat) || 0;
      });
    });

    setNutrition({
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
    });
  };
  const openModalToAddFood = (mealType) => {
    loadFoods();
    setCurrentMealType(mealType);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.sacc}>
      <View style={styles.container}>
        <View style={styles.fd}>
          <View style={styles.progressContainer}>
            <CircularProgress
              size={160}
              strokeWidth={15}
              progress={
                (nutrition.calories / targetMacros.targetCalories) * 100
              }
              tintColor="#FF0000"
              zIndex={1}
            />
            <CircularProgress
              size={120}
              strokeWidth={15}
              progress={(nutrition.protein / targetMacros.targetProtein) * 100} // Assume `targetProtein` is defined
              tintColor="#00FF00"
              zIndex={2}
            />
            <CircularProgress
              size={80}
              strokeWidth={15}
              progress={(nutrition.carbs / targetMacros.targetCarbs) * 100} // Assume `targetCarbs` is defined
              tintColor="#0000FF"
              zIndex={3}
            />
            <CircularProgress
              size={40}
              strokeWidth={15}
              progress={(nutrition.fat / targetMacros.targetFat) * 100} // Assume `targetFat` is defined
              tintColor="#FFFF00"
              zIndex={4}
            />
          </View>
          <View style={styles.TextContainer}>
          <Text style={styles.Text}>
    Calories: 
    <Text style={{ color: nutrition.calories > targetMacros.targetCalories ? 'red' : 'black' }}>
      {(nutrition.calories || 0).toFixed(2)}
    </Text>
    / {targetMacros.targetCalories} (
    <Text>
      {((nutrition.calories / targetMacros.targetCalories) * 100).toFixed(2)}%
    </Text>
    )
  </Text>
  <Text style={styles.Text}>
    Protein: 
    <Text style={{ color: nutrition.protein > targetProteinGrams ? 'red' : 'black' }}>
      {(nutrition.protein || 0).toFixed(2)}g
    </Text>
    / {((targetMacros.targetCalories * targetMacros.targetProtein) / 400).toFixed(2)}g (
    <Text>
    {targetMacros.targetFat}%
    </Text>
    )
  </Text>
  <Text style={styles.Text}>
    Carbs: 
    <Text style={{ color: nutrition.carbs > targetCarbsGrams ? 'red' : 'black' }}>
      {(nutrition.carbs || 0).toFixed(2)}g
    </Text>
    / {((targetMacros.targetCalories * targetMacros.targetCarbs) / 400).toFixed(2)}g(
    <Text>
    {targetMacros.targetFat}%
    </Text>
    )
  </Text>
  <Text style={styles.Text}>
    Fat: 
    <Text style={{ color: nutrition.fat > targetFatGrams ? 'red' : 'black' }}>
      {(nutrition.fat || 0).toFixed(2)}g
    </Text>
    / {((targetMacros.targetCalories * targetMacros.targetFat) / 900).toFixed(2)}g(
    <Text>
    {targetMacros.targetFat}%
    </Text>
    )
  </Text>
            <TouchableOpacity
              onPress={() => setMacroModalVisible(true)}
              style={styles.macroButton}
            >
              <Text>Set Macro Goals</Text>
            </TouchableOpacity>
          </View>
        </View>
        <MacroGoalsModal
          visible={macroModalVisible}
          onClose={() => setMacroModalVisible(false)}
          calories={targetMacros.targetCalories}
          setCalories={(value) =>
            setTargetMacros({ ...targetMacros, targetCalories: value })
          }
          protein={targetMacros.targetProtein}
          setProtein={(value) =>
            setTargetMacros({ ...targetMacros, targetProtein: value })
          }
          carbs={targetMacros.targetCarbs}
          setCarbs={(value) =>
            setTargetMacros({ ...targetMacros, targetCarbs: value })
          }
          fat={targetMacros.targetFat}
          setFat={(value) =>
            setTargetMacros({ ...targetMacros, targetFat: value })
          }
        />

        <View style={styles.acc}>
          <List.AccordionGroup>
            {["breakfast", "lunch", "dinner", "snacks"].map(
              (mealType, index) => (
                <List.Accordion
                  title={mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                  id={String(index + 1)}
                  key={index}
                  style={styles.acclist}
                  theme={{ colors: { background: "#0059b3" } }}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={mealIcons[mealType]}
                      color="#ffffff"
                    />
                  )}
                  titleStyle={styles.accordionTitle}
                >
                  <TouchableOpacity
                    style={styles.CAddFoodToMenu}
                    onPress={() => openModalToAddFood(mealType)}
                  >
                    <View style={styles.addFoodButtonContent}>
                      <Text style={styles.AddFoodToMenuText}>Add Food ...</Text>

                      <Ionicons
                        name="add-circle-outline"
                        size={25}
                        color="#00ff00"
                      />
                    </View>
                  </TouchableOpacity>
                  {mealFoods[mealType].map((food, idx) => (
                    <View key={idx} style={styles.foodItemContainer}>
                      <Text style={styles.foodItemText}>{food.name}</Text>
                      <TouchableOpacity
                        onPress={() => removeFoodFromMeal(mealType, idx)}
                      >
                        <Text>
                          <Ionicons
                            name="trash-outline"
                            color={"red"}
                            size={25}
                          />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </List.Accordion>
              )
            )}
          </List.AccordionGroup>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            {foods.map((food, index) => (
              <TouchableOpacity
                key={index}
                style={styles.foodItem}
                onPress={() => addFoodToMeal(food)}
              >
                <Text>{food.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ paddingTop: 20 }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003366",
  },
  fd: {
    marginTop: 100,
    width: "95%",
    height: 220,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#0059b3",
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  sacc: {
    width: "100%",
    backgroundColor: "#003366",
  },
  acc: {
    borderWidth: 1,
    borderColor: "#ffffff",
    width: "95%",
    height: "auto",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#444444",
  },
  acclist: {
    borderRadius: 10,
    backgroundColor: "#0059b3",
    color: "#ffffff",
  },
  accitme: {
    width: "100%",
    marginLeft: 10,
    color: "#000",
  },
  accordionTitle: {
    textAlign: "center",
    color: "#fff",
  },
  progressContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 200,
  },
  TextContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 200,
  },
  Text: {
    fontWeight: "bold",
    fontSize: 10,
  },
  circularProgress: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  overlaidProgress: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  addFoodButtonContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  AddFoodToMenuText: {
    marginLeft: 5,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  foodItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E88E5",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  CAddFoodToMenu: {
    backgroundColor: "#1E88E5",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  modalContainer: {
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
    alignSelf: "center",
  },
  foodItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  foodItemText: {
    backgroundColor: "#1E88E5",
    color: "#000",
    borderBottomWidth: 1,
    borderColor: "#ffffff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  macroButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
    marginVertical: 5,
    padding: 10,
  },
});

export default HomeScreen;
