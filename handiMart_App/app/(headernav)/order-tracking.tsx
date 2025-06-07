import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  Button,
  ActivityIndicator,
  ProgressBar,
  IconButton,
  useTheme,
} from "react-native-paper";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "../components/header";

export default function OrderTrackingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0.25);
  const [estimatedTime, setEstimatedTime] = useState(30);
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
    orderNumber: {
      color: theme.colors.onSurface,
    },
    stepIcon: {
      active: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.onPrimary,
      },
      completed: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.onPrimary,
      },
      pending: {
        backgroundColor: theme.colors.surfaceVariant,
        color: theme.colors.onSurfaceVariant,
      },
    },
    stepText: {
      active: {
        color: theme.colors.primary,
      },
      completed: {
        color: theme.colors.primary,
      },
      pending: {
        color: theme.colors.onSurfaceVariant,
      },
    },
    stepDescription: {
      color: theme.colors.onSurfaceVariant,
    },
    itemInfo: {
      title: {
        color: theme.colors.onSurface,
      },
      quantity: {
        color: theme.colors.onSurfaceVariant,
      },
    },
  };

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStep < 4) {
        // Advance to next step after some time
        if (estimatedTime <= 0) {
          setCurrentStep((prevStep) => prevStep + 1);
          setProgress((prevProgress) => prevProgress + 0.25);
          setEstimatedTime(
            currentStep === 1 ? 15 : currentStep === 2 ? 20 : 10,
          );
        } else {
          setEstimatedTime((prevTime) => prevTime - 1);
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
      title: "Order Confirmed",
      description: "Your order has been received and confirmed.",
      icon: "check-circle",
      completed: currentStep >= 1,
      active: currentStep === 1,
    },
    {
      id: 2,
      title: "Preparing Order",
      description: "Your items are being prepared and packed.",
      icon: "shopping-bag",
      completed: currentStep >= 2,
      active: currentStep === 2,
    },
    {
      id: 3,
      title: "Out for Delivery",
      description: "Your order is on the way to your location.",
      icon: "local-shipping",
      completed: currentStep >= 3,
      active: currentStep === 3,
    },
    {
      id: 4,
      title: "Delivered",
      description: "Your order has been delivered. Enjoy!",
      icon: "home",
      completed: currentStep >= 4,
      active: currentStep === 4,
    },
  ];

  // Mock order details
  const orderNumber = "HD-" + Math.floor(10000 + Math.random() * 90000);
  const orderItems = [
    { id: "1", name: "Fresh Apples", quantity: 2 },
    { id: "2", name: "Whole Wheat Bread", quantity: 1 },
    { id: "3", name: "Milk (1 Gallon)", quantity: 1 },
  ];

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Header />
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>
          Order Tracking
        </Text>
        <IconButton
          icon="magnify"
          size={24}
          iconColor={theme.colors.onSurface}
          onPress={() => console.log("Search pressed")}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={[styles.trackingCard, dynamicStyles.card]}>
          <Card.Content>
            <Text style={[styles.orderNumber, dynamicStyles.orderNumber]}>
              Order #{orderNumber}
            </Text>

            <View style={styles.progressContainer}>
              <ProgressBar
                progress={progress}
                color={theme.colors.primary}
                style={styles.progressBar}
              />

              <View style={styles.stepStatus}>
                {currentStep < 4 && (
                  <View style={styles.estimatedTimeContainer}>
                    <ActivityIndicator
                      size="small"
                      color={theme.colors.primary}
                      style={styles.loader}
                    />
                    <Text
                      style={[
                        styles.estimatedTimeText,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                    >
                      {estimatedTime} min until next step
                    </Text>
                  </View>
                )}
                <Text
                  style={[styles.statusText, { color: theme.colors.primary }]}
                >
                  {currentStep === 4
                    ? "Delivered!"
                    : `Step ${currentStep} of 4: ${orderSteps[currentStep - 1].title}`}
                </Text>
              </View>
            </View>

            <View style={styles.stepsContainer}>
              {orderSteps.map((step) => (
                <View key={step.id} style={styles.step}>
                  <View
                    style={[
                      styles.stepIcon,
                      step.completed
                        ? [
                            styles.completedStepIcon,
                            dynamicStyles.stepIcon.completed,
                          ]
                        : step.active
                          ? [
                              styles.activeStepIcon,
                              dynamicStyles.stepIcon.active,
                            ]
                          : [
                              styles.pendingStepIcon,
                              dynamicStyles.stepIcon.pending,
                            ],
                    ]}
                  >
                    <MaterialIcons
                      name={step.icon as keyof typeof MaterialIcons.glyphMap}
                      size={24}
                      color={
                        step.completed || step.active
                          ? dynamicStyles.stepIcon.completed.color
                          : dynamicStyles.stepIcon.pending.color
                      }
                    />
                  </View>
                  <View style={styles.stepInfo}>
                    <Text
                      style={[
                        styles.stepTitle,
                        step.completed
                          ? dynamicStyles.stepText.completed
                          : step.active
                            ? dynamicStyles.stepText.active
                            : dynamicStyles.stepText.pending,
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text
                      style={[
                        styles.stepDescription,
                        dynamicStyles.stepDescription,
                      ]}
                    >
                      {step.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.orderSummaryCard, dynamicStyles.card]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, dynamicStyles.orderNumber]}>
              Order Summary
            </Text>
            {orderItems.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={[styles.itemName, dynamicStyles.itemInfo.title]}>
                  {item.name}
                </Text>
                <Text
                  style={[styles.itemQuantity, dynamicStyles.itemInfo.quantity]}
                >
                  x{item.quantity}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.hButton}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={() => router.push("/(tabs)")}
          >
            Home
          </Button>

          {currentStep === 4 && (
            <Button
              mode="outlined"
              style={styles.homeButton}
              textColor={theme.colors.primary}
              onPress={() => router.push("/(tabs)")}
            >
              Return to Home
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
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
  trackingCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  stepStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  estimatedTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loader: {
    marginRight: 8,
  },
  estimatedTimeText: {
    fontSize: 14,
    color: "#666",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4CAF50",
  },
  stepsContainer: {
    marginBottom: 16,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 22,
  },
  stepIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  completedStepIcon: {
    backgroundColor: "#4CAF50",
  },
  activeStepIcon: {
    backgroundColor: "#4CAF50",
  },
  pendingStepIcon: {
    backgroundColor: "#E0E0E0",
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  completedStepText: {
    color: "#4CAF50",
  },
  activeStepText: {
    color: "#4CAF50",
  },
  pendingStepText: {
    color: "#999",
  },
  stepDescription: {
    fontSize: 14,
    color: "#666",
  },
  orderSummaryCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemName: {
    fontSize: 15,
  },
  itemQuantity: {
    fontSize: 15,
    color: "#666",
  },
  buttonContainer: {
    marginTop: 8,
    gap: 12,
  },
  hButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
  },
  homeButton: {
    borderColor: "#4CAF50",
    paddingVertical: 6,
  },
});
