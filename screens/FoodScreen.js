import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const FoodScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [viewFoodsModal, setViewFoodsModal] = useState(false); // حالة لتحكم ظهور مودال عرض الأطعمة
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodDescription, setNewFoodDescription] = useState("");
  const [newFoodCalories, setNewFoodCalories] = useState("");
  const [newFoodFat, setNewFoodFat] = useState("");
  const [newFoodCarbs, setNewFoodCarbs] = useState("");
  const [newFoodProtein, setNewFoodProtein] = useState("");
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [visibleMenuIndex, setVisibleMenuIndex] = React.useState(null);

  const openMenu = (index) => setVisibleMenuIndex(index);
  const closeMenu = () => setVisibleMenuIndex(null);

  const validateInput = () => {
    let isValid = true;

    // التحقق من صحة الاسم
    if (!newFoodName.trim()) {
      Alert.alert("خطأ في الإدخال", "الرجاء إدخال اسم الطعام");
      isValid = false;
    }
    // التحقق من صحة السعرات الحرارية
    else if (
      !newFoodCalories.trim() ||
      isNaN(newFoodCalories) ||
      parseInt(newFoodCalories) <= 0
    ) {
      Alert.alert("خطأ في الإدخال", "الرجاء إدخال قيمة صحيحة للسعرات الحرارية");
      isValid = false;
    }
    // التحقق من صحة البروتين
    else if (
      !newFoodProtein.trim() ||
      isNaN(newFoodProtein) ||
      parseInt(newFoodProtein) < 0
    ) {
      Alert.alert("خطأ في الإدخال", "الرجاء إدخال قيمة صحيحة للبروتين");
      isValid = false;
    }
    // التحقق من صحة الكاربوهيدرات
    else if (
      !newFoodCarbs.trim() ||
      isNaN(newFoodCarbs) ||
      parseInt(newFoodCarbs) < 0
    ) {
      Alert.alert("خطأ في الإدخال", "الرجاء إدخال قيمة صحيحة للكاربوهيدرات");
      isValid = false;
    }
    // التحقق من صحة الدهون
    else if (
      !newFoodFat.trim() ||
      isNaN(newFoodFat) ||
      parseInt(newFoodFat) < 0
    ) {
      Alert.alert("خطأ في الإدخال", "الرجاء إدخال قيمة صحيحة للدهون");
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const viewFoodDetails = (foods) => {
    setSelectedFood(foods); // حفظ الوجبة المختارة في الحالة
    setViewFoodsModal(true); // فتح المودال
  };

  const loadFoods = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("foods");
      setFoods(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      Alert.alert("Error", "Failed to load the food data");
    }
  };

  const storeFoods = async (foods) => {
    try {
      const jsonValue = JSON.stringify(foods);
      await AsyncStorage.setItem("foods", jsonValue);
    } catch (e) {
      Alert.alert("Error", "Failed to save the food data");
    }
  };

  const addFood = async () => {
    if (validateInput()) {
      const newFood = {
        name: newFoodName,
        description: newFoodDescription,
        calories: newFoodCalories,
        Protein: newFoodProtein,
        Fat: newFoodFat,
        Carbs: newFoodCarbs,
      };

      const updatedFoods = [...foods, newFood];
      await storeFoods(updatedFoods);
      setFoods(updatedFoods);
      setNewFoodName("");
      setNewFoodDescription("");
      setNewFoodCalories("");
      setNewFoodProtein("");
      setNewFoodFat("");
      setNewFoodCarbs("");
      setModalVisible(false);
    }
  };

  const deleteFood = async (index) => {
    const updatedFoods = [...foods];
    updatedFoods.splice(index, 1);
    await storeFoods(updatedFoods);
    setFoods(updatedFoods);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>قائمة الطعام</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.addButton}
            >
              <Ionicons name="add-circle-outline" color={"white"} size={40} />
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={viewFoodsModal}
            onRequestClose={() => setViewFoodsModal(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {selectedFood && ( // تأكد من وجود وجبة مختارة قبل العرض
                  <>
                    <View style={styles.titleShow}>
                      <Text style={styles.ttitleShow}> Name :</Text>
                    </View>
                    <View style={styles.cboredr}>
                      <Text style={styles.nameShow}>{selectedFood.name}</Text>
                    </View>
                    <View style={styles.titleShow}>
                      <Text style={styles.ttitleShow}> Description :</Text>
                    </View>
                    <View style={styles.cboredr}>
                      <Text style={styles.DisShow}>
                        {selectedFood.description}
                      </Text>
                    </View>
                    <View style={styles.row2c1}>
                      <View style={styles.row2c2}>
                        <View style={styles.titleShow}>
                          <Text style={styles.ttitleShow}> Calories :</Text>
                        </View>
                        <View style={styles.chboredr}>
                          <Text style={styles.otherShow}>
                            {selectedFood.calories} g
                          </Text>
                        </View>
                      </View>
                      <View style={styles.row2c2}>
                        <View style={styles.titleShow}>
                          <Text style={styles.ttitleShow}> Protein :</Text>
                        </View>
                        <View style={styles.chboredr}>
                          <Text style={styles.otherShow}>
                            {selectedFood.Protein} g
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.row2c1}>
                      <View style={styles.row2c2}>
                        <View style={styles.titleShow}>
                          <Text style={styles.ttitleShow}> Carbs :</Text>
                        </View>
                        <View style={styles.chboredr}>
                          <Text style={styles.otherShow}>
                            {selectedFood.Carbs} g
                          </Text>
                        </View>
                      </View>
                      <View style={styles.row2c2}>
                        <View style={styles.titleShow}>
                          <Text style={styles.ttitleShow}> Fat :</Text>
                        </View>
                        <View style={styles.chboredr}>
                          <Text style={styles.otherShow}>
                            {selectedFood.Fat} g
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                <TouchableOpacity
                  onPress={() => setViewFoodsModal(false)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.ttitleShow}>إغلاق</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {foods.map((food, index) => (
            <View key={index} style={styles.item}>
              <TouchableOpacity
                onPress={() => viewFoodDetails(food)} // استدعاء viewFoodDetails مع الوجبة المختارة
                style={styles.ShowButton}
              >
                <View style={styles.citemText}>
                  <Text style={styles.itemText}> {food.name}</Text>
                </View>
              </TouchableOpacity>

              <View>
                <Menu
                  visible={visibleMenuIndex === index}
                  onDismiss={closeMenu}
                  anchor={
                    <TouchableOpacity
                      onPress={() => openMenu(index)}
                      style={styles.MButton}
                    >
                      <Ionicons
                        name="settings-outline"
                        color={"black"}
                        size={30}
                      />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      deleteFood(index); // استدعاء دالة الحذف
                      closeMenu(); // إغلاق القائمة
                    }}
                    title="حذف الطعام"
                  />
                  <Menu.Item onPress={() => {}} title=" تعديل الطعام " />
                  <Divider />
                </Menu>
              </View>
            </View>
          ))}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => {
                    // عرض تنبيه يسأل المستخدم إذا كان يرغب في إلغاء الإضافة
                    Alert.alert(
                      "إلغاء الإضافة",
                      "هل أنت متأكد أنك تريد إلغاء إضافة الطعام؟",
                      [
                        {
                          text: "تراجع",
                          onPress: () => console.log("تراجع عن الإلغاء"),
                          style: "cancel",
                        },
                        {
                          text: "نعم",
                          onPress: () => {
                            console.log("إلغاء الإضافة");
                            setModalVisible(false); // إغلاق المودال
                            // إعادة تصفير الحقول إذا لزم الأمر
                            setNewFoodName("");
                            setNewFoodDescription("");
                            setNewFoodCalories("");
                            setNewFoodProtein("");
                            setNewFoodCarbs("");
                            setNewFoodFat("");
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  style={{ alignSelf: "flex-end" }} // ضبط الزر في الجزء العلوي الأيمن من المودال
                >
                  <MaterialCommunityIcons
                    name="close"
                    color={"blue"}
                    size={30}
                  />
                </TouchableOpacity>

                <View style={styles.row}>
                  <TextInput
                    placeholder="Food Name"
                    placeholderTextColor="#777777"
                    backgroundColor="#f0f0f0"
                    style={styles.inputN}
                    value={newFoodName}
                    onChangeText={setNewFoodName}
                    returnKeyType="done"
                  />
                </View>

                <View style={styles.row}>
                  <TextInput
                    placeholder="Food Description"
                    placeholderTextColor="#777777"
                    backgroundColor="#f0f0f0"
                    style={styles.inputD}
                    value={newFoodDescription}
                    onChangeText={setNewFoodDescription}
                    textAlignVertical="top" // جعل النص يبدأ من أعلى
                    textAlign="left" // محاذاة النص لليسار
                    multiline={true} // السماح بأكثر من سطر
                  />
                </View>

                <View style={styles.row2}>
                  <TextInput
                    placeholder="Calories"
                    placeholderTextColor="#777777"
                    backgroundColor="#f0f0f0"
                    style={styles.input}
                    value={newFoodCalories}
                    onChangeText={setNewFoodCalories}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                  <TextInput
                    placeholder="Protein"
                    placeholderTextColor="#777777"
                    backgroundColor="#f0f0f0"
                    style={styles.input}
                    value={newFoodProtein}
                    onChangeText={setNewFoodProtein}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>

                <View style={styles.row2}>
                  <TextInput
                    placeholder="Carbs"
                    placeholderTextColor="#777777"
                    backgroundColor="#f0f0f0"
                    style={styles.input}
                    value={newFoodCarbs}
                    onChangeText={setNewFoodCarbs}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                  <TextInput
                    placeholder="Fat"
                    placeholderTextColor="#777777"
                    backgroundColor="#f0f0f0"
                    style={styles.input}
                    value={newFoodFat}
                    onChangeText={setNewFoodFat}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>

                <TouchableOpacity style={styles.addFood} onPress={addFood}>
                  <Text>اضافة الطعام</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </PaperProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003366",
  },
  scrollView: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row", // ترتيب العناصر أفقيًا
    justifyContent: "space-between", // توزيع المسافة بين العناصر
    alignItems: "center", // محاذاة العناصر في الوسط عموديًا
    paddingVertical: 10, // الهامش الجانبي للحاوية
    paddingTop: 5, // الهامش العلوي للحاوية
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
  },
  title: {
    width: "85%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  addButton: {
    width: "15%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addFood: {
    position: "absolute", // جعل موضع الزر ثابت
    bottom: 20, // المسافة من الأسفل
    backgroundColor: "#5cb85c", // لون الخلفية للزر
    padding: 15, // التبطين
    borderRadius: 25, // تقريب الزوايا
    justifyContent: "center", // محاذاة المحتويات بالوسط عموديًا
    alignItems: "center", // محاذاة المحتويات بالوسط أفقيًا
    alignSelf: "center", // لضمان التوسيط أفقيًا
    width: "90%", // عرض الزر
  },
  item: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  citemText: {
    justifyContent: "center", //Centered vertically
    alignItems: "center", //Centered horizontally
    flex: 1,
    height: "100%",
    width: "100%",
  },
  deleteButton: {
    position: "absolute", // جعل موضع الزر ثابت
    bottom: 20, // المسافة من الأسفل
    backgroundColor: "#455A64", // لون الخلفية للزر
    padding: 15, // التبطين
    borderRadius: 25, // تقريب الزوايا
    justifyContent: "center", // محاذاة المحتويات بالوسط عموديًا
    alignItems: "center", // محاذاة المحتويات بالوسط أفقيًا
    alignSelf: "center", // لضمان التوسيط أفقيًا
    width: "90%", // عرض الزر
  },
  closeButton: {
    backgroundColor: "gray",
  },
  ShowButton: {
    borderRadius: 5,
    height: "100%",
    width: "80%",
  },
  MButton: {
    padding: 10,
    marginLeft: 5,
    marginRight: 5,

    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    height: "70%",
    margin: 20,
    backgroundColor: "#1565C0",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    width: "40%",
    marginBottom: 20,
    padding: 10,
    borderRadius: 25,
  },
  inputN: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 25,
  },
  inputD: {
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    textAlignVertical: "top", // محاذاة النص للأعلى
    textAlign: "left", // محاذاة النص لليسار
  },
  row: {
    flexDirection: "row", // ترتيب العناصر في صف
    justifyContent: "space-evenly", // توزيع المسافة بين العناصر بالتساوي
    width: "100%", // تأكد من أن الصف يأخذ عرض الوالد كاملًا
    marginBottom: 10, // إضافة هامش أسفل الصف
    padding: 20,
  },

  row2: {
    flexDirection: "row", // ترتيب العناصر في صف
    justifyContent: "space-around", // توزيع المسافة بين العناصر بالتساوي
    width: "100%", // تأكد من أن الصف يأخذ عرض الوالد كاملًا
    marginBottom: 10, // إضافة هامش أسفل الصف
  },
  row2c1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",

  },
  row2c2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,

  },
  rowsd: {
    flexDirection: "row", // ترتيب العناصر في صف
  },
  titleShow: {
    flexDirection: "row", // ترتيب العناصر في صف
    width: "100%", // تأكد من أن الصف يأخذ عرض الوالد كاملًا
    height:"auto",
    marginBottom: 10, // إضافة هامش أسفل الصف
    marginLeft: 20,
    fontWeight:"bold",
  },  ttitleShow: {
    color:"#F5F5F5",
    fontSize:15,
    fontWeight:"bold",
  },
  cboredr: {
    backgroundColor: "#197ae6",
    borderWidth: 1,
    borderRadius: 20,
    width: "70%",
    marginBottom: 20,
    borderColor:"#F5F5F5",

  },
  chboredr: {
    backgroundColor: "#197ae6",
    borderWidth: 1,
    borderRadius: 20,
    width: "70%",
    marginBottom: 20,
    borderColor:"#F5F5F5",

  },
  nameShow: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    color:"#F5F5F5",

  },
  DisShow: {
    height: 80,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    overflow: "visible",
    color:"#F5F5F5",

  },
  otherShow: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    color:"#F5F5F5",

  },
});

export default FoodScreen;
