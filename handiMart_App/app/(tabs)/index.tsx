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
    <View>
      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image 
            source={require('../../assets/images/home/bird.jpg')}
          />
          <Text>New Arrivals</Text>
        </View>

        <View >
          <TouchableRipple
            onPress={() => console.log("Summer sale pressed")}
          >
            <View>
              <Image 
                source={require('../../assets/images/home/summer.jpeg')}
              />
              <Text>Summer sale</Text>
            </View>
          </TouchableRipple>

          <View>
            <TouchableRipple
              onPress={() => console.log("Flowers pressed")}
            >
              <View>
                <Image 
                  source={require('../../assets/images/home/flowers.jpeg')}
                />
                <Text>Flowers</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple 
              onPress={() => console.log("Dreamcatchers pressed")}
            >
              <View>
                <Image 
                  source={require('../../assets/images/home/dreamcatcher.jpeg')} 
                />
                <Text>Dreamcatchers</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
