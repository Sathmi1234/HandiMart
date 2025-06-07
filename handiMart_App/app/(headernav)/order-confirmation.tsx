import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  Button,
  Card,
  Divider,
  IconButton,
  useTheme,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/header";
import { TouchableOpacity } from "react-native";

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const theme = useTheme();

  const dynamicStyles = {
    container: {
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.elevation.level2,
    },
    headerTitle: {
      color: theme.colors.onSurface,
    },
    card: {
      backgroundColor: theme.colors.elevation.level1,
    },
    text: {
      color: theme.colors.onSurface,
    },
    secondaryText: {
      color: theme.colors.onSurfaceVariant,
    },
    successTitle: {
      color: theme.colors.primary,
    },
  };

  const orderNumber = "HD-" + Math.floor(10000 + Math.random() * 90000);
  const orderDate = new Date().toLocaleDateString();
  const estimatedDelivery = new Date(
    Date.now() + 45 * 60000,
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const orderItems = [
    { id: "1", name: "Fresh Apples", quantity: 2, price: 4.99 },
    { id: "2", name: "Whole Wheat Bread", quantity: 1, price: 3.49 },
    { id: "3", name: "Milk (1 Gallon)", quantity: 1, price: 3.99 },
  ];

  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.07;
  const deliveryFee = 2.99;
  const total = subtotal + tax + deliveryFee;

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Header />
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>
          Order Confirmation
        </Text>
        <IconButton
          icon="magnify"
          size={24}
          iconColor={theme.colors.onSurface}
          onPress={() => console.log("Search pressed")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <MaterialCommunityIcons
              name="check-circle"
              size={80}
              color={theme.colors.primary}
            />
          </View>
          <Text style={[styles.successTitle, dynamicStyles.successTitle]}>
            Order Placed Successfully!
          </Text>
          <Text style={[styles.successText, dynamicStyles.secondaryText]}>
            Thank you for your order. We'll deliver your items shortly.
          </Text>
        </View>

        <Card style={styles.orderDetailsCard}>
          <Card.Content>
            <Text style={[styles.sectionTitle, dynamicStyles.headerTitle]}>
              Order Details
            </Text>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>
                Order Number:
              </Text>
              <Text style={[styles.detailValue, dynamicStyles.text]}>
                {orderNumber}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>
                Order Date:
              </Text>
              <Text style={[styles.detailValue, dynamicStyles.text]}>
                {orderDate}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, dynamicStyles.secondaryText]}>
                Estimated Delivery:
              </Text>
              <Text style={[styles.detailValue, dynamicStyles.text]}>
                Today, {estimatedDelivery}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method:</Text>
              <Text style={styles.detailValue}>Credit Card</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.itemsCard}>
          <Card.Content>
            <Text style={[styles.sectionTitle, dynamicStyles.headerTitle]}>
              Order Items
            </Text>

            {orderItems.map((item) => (
              <View key={item.id}>
                <View style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemName, dynamicStyles.secondaryText]}>{item.name}</Text>
                    <Text style={[styles.itemQuantity, dynamicStyles.text]}>
                      Qty: {item.quantity}
                    </Text>
                  </View>
                  <Text style={[styles.itemPrice, dynamicStyles.text]}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
                <Divider style={styles.divider} />
              </View>
            ))}

            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={[styles.itemQuantity, dynamicStyles.secondaryText]}>Subtotal</Text>
                <Text style={[styles.summaryValue, dynamicStyles.text]}>
                  ${subtotal.toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, dynamicStyles.secondaryText]}>Tax</Text>
                <Text style={[styles.summaryValue, dynamicStyles.text]}>
                  ${tax.toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, dynamicStyles.secondaryText]}>Delivery Fee</Text>
                <Text style={[styles.summaryValue, dynamicStyles.text]}>
                  ${deliveryFee.toFixed(2)}
                </Text>
              </View>
              <Divider style={styles.totalDivider} />
              <View style={styles.summaryRow}>
                <Text style={[styles.totalLabel, dynamicStyles.text]}>Total</Text>
                <Text style={[styles.totalValue, dynamicStyles.text]}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            style={styles.button}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={() => router.push("/order-tracking")}
          >
            Track Order
          </Button>

          <Button
            mode="outlined"
            style={styles.button}
            textColor={theme.colors.primary}
            onPress={() => router.push("/(tabs)")}
          >
            Continue Shopping
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: "#fff",
    elevation: 2,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  successContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  successText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  orderDetailsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemsCard: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "500",
  },
  divider: {
    marginVertical: 4,
  },
  totalDivider: {
    marginVertical: 8,
  },
  summaryContainer: {
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actionsContainer: {
    marginVertical: 16,
  },
  button: {
    marginBottom: 12,
    paddingVertical: 6,
  },
});
