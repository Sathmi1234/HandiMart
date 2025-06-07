import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  TextInput,
  Button,
  RadioButton,
  Card,
  Divider,
  IconButton,
  useTheme,
} from "react-native-paper";
import { useRouter } from "expo-router";
import Header from "../components/header";
import { Feather } from "@expo/vector-icons";

export default function CheckoutScreen() {
  const router = useRouter();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardName, setCardName] = useState("");
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
    input: {
      backgroundColor: theme.colors.surface,
    },
  };

  const subtotal = 12.47;
  const tax = 0.87;
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
          Checkout
        </Text>
        <IconButton
          icon="magnify"
          size={24}
          iconColor={theme.colors.onSurface}
          onPress={() => console.log("Search pressed")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Delivery Address Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>
            Delivery Address
          </Text>
          <TextInput
            mode="outlined"
            label="Address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            style={[styles.input, dynamicStyles.input]}
            multiline
            numberOfLines={3}
            theme={{
              colors: {
                primary: theme.colors.primary,
                onSurface: theme.colors.onSurface,
                background: theme.colors.background,
              },
            }}
          />
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>
            Payment Method
          </Text>

          <Card style={[styles.paymentCard, dynamicStyles.card]}>
            <RadioButton.Group
              onValueChange={(value) => setPaymentMethod(value)}
              value={paymentMethod}
            >
              <View style={styles.paymentOption}>
                <RadioButton.Android
                  value="card"
                  color={theme.colors.primary}
                />
                <Text style={dynamicStyles.text}>Credit/Debit Card</Text>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.paymentOption}>
                <RadioButton.Android
                  value="cash"
                  color={theme.colors.primary}
                />
                <Text style={dynamicStyles.text}>Cash on Delivery</Text>
              </View>
            </RadioButton.Group>
          </Card>

          {paymentMethod === "card" && (
            <View style={styles.cardDetailsContainer}>
              <TextInput
                mode="outlined"
                label="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                style={[styles.input, dynamicStyles.input]}
                keyboardType="numeric"
                maxLength={16}
                theme={{
                  colors: {
                    primary: theme.colors.primary,
                    onSurface: theme.colors.onSurface,
                    background: theme.colors.background,
                  },
                }}
              />
              <View style={styles.cardRow}>
                <TextInput
                  mode="outlined"
                  label="Expiry (MM/YY)"
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  style={[
                    styles.input,
                    styles.cardRowInput,
                    dynamicStyles.input,
                  ]}
                  maxLength={5}
                  theme={{
                    colors: {
                      primary: theme.colors.primary,
                      onSurface: theme.colors.onSurface,
                      background: theme.colors.background,
                    },
                  }}
                />
                <TextInput
                  mode="outlined"
                  label="CVV"
                  value={cardCVV}
                  onChangeText={setCardCVV}
                  style={[
                    styles.input,
                    styles.cardRowInput,
                    dynamicStyles.input,
                  ]}
                  keyboardType="numeric"
                  maxLength={3}
                  theme={{
                    colors: {
                      primary: theme.colors.primary,
                      onSurface: theme.colors.onSurface,
                      background: theme.colors.background,
                    },
                  }}
                  secureTextEntry
                />
              </View>
              <TextInput
                mode="outlined"
                label="Name on Card"
                value={cardName}
                onChangeText={setCardName}
                style={[styles.input, dynamicStyles.input]}
                theme={{
                  colors: {
                    primary: theme.colors.primary,
                    onSurface: theme.colors.onSurface,
                    background: theme.colors.background,
                  },
                }}
              />
            </View>
          )}
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>
            Order Summary
          </Text>
          <Card style={[styles.summaryCard, dynamicStyles.card]}>
            <Card.Content>
              <View style={styles.summaryRow}>
                <Text
                  style={[styles.summaryLabel, dynamicStyles.secondaryText]}
                >
                  Subtotal
                </Text>
                <Text style={[styles.summaryValue, dynamicStyles.text]}>
                  ${subtotal.toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text
                  style={[styles.summaryLabel, dynamicStyles.secondaryText]}
                >
                  Tax
                </Text>
                <Text style={[styles.summaryValue, dynamicStyles.text]}>
                  ${tax.toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text
                  style={[styles.summaryLabel, dynamicStyles.secondaryText]}
                >
                  Delivery Fee
                </Text>
                <Text style={[styles.summaryValue, dynamicStyles.text]}>
                  ${deliveryFee.toFixed(2)}
                </Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={[styles.totalLabel, dynamicStyles.text]}>
                  Total
                </Text>
                <Text style={[styles.totalValue, dynamicStyles.text]}>
                  ${total.toFixed(2)}
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        <Button
          mode="contained"
          style={styles.placeOrderButton}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          onPress={() => router.push("/order-confirmation")}
          disabled={
            !deliveryAddress ||
            (paymentMethod === "card" &&
              (!cardNumber || !cardExpiry || !cardCVV || !cardName))
          }
        >
          Place Order
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  paymentCard: {
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  divider: {
    marginVertical: 8,
  },
  cardDetailsContainer: {
    marginTop: 16,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardRowInput: {
    flex: 1,
    marginRight: 8,
  },
  summaryCard: {
    marginBottom: 16,
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
  placeOrderButton: {
    marginVertical: 20,
    paddingVertical: 8,
  },
});
