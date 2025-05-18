import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, ActivityIndicator, ProgressBar, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/header';

export default function OrderTrackingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0.25);
  const [estimatedTime, setEstimatedTime] = useState(30);

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStep < 4) {
        // Advance to next step after some time
        if (estimatedTime <= 0) {
          setCurrentStep(prevStep => prevStep + 1);
          setProgress(prevProgress => prevProgress + 0.25);
          setEstimatedTime(currentStep === 1 ? 15 : currentStep === 2 ? 20 : 10);
        } else {
          setEstimatedTime(prevTime => prevTime - 1);
        }
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep, estimatedTime]);

  const orderSteps = [
    {
      id: 1,
      title: 'Order Confirmed',
      description: 'Your order has been received and confirmed.',
      icon: 'check-circle',
      completed: currentStep >= 1,
      active: currentStep === 1,
    },
    {
      id: 2,
      title: 'Preparing Order',
      description: 'Your items are being prepared and packed.',
      icon: 'shopping-bag',
      completed: currentStep >= 2,
      active: currentStep === 2,
    },
    {
      id: 3,
      title: 'Out for Delivery',
      description: 'Your order is on the way to your location.',
      icon: 'local-shipping',
      completed: currentStep >= 3,
      active: currentStep === 3,
    },
    {
      id: 4,
      title: 'Delivered',
      description: 'Your order has been delivered. Enjoy!',
      icon: 'home',
      completed: currentStep >= 4,
      active: currentStep === 4,
    },
  ];

  // Mock order details
  const orderNumber = "HD-" + Math.floor(10000 + Math.random() * 90000);
  const orderItems = [
    { id: '1', name: 'Fresh Apples', quantity: 2 },
    { id: '2', name: 'Whole Wheat Bread', quantity: 1 },
    { id: '3', name: 'Milk (1 Gallon)', quantity: 1 },
  ];

  return (
    <View >
        <Header/>
        <View >
            <TouchableOpacity
                onPress={() => router.back()}
            >
                <Text >←</Text>
            </TouchableOpacity>
            <Text >Order Tracking</Text>
            <IconButton
                icon="magnify"
                size={24}
                onPress={() => console.log("Search pressed")}
            />
        </View>

      <ScrollView >
        <Card >
          <Card.Content>
            <Text >Order #{orderNumber}</Text>
            
            <View >
              <ProgressBar progress={progress} color="#4CAF50"  />
              
              <View >
                {currentStep < 4 && (
                  <View >
                    <ActivityIndicator size="small" color="#4CAF50"  />
                    <Text >
                      {estimatedTime} min until next step
                    </Text>
                  </View>
                )}
                <Text >
                  {currentStep === 4 
                    ? 'Delivered!' 
                    : `Step ${currentStep} of 4: ${orderSteps[currentStep - 1].title}`}
                </Text>
              </View>
            </View>

            <View >
              {orderSteps.map((step) => (
                <View key={step.id} >
                    <MaterialIcons
                      name={step.icon}
                      size={24}
                      color={step.completed || step.active ? '#fff' : '#999'}
                    />
                  <View >
                      {step.title}
                    </Text>
                    <Text >{step.description}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card >
          <Card.Content>
            <Text >Order Summary</Text>
            {orderItems.map((item) => (
              <View key={item.id} >
                <Text >{item.name}</Text>
                <Text >x{item.quantity}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        <View >
          <Button 
            mode="contained" 
            onPress={() => router.push('/(tabs)')}
          >
            Home
          </Button>
          
          {currentStep === 4 && (
            <Button
              mode="outlined"
              onPress={() => router.push('/(tabs)')}
            >
              Return to Home
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
}