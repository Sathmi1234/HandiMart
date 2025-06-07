import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Divider, IconButton } from 'react-native-paper';
import Header from '../components/header';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

type NotificationItem = {
    id: number,
    title: string,
    message: string,
    time: string,
    read: boolean,
};

// Sample notification data
const notificationData = [
  {
    id: 1,
    title: 'New Promotion',
    message: 'Check out our new discount on grocery items!',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    title: 'Order Status',
    message: 'Your order #12345 has been delivered successfully.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 3,
    title: 'Limited Time Offer',
    message: '25% off on all electronics this weekend!',
    time: '2 days ago',
    read: true,
  },
  {
    id: 4,
    title: 'Payment Successful',
    message: 'Your payment of $45.99 was processed successfully.',
    time: '3 days ago',
    read: true,
  },
];

export default function NotificationScreen() {
  const renderItem = ({ item }: { item: NotificationItem }) => (
    <Card style={[styles.card, !item.read && styles.unreadCard]}>
      <Card.Content>
        <View style={styles.notificationHeader}>
          <Title style={styles.title}>{item.title}</Title>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Paragraph style={styles.message}>{item.message}</Paragraph>
      </Card.Content>
      <Divider />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <IconButton
          icon="magnify"
          size={24}
          onPress={() => console.log("Search pressed")}
        />
      </View>
      <View style={styles.content}>
        {notificationData.length > 0 ? (
          <FlatList
            data={notificationData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
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
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});