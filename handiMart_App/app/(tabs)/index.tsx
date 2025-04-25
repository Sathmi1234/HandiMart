import React from "react";
import { ScrollView, View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Appbar, Card, TouchableRipple } from "react-native-paper";
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get("window");
const cardWidth = width * 0.45;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <Image 
            source={require('../../assets/images/home/bird.jpg')} 
            style={styles.birdImage}
          />
          <Text style={styles.newArrivalsText}>New Arrivals</Text>
        </View>

        <View style={styles.categoriesGrid}>
          <TouchableRipple 
            style={[styles.categoryCard, styles.summerCard]} 
            onPress={() => console.log("Summer sale pressed")}
          >
            <View>
              <Image 
                source={require('../../assets/images/home/summer.jpeg')} 
                style={styles.categoryImage}
              />
              <Text style={styles.categoryTitle}>Summer sale</Text>
            </View>
          </TouchableRipple>
          <View style={styles.categoryRow}>
            <TouchableRipple 
              style={[styles.categoryCard, styles.smallCard]} 
              onPress={() => console.log("Flowers pressed")}
            >
              <View>
                <Image 
                  source={require('../../assets/images/home/flowers.jpeg')} 
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryTitle}>Flowers</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple 
              style={[styles.categoryCard, styles.smallCard]} 
              onPress={() => console.log("Dreamcatchers pressed")}
            >
              <View>
                <Image 
                  source={require('../../assets/images/home/dreamcatcher.jpeg')} 
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryTitle}>Dreamcatchers</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  logo: {
    width: 80,
    height: 30,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    position: "relative",
  },
  birdImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  newArrivalsText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  categoriesGrid: {
    padding: 10,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  categoryCard: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  summerCard: {
    height: 150,
    width: "100%",
  },
  smallCard: {
    height: 200,
    width: cardWidth,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryTitle: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
});