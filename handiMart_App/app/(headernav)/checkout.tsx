import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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


  return (
    <View >
        <Header/>
        <View >
            <TouchableOpacity
                
                onPress={() => router.back()}
            >
                <Text >←</Text>
            </TouchableOpacity>
            <Text >Checkout</Text>
            <IconButton
                icon="magnify"
                size={24}
                onPress={() => console.log("Search pressed")}
            />
        </View>
      <ScrollView >
        {/* Delivery Address Section */}
        <View >
          <Text >Delivery Address</Text>
          <TextInput
            mode="outlined"
            label="Address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Payment Method Section */}
        <View >
          <Text >Payment Method</Text>
          
          <Card  >
            <RadioButton.Group
              onValueChange={(value) => setPaymentMethod(value)}
              value={paymentMethod}
            >
              <View >
                <RadioButton value="card" />
                <Text>Credit/Debit Card</Text>
              </View>
              
              <Divider  />
              
              <View >
                <RadioButton value="cash" />
                <Text>Cash on Delivery</Text>
              </View>
            </RadioButton.Group>
          </Card>

          {paymentMethod === 'card' && (
            <View >
              <TextInput
                mode="outlined"
                label="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={16}
              />
              <View >
                <TextInput
                  mode="outlined"
                  label="Expiry (MM/YY)"
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  maxLength={5}
                />
                <TextInput
                  mode="outlined"
                  label="CVV"
                  value={cardCVV}
                  onChangeText={setCardCVV}
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
              />
            </View>
          )}
        </View>

        {/* Order Summary Section */}
        <View >
          <Text >Order Summary</Text>
          <Card>
            <Card.Content>
              <View >
                <Text>Subtotal</Text>
                <Text >$</Text>
              </View>
              <View>
                <Text >Tax</Text>
                <Text >$</Text>
              </View>
              <View>
                <Text >Delivery Fee</Text>
                <Text >$</Text>
              </View>
              <Divider  />
              <View >
                <Text >Total</Text>
                <Text >$</Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        <Button
          mode="contained"
          disabled={!deliveryAddress || (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVV || !cardName))}
        >
          Place Order
        </Button>
      </ScrollView>
    </View>
  );
}
