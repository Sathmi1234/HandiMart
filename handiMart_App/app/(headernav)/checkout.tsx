import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, RadioButton, Card, Divider, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Header from '../components/header';

export default function CheckoutScreen() {
  const router = useRouter();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardName, setCardName] = useState('');

  const subtotal = 12.47;
  const tax = 0.87;
  const deliveryFee = 2.99;
  const total = subtotal + tax + deliveryFee;

  return (
    <View style={styles.container}>
              <Header/>
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Checkout</Text>
            <IconButton
                icon="magnify"
                size={24}
                onPress={() => console.log("Search pressed")}
            />
        </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Delivery Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TextInput
            mode="outlined"
            label="Address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            style={styles.input}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <Card style={styles.paymentCard}>
            <RadioButton.Group
              onValueChange={(value) => setPaymentMethod(value)}
              value={paymentMethod}
            >
              <View style={styles.paymentOption}>
                <RadioButton value="card" />
                <Text>Credit/Debit Card</Text>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.paymentOption}>
                <RadioButton value="cash" />
                <Text>Cash on Delivery</Text>
              </View>
            </RadioButton.Group>
          </Card>

          {paymentMethod === 'card' && (
            <View style={styles.cardDetailsContainer}>
              <TextInput
                mode="outlined"
                label="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                style={styles.input}
                keyboardType="numeric"
                maxLength={16}
              />
              <View style={styles.cardRow}>
                <TextInput
                  mode="outlined"
                  label="Expiry (MM/YY)"
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  style={[styles.input, styles.cardRowInput]}
                  maxLength={5}
                />
                <TextInput
                  mode="outlined"
                  label="CVV"
                  value={cardCVV}
                  onChangeText={setCardCVV}
                  style={[styles.input, styles.cardRowInput]}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
              <TextInput
                mode="outlined"
                label="Name on Card"
                value={cardName}
                onChangeText={setCardName}
                style={styles.input}
              />
            </View>
          )}
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        <Button
          mode="contained"
          style={styles.placeOrderButton}
          onPress={() => router.push('/order-confirmation')}
          disabled={!deliveryAddress || (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVV || !cardName))}
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
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    marginRight: 16,
    backgroundColor: '#E6F0FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#065FD4',
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
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  paymentCard: {
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  divider: {
    marginVertical: 8,
  },
  cardDetailsContainer: {
    marginTop: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardRowInput: {
    flex: 1,
    marginRight: 8,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeOrderButton: {
    marginVertical: 20,
    paddingVertical: 8,
  },
});