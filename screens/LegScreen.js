import React, { useState, useRef } from "react";
import {
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-paper";
import { Video } from "expo-av";
import Ionicons from "react-native-vector-icons/Ionicons";

const exercises = [
  {
    name: "Leg extension",
    gif: require("./workoutvid/Leg/legextension.gif"),
    video: require("./workoutvid/Leg/legextension.mp4"),
    description: "Improve your quadriceps strength.",
  },
  {
    name: "Barbell squat",
    gif: require("./workoutvid/Leg/barbellsquat.gif"),
    description: "Essential for building lower body strength.",
  },
  {
    name: "Leg curl",
    gif: require("./workoutvid/Leg/legcurl.gif"),
    description: "Targets your hamstring muscles.",
  },
  {
    name: "Leg press",
    gif: require("./workoutvid/Leg/legpress.gif"),
    description: "Focuses on quads, hamstrings, and glutes.",
  },
  {
    name: "Calves",
    gif: require("./workoutvid/Leg/calves.gif"),
    description: "Strengthens the calf muscles.",
  },
  {
    name: "Back extension",
    gif: require("./workoutvid/Leg/backextension.gif"),
    description: "Improves lower back strength.",
  },
];

const LegScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    const status = await videoRef.current.getStatusAsync();
    if (status.isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  const handleRewind = async () => {
    const status = await videoRef.current.getStatusAsync();
    videoRef.current.setPositionAsync(
      Math.max(0, status.positionMillis - 10000)
    );
  };

  const handleFastForward = async () => {
    const status = await videoRef.current.getStatusAsync();
    videoRef.current.setPositionAsync(status.positionMillis + 10000);
  };
  const openModalWithExercise = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {exercises.map((exercise, index) => (
          <TouchableOpacity
            key={index}
            style={styles.w100}
            onPress={() => openModalWithExercise(exercise)}
          >
            <Card style={styles.Card}>
              <View style={styles.hb}>
                <View style={styles.w50}>
                  <Text style={styles.CardT} variant="titleLarge">
                    {exercise.name}
                  </Text>
                </View>
                <Image style={styles.CardP} source={exercise.gif} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        <Modal
          animationType="fade"
          transparent={true}
          visible={videoModalVisible}
          onRequestClose={() => setVideoModalVisible(false)}
        >
          <View style={styles.videoModalOverlay}>
            <View style={styles.videoModalView}>
            <Text style={styles.modalTitle} variant="titleLarge">
                {selectedExercise?.name}
              </Text>

              <Video
                ref={videoRef}
                source={selectedExercise?.video}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                isLooping
                style={styles.video}
                onPlaybackStatusUpdate={(status) =>
                  setIsPlaying(status.isPlaying)
                }
              />
              <View style={styles.controlButtonsContainer}>
                <TouchableOpacity
                  onPress={handleRewind}
                  style={styles.controlButton}
                >
                  <Text style={styles.ffffff}>
                    <Ionicons name="play-back" color={"#ffffff"} size={25} />
                    {"\n"}
                    10s
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={togglePlayback}
                  style={styles.controlButton}
                >
                  <View style={{ alignItems: "center" }}>
                    <Ionicons
                      name={isPlaying ? "pause" : "play"}
                      color={"#ffffff"}
                      size={25}
                    />
                    <Text style={styles.ffffff}>{isPlaying ? "Pause" : "Play"}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleFastForward}
                  style={styles.controlButton}
                >
                  <Text style={styles.ffffff}>
                    <Ionicons name="play-forward" color={"#ffffff"} size={25} />
                    {"\n"}
                    10s
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.closeVideoButton}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true); // أولاً، نغلق مودال الصورة إذا كان مفتوحاً
                    setVideoModalVisible(false); // ثم نفتح مودال الفيديو
                  }}
                >
                  <Text style={styles.closeVideoButtonText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false); // أولاً، نغلق مودال الصورة إذا كان مفتوحاً
                    setVideoModalVisible(false); // ثم نفتح مودال الفيديو
                  }}
                >
                  <Text style={styles.closeAllButtonText}>Close All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle} variant="titleLarge">
                {selectedExercise?.name}
              </Text>
              <Image style={styles.modalImage} source={selectedExercise?.gif} />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false); // أولاً، نغلق مودال الصورة إذا كان مفتوحاً
                  setVideoModalVisible(true); // ثم نفتح مودال الفيديو
                }}
                style={styles.videoButton}
              >
                <Text style={styles.videoButtonText}>Open Video</Text>
              </TouchableOpacity>

              <Text style={styles.modalDescription}>
                {selectedExercise?.description}
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LegScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003366",
    flex: 1,
  },
  scrollViewContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  Card: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#0059b3",
    marginVertical: 5,
    padding: 5,
  },
  CardT: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  CardP: {
    borderRadius: 5,
    height: 100,
    width: "50%",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  w100: {
    width: "100%",
    marginVertical: 5,
    padding: 5,
  },
  w50: {
    width: "50%",
  },
  hb: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#s000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 40,
  },
  modalImage: {
    width: 400,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  modalDescription: {
    textAlign: "center",
    marginVertical: 20,
  },
  videoButton: {
    marginTop: 20,
    backgroundColor: "#0066cc",
    padding: 10,
    borderRadius: 5,
  },
  videoButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  videoModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  videoModalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  video: {
    width: "100%",
    height: 230,
  },
  closeVideoButton: {
    flexDirection: "row",
    marginTop: 20,
    padding: 10,
  },
  closeVideoButtonText: {
    padding: 10,
    backgroundColor: "gray",
    color: "#ffffff",
    fontWeight: "bold",
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  closeAllButtonText: {
    backgroundColor: "#cc0000",
    color: "#ffffff",
    fontWeight: "bold",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  controlButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: "100%",
  },
  controlButton: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  ffffff: {
    color: "#ffffff",
  },
});
