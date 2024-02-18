// // import React from "react";
// import * as React from "react";
// import { Card, Text } from "react-native-paper";
// import {
//   Image,
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// const PullScreen = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.container}>
//           {/* card1 */}
//           <TouchableOpacity style={styles.w100}>
//             <Card style={styles.Card}>
//               <View style={styles.hb}>
//                 <View style={styles.w50}>
//                   <Text style={styles.CardT} variant="titleLarge">
//                     Leg extension
//                   </Text>
//                 </View>

//                 <Image
//                   style={styles.CardP}
//                   source={require("./workoutvid/LegExtension.gif")}
//                 />
//               </View>
//             </Card>
//           </TouchableOpacity>

//           {/* card2 */}
//           <TouchableOpacity style={styles.w100}>
//             <Card style={styles.Card}>
//               <View style={styles.hb}>
//                 <View style={styles.w50}>
//                   <Text style={styles.CardT} variant="titleLarge">
//                     Barbell squat
//                   </Text>
//                 </View>

//                 <Image
//                   style={styles.CardP}
//                   source={require("./workoutvid/3.gif")}
//                 />
//               </View>
//             </Card>
//           </TouchableOpacity>

//           {/* card3 */}
//           <TouchableOpacity style={styles.w100}>
//             <Card style={styles.Card}>
//               <View style={styles.hb}>
//                 <View style={styles.w50}>
//                   <Text style={styles.CardT} variant="titleLarge">
//                     Leg curl
//                   </Text>
//                 </View>

//                 <Image
//                   style={styles.CardP}
//                   source={require("./workoutvid/2.gif")}
//                 />
//               </View>
//             </Card>
//           </TouchableOpacity>

//           {/* card4 */}
//           <TouchableOpacity style={styles.w100}>
//             <Card style={styles.Card}>
//               <View style={styles.hb}>
//                 <View style={styles.w50}>
//                   <Text style={styles.CardT} variant="titleLarge">
//                     Leg press
//                   </Text>
//                 </View>

//                 <Image
//                   style={styles.CardP}
//                   source={require("./workoutvid/4.gif")}
//                 />
//               </View>
//             </Card>
//           </TouchableOpacity>

//           {/* card5 */}
//           <TouchableOpacity style={styles.w100}>
//             <Card style={styles.Card}>
//               <View style={styles.hb}>
//                 <View style={styles.w50}>
//                   <Text style={styles.CardT} variant="titleLarge">
//                     calves
//                   </Text>
//                 </View>

//                 <Image
//                   style={styles.CardP}
//                   source={require("./workoutvid/5.gif")}
//                 />
//               </View>
//             </Card>
//           </TouchableOpacity>

//           {/* card6 */}
//           <TouchableOpacity style={styles.w100}>
//             <Card style={styles.Card}>
//               <View style={styles.hb}>
//                 <View style={styles.w50}>
//                   <Text style={styles.CardT} variant="titleLarge">
//                     Back extension
//                   </Text>
//                 </View>

//                 <Image
//                   style={styles.CardP}
//                   source={require("./workoutvid/6.gif")}
//                 />
//               </View>
//             </Card>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default PullScreen;
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#003366",
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   Card: {
//     width: "100%",
//     flexDirection: "row",
//     borderRadius: 5,
//     backgroundColor: "#0059b3",
//   },
//   CardBTN: {
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//   },
//   CardT: {
//     textAlign: "center",
//     width: "100%",
//     color: "#ffffff",
//     alignSelf: "stretch",
//   },
//   CardP: {
//     borderRadius: 5,
//     height: 100,
//     width: "49.5%",
//     marginVertical: 5,
//     resizeMode: "cover",
//     backgroundColor: "#ffffff",
//   },
//   w100: {
//     width: "100%",
//     marginVertical: 5,
//     padding: 5,
//   },
//   w50: {
//     width: "50%",
//   },
//   hb: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
// });
