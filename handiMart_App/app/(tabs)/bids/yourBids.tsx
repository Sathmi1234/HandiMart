import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Text, Card, Avatar, Badge, Divider, IconButton } from "react-native-paper";
import { useState } from "react";

export default function YourBids() {
  const router = useRouter();
  
  // Sample data for Your Bids section - expanded with more details
  const [yourBids, setYourBids] = useState([
    {
      id: '1',
      title: 'Vintage Camera',
      image: 'camera',
      description: 'Vintage film camera in excellent condition, includes original leather case',
      currentBid: 120,
      yourBid: 125,
      timeLeft: '2 days 5 hours',
      status: 'winning',
      bidHistory: [
        { amount: 125, time: '2 days ago', isYou: true },
        { amount: 120, time: '3 days ago', isYou: false },
        { amount: 115, time: '3 days ago', isYou: true },
        { amount: 110, time: '4 days ago', isYou: false },
      ]
    },
    {
      id: '2',
      title: 'Gaming Console',
      image: 'gamepad',
      description: 'Latest gaming console with two controllers and three games included',
      currentBid: 210,
      yourBid: 205,
      timeLeft: '4 hours 23 min',
      status: 'outbid',
      bidHistory: [
        { amount: 210, time: '6 hours ago', isYou: false },
        { amount: 205, time: '8 hours ago', isYou: true },
        { amount: 190, time: '12 hours ago', isYou: false },
      ]
    },
    {
      id: '3',
      title: 'Leather Jacket',
      image: 'hanger',
      description: 'Genuine leather jacket, size M, barely worn, excellent condition',
      currentBid: 85,
      yourBid: 95,
      timeLeft: '1 day 12 hours',
      status: 'winning',
      bidHistory: [
        { amount: 95, time: '5 days ago', isYou: true },
        { amount: 85, time: '6 days ago', isYou: false },
      ]
    },
    {
      id: '4',
      title: 'Mechanical Keyboard',
      image: 'keyboard',
      description: 'Mechanical keyboard with Cherry MX switches, RGB lighting, like new',
      currentBid: 75,
      yourBid: 72,
      timeLeft: '12 hours 45 min',
      status: 'outbid',
      bidHistory: [
        { amount: 75, time: '2 days ago', isYou: false },
        { amount: 72, time: '3 days ago', isYou: true },
        { amount: 68, time: '4 days ago', isYou: false },
      ]
    },
    {
      id: '5',
      title: 'Wireless Earbuds',
      image: 'headphones',
      description: '24 hour battery life, noise cancelling, water resistant',
      currentBid: 45,
      yourBid: 50,
      timeLeft: '3 days 8 hours',
      status: 'winning',
      bidHistory: [
        { amount: 50, time: '1 day ago', isYou: true },
        { amount: 45, time: '2 days ago', isYou: false },
      ]
    },
  ]);

  // Filter options
  const [filter, setFilter] = useState('all'); // 'all', 'winning', 'outbid'

  const filteredBids = yourBids.filter(bid => {
    if (filter === 'all') return true;
    return bid.status === filter;
  });

  const getStatusColor = (status: String) => {
    return status === 'winning' ? '#4CAF50' : '#F44336';
  };

  // Handler for navigating to individual bid details
  const handleBidPress = (bidId) => {
    router.push({
      pathname: `/(tabs)/bids/${bidId}`,
    });
  };

  // Render a bid item
  const renderBidItem = ({ item }) => (
    <Card 
      style={styles.bidCard}
      onPress={() => handleBidPress(item.id)}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <Avatar.Icon size={36} icon={item.image} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <Badge 
            style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}
          >
            {item.status.toUpperCase()}
          </Badge>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.bidDetails}>
          <View style={styles.bidInfo}>
            <Text style={styles.infoLabel}>Current Bid:</Text>
            <Text style={styles.infoValue}>${item.currentBid}</Text>
          </View>
          <View style={styles.bidInfo}>
            <Text style={styles.infoLabel}>Your Bid:</Text>
            <Text style={[styles.infoValue, { color: item.yourBid > item.currentBid ? '#4CAF50' : '#F44336' }]}>
              ${item.yourBid}
            </Text>
          </View>
        </View>
        
        <View style={styles.timeContainer}>
          <IconButton icon="clock-outline" size={16} style={styles.timeIcon} />
          <Text style={styles.timeLeft}>{item.timeLeft} remaining</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Bids</Text>
        <IconButton 
          icon="filter-variant" 
          size={24} 
          onPress={() => console.log('Filter pressed')}
        />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'all' && styles.activeFilterTab]} 
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'winning' && styles.activeFilterTab]} 
          onPress={() => setFilter('winning')}
        >
          <Text style={[styles.filterText, filter === 'winning' && styles.activeFilterText]}>Winning</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'outbid' && styles.activeFilterTab]} 
          onPress={() => setFilter('outbid')}
        >
          <Text style={[styles.filterText, filter === 'outbid' && styles.activeFilterText]}>Outbid</Text>
        </TouchableOpacity>
      </View>

      {/* Bid List */}
      <FlatList
        data={filteredBids}
        renderItem={renderBidItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilterTab: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    color: '#757575',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
  },
  bidCard: {
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    backgroundColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statusBadge: {
    fontSize: 10,
  },
  description: {
    color: '#757575',
    marginBottom: 12,
  },
  bidDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  bidInfo: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#757575',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timeIcon: {
    margin: 0,
    marginRight: 4,
  },
  timeLeft: {
    color: '#757575',
    fontSize: 13,
  },
});