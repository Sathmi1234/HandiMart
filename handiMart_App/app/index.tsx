import { useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}></View>
      <View style={styles.bottomSection}>
        <Button 
          mode="contained-tonal" 
          icon="cart" 
          style={styles.btn}
          onPress={()=> router.push("/(tabs)/")}
        >
          I'm Here to Buy
        </Button>
        <Button
          mode="contained-tonal"
          icon="brush"
          style={styles.btn}
          onPress={() => router.push("/(auth)/sign_in")}
        >
          I'm Here to Sell
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    margin: 10,
    width: "80%",
  },
});