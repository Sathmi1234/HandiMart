import { useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Button, ActivityIndicator, useTheme } from "react-native-paper";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const DISABLE_FIRST_TIME_CHECK = true; // Set to false to re-enable

export default function Index() {
  const router = useRouter();
  const theme = useTheme();
  const { isFirstTime, isLoading, setFirstTimeComplete, isAuthenticated, isSeller } = useAuth();

  // TEMPORARILY DISABLED FOR TESTING
  // useEffect(() => {
  //   if (!DISABLE_FIRST_TIME_CHECK && !isLoading) {
  //     if (!isFirstTime && isAuthenticated) {
  //       if (isSeller) {
  //         router.replace("/seller");
  //       } else {
  //         router.replace("/(tabs)");
  //       }
  //     } 
  //     else if (!isFirstTime && !isAuthenticated) {
  //       router.replace("/(tabs)");
  //     }
  //   }
  // }, [isLoading, isFirstTime, isAuthenticated, isSeller]);

  const handleBuyerRoute = async () => {
    // await setFirstTimeComplete();
    router.push("/(tabs)");
  };

  const handleSellerRoute = async () => {
    // await setFirstTimeComplete();
    router.push("/(auth)/sign_in");
  };

  const dynamicStyles = {
    container: {
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.colors.onBackground,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
    },
    buyerNote: {
      color: theme.colors.onSurfaceVariant,
    },
    sellerNote: {
      color: theme.colors.onSurfaceVariant,
    },
    loadingText: {
      color: theme.colors.onBackground,
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, dynamicStyles.container]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, dynamicStyles.loadingText]}>Loading...</Text>
      </View>
    );
  }

  // TEMPORARILY DISABLED FOR TESTING
  // if (!DISABLE_FIRST_TIME_CHECK && !isFirstTime) {
  //   return null; 
  // }

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.topSection}>
        <Text style={[styles.title, dynamicStyles.title]}>Welcome to HandiMart</Text>
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
          Choose how you'd like to get started
        </Text>
      </View>
      <View style={styles.bottomSection}>
        <Button 
          mode="contained-tonal" 
          icon="cart" 
          style={styles.btn}
          onPress={handleBuyerRoute}
        >
          I'm Here to Buy
        </Button>
        <Text style={[styles.buyerNote, dynamicStyles.buyerNote]}>
          Browse and shop without registration
        </Text>
        
        <Button
          mode="contained-tonal"
          icon="brush"
          style={[styles.btn, styles.sellerBtn]}
          onPress={handleSellerRoute}
        >
          I'm Here to Sell
        </Button>
        <Text style={[styles.sellerNote, dynamicStyles.sellerNote]}>
          Registration required to start selling
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  bottomSection: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  btn: {
    margin: 10,
    width: "80%",
  },
  sellerBtn: {
    marginTop: 20,
  },
  buyerNote: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  sellerNote: {
    fontSize: 12,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});
