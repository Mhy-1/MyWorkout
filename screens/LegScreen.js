import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LegScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Leg Screen</Text>
    </View>
  );
};
export default LegScreen; // تأكد من استخدام export default هنا
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2b2b2b",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
