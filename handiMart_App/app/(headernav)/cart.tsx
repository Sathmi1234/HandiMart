import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Card,
  Button,
  Divider,
  IconButton,
  useTheme,
} from "react-native-paper";
import Header from "../components/header";
import { Feather } from "@expo/vector-icons";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// Mock data for cart items - in a real app, this would come from state management or local storage
const initialCartItems = [
  {
    id: 1,
    name: "Dreamecatcher",
    price: 4.99,
    quantity: 2,
    image: "icon.png",
  },
  {
    id: 2,
    name: "Painting",
    price: 3.49,
    quantity: 1,
    image: "icon.png",
  },
  {
    id: 3,
    name: "Ornament",
    price: 3.99,
    quantity: 1,
    image: "icon.png",
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [subTotal, setSubTotal] = useState(0);
  const tax = subTotal * 0.07; // 7% tax rate
  const deliveryFee = 2.99;
  const total = subTotal + tax + deliveryFee;
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
    cardStyle: {
      backgroundColor: theme.colors.elevation.level1,
    },
    itemName: {
      color: theme.colors.onSurface,
    },
    itemPrice: {
      color: theme.colors.onSurfaceVariant,
    },
    summaryText: {
      color: theme.colors.onSurfaceVariant,
    },
    totalText: {
      color: theme.colors.onSurface,
    },
  };

  useEffect(() => {
    // Calculate subtotal whenever cart items change
    const newSubTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setSubTotal(newSubTotal);
  }, [cartItems]);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: number) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => {
            setCartItems((prevItems) =>
              prevItems.filter((item) => item.id !== id),
            );
          },
          style: "destructive",
        },
      ],
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <Card style={[styles.cartItem, dynamicStyles.cardStyle]}>
      <Card.Content style={styles.cartItemContent}>
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, dynamicStyles.itemName]}>
            {item.name}
          </Text>
          <Text style={[styles.itemPrice, dynamicStyles.itemPrice]}>
            ${item.price.toFixed(2)}
          </Text>
        </View>

        <View style={styles.quantityContainer}>
          <IconButton
            icon="minus"
            size={20}
            iconColor={theme.colors.onSurface}
            onPress={() => handleQuantityChange(item.id, -1)}
            disabled={item.quantity <= 1}
          />
          <Text style={dynamicStyles.itemName}>{item.quantity}</Text>
          <IconButton
            icon="plus"
            size={20}
            iconColor={theme.colors.onSurface}
            onPress={() => handleQuantityChange(item.id, 1)}
          />
          <IconButton
            icon="delete"
            size={20}
            iconColor={theme.colors.error}
            onPress={() => removeItem(item.id)}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Header />
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>
          My Cart
        </Text>
        <IconButton
          icon="magnify"
          size={24}
          iconColor={theme.colors.onSurface}
          onPress={() => console.log("Search pressed")}
        />
      </View>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />

          <View style={[styles.summaryContainer, dynamicStyles.cardStyle]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, dynamicStyles.summaryText]}>
                Subtotal
              </Text>
              <Text style={[styles.summaryValue, dynamicStyles.summaryText]}>
                ${subTotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, dynamicStyles.summaryText]}>
                Tax (7%)
              </Text>
              <Text style={[styles.summaryValue, dynamicStyles.summaryText]}>
                ${tax.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, dynamicStyles.summaryText]}>
                Delivery Fee
              </Text>
              <Text style={[styles.summaryValue, dynamicStyles.summaryText]}>
                ${deliveryFee.toFixed(2)}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, dynamicStyles.totalText]}>
                Total
              </Text>
              <Text style={[styles.totalValue, dynamicStyles.totalText]}>
                ${total.toFixed(2)}
              </Text>
            </View>

            <Button
              mode="contained"
              style={styles.checkoutButton}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
              onPress={() => router.push("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Button
            mode="contained"
            style={styles.shopButton}
            onPress={() => router.push("/")}
          >
            Continue Shopping
          </Button>
        </View>
      )}
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
  cartList: {
    padding: 16,
  },
  cartItem: {
    marginBottom: 12,
    elevation: 2,
  },
  cartItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: "center",
  },
  summaryContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
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
  divider: {
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
  shopButton: {
    paddingVertical: 8,
    marginTop: 12,
  },
});
