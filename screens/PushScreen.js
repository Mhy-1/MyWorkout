import React from "react";
import { StyleSheet, View, Text } from "react-native";

const PushScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Pull bbbb Screen</Text>
    </View>
  );
};

export default PushScreen; // تأكد من استخدام export default هنا
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2b2b2b",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
