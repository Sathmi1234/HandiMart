import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { useRouter } from 'expo-router';
import { Feather } from "@expo/vector-icons";

export default function OrderHistoryScreen() {
  const router = useRouter();

    type OrderItem = {
    name: string;
    quantity: number;
    price: number;
  };

  type Order = {
    id: string;
    date: string;
    status: string;
    total: number;
    items: OrderItem[];
    image: string;
  };

  // Mock order data
  const [orders] = useState([
    {
      id: "ORD-001",
      date: "2024-05-15",
      status: "Delivered",
      total: 89.99,
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 59.99 },
        { name: "Phone Case", quantity: 2, price: 15.00 }
      ],
      image: "https://via.placeholder.com/60"
    },
    {
      id: "ORD-002",
      date: "2024-05-10",
      status: "Delivered",
      total: 149.99,
      items: [
        { name: "Bluetooth Speaker", quantity: 1, price: 149.99 }
      ],
      image: "https://via.placeholder.com/60"
    },
    {
      id: "ORD-003",
      date: "2024-04-28",
      status: "Cancelled",
      total: 299.99,
      items: [
        { name: "Smart Watch", quantity: 1, price: 299.99 }
      ],
      image: "https://via.placeholder.com/60"
    },
    {
      id: "ORD-004",
      date: "2024-04-15",
      status: "Delivered",
      total: 45.50,
      items: [
        { name: "USB Cable", quantity: 3, price: 12.99 },
        { name: "Screen Protector", quantity: 1, price: 9.99 }
      ],
      image: "https://via.placeholder.com/60"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#28a745';
      case 'processing':
        return '#ffc107';
      case 'shipped':
        return '#17a2b8';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order {item.id}</Text>
          <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.orderContent}>
        <Image source={{ uri: item.image }} style={styles.orderImage} />
        <View style={styles.orderDetails}>
          <Text style={styles.itemCount}>
            {item.items.length} item{item.items.length > 1 ? 's' : ''}
          </Text>
          <Text style={styles.mainItem}>{item.items[0].name}</Text>
          {item.items.length > 1 && (
            <Text style={styles.additionalItems}>
              +{item.items.length - 1} more item{item.items.length > 2 ? 's' : ''}
            </Text>
          )}
        </View>
        <View style={styles.orderTotal}>
          <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.orderActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        {item.status.toLowerCase() === 'delivered' && (
          <TouchableOpacity style={[styles.actionButton, styles.reorderButton]}>
            <Text style={[styles.actionButtonText, styles.reorderButtonText]}>Reorder</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: "#4a90e2",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  orderContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  orderDetails: {
    flex: 1,
  },
  itemCount: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  mainItem: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  additionalItems: {
    fontSize: 14,
    color: "#666",
  },
  orderTotal: {
    alignItems: "flex-end",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  actionButtonText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
  },
  reorderButton: {
    backgroundColor: "#4a90e2",
    borderColor: "#4a90e2",
  },
  reorderButtonText: {
    color: "#fff",
  },
});