import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Card, Divider, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/header';
import { TouchableOpacity } from 'react-native';

export default function OrderConfirmationScreen() {
  const router = useRouter();

  return (
    <View >
      <Header/>
      <View >
        <TouchableOpacity
          onPress={() => router.back()}
        >
        <Text >←</Text>
        </TouchableOpacity>
          <Text >Order Confirmation</Text>
          <IconButton
            icon="magnify"
            size={24}
            onPress={() => console.log("Search pressed")}
          />
      </View>  
      <ScrollView >
        <View >
          <View >
            <MaterialCommunityIcons name="check-circle" size={80} color="#4CAF50" />
          </View>
          <Text >Order Placed Successfully!</Text>
          <Text >
            Thank you for your order. We'll deliver your items shortly.
          </Text>
        </View>

        <Card >
          <Card.Content>
            <Text >Order Details</Text>
            <View >
              <Text >Order Number:</Text>
              <Text ></Text>
            </View>
            <View >
              <Text >Order Date:</Text>
              <Text ></Text>
            </View>
            <View >
              <Text >Estimated Delivery:</Text>
              <Text >Today, </Text>
            </View>
            <View >
              <Text >Payment Method:</Text>
              <Text >Credit Card</Text>
            </View>
          </Card.Content>
        </Card>

        <Card >
          <Card.Content>
            <Text >Order Items</Text>
            
            {orderItems.map((item) => (
              <View key={item.id}>
                <View >
                  <View >
                    <Text >{item.name}</Text>
                    <Text >Qty: {item.quantity}</Text>
                  </View>
                  <Text >${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
                <Divider  />
              </View>
            ))}
            
            <View >
              <View >
                <Text >Subtotal</Text>
                <Text >$</Text>
              </View>
              <View >
                <Text >Tax</Text>
                <Text >$</Text>
              </View>
              <View >
                <Text >Delivery Fee</Text>
                <Text >$</Text>
              </View>
              <Divider  />
              <View >
                <Text >Total</Text>
                <Text >$</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <View >
          <Button
            mode="contained"
            onPress={() => router.push('/')}
          >
            Track Order
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => router.push('/')}
          >
            Continue Shopping
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
