import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Card, Avatar, IconButton, Badge } from "react-native-paper";
import { useState } from "react";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

export default function BidScreen() {
  const router = useRouter();
  
  // Sample data for Your Bids section
  const [yourBids, setYourBids] = useState([
    {
      id: '1',
      title: 'Vintage Camera',
      image: 'camera',
      currentBid: 120,
      yourBid: 125,
      timeLeft: '2 days',
      status: 'winning',
    },
    {
      id: '2',
      title: 'Gaming Console',
      image: 'gamepad',
      currentBid: 210,
      yourBid: 205,
      timeLeft: '4 hours',
      status: 'outbid',
    },
    {
      id: '3',
      title: 'Leather Jacket',
      image: 'hanger',
      currentBid: 85,
      yourBid: 95,
      timeLeft: '1 day',
      status: 'winning',
    },
    {
      id: '4',
      title: 'Mechanical Keyboard',
      image: 'keyboard',
      currentBid: 75,
      yourBid: 72,
      timeLeft: '12 hours',
      status: 'outbid',
    },
  ]);

  // Sample data for Trending Bids section
  const [trendingBids, setTrendingBids] = useState([
    {
      id: '101',
      title: 'Limited Edition Sneakers',
      image: 'shoe-heel',
      currentBid: 340,
      bidCount: 24,
      timeLeft: '2 days',
      watchers: 56,
    },
    {
      id: '102',
      title: 'Smartphone Latest Model',
      image: 'cellphone',
      currentBid: 550,
      bidCount: 18,
      timeLeft: '3 days',
      watchers: 42,
    },
    {
      id: '103',
      title: 'Drone with Camera',
      image: 'drone',
      currentBid: 230,
      bidCount: 15,
      timeLeft: '1 day',
      watchers: 38,
    },
    {
      id: '104',
      title: 'Vintage Record Player',
      image: 'record-player',
      currentBid: 175,
      bidCount: 12,
      timeLeft: '5 hours',
      watchers: 27,
    },
  ]);

  // Handler for navigating to individual bid details
  const handleBidPress = (bidId: Int32, section) => {
    router.push({
      pathname: `/bids/${bidId}`,
      params: { section }
    });
  };

  const getStatusColor = (status) => {
    return status === 'winning' ? '#4CAF50' : '#F44336';
  };

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
        <Text style={styles.headerTitle}>Inbox</Text>
        <IconButton 
          icon="magnify" 
          size={24} 
          onPress={() => console.log('Search pressed')}
        />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Your Bids Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Bids</Text>
          <TouchableOpacity onPress={() => router.push('/your-bids')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {yourBids.map(bid => (
            <Card 
              key={bid.id} 
              style={styles.bidCard}
              onPress={() => handleBidPress(bid.id, 'your-bids')}
            >
              <Card.Content style={styles.cardContent}>
                <Avatar.Icon size={40} icon={bid.image} style={styles.cardIcon} />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle}>{bid.title}</Text>
                  <View style={styles.bidInfo}>
                    <Text>Current: ${bid.currentBid}</Text>
                    <Text>Your Bid: ${bid.yourBid}</Text>
                  </View>
                  <View style={styles.bidStatus}>
                    <Text style={styles.timeLeft}>{bid.timeLeft} left</Text>
                    <Badge style={[styles.statusBadge, { backgroundColor: getStatusColor(bid.status) }]}>
                      {bid.status.toUpperCase()}
                    </Badge>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        {/* Trending Bids Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Bids</Text>
          <TouchableOpacity onPress={() => router.push('/trending-bids')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {trendingBids.map(bid => (
            <Card 
              key={bid.id} 
              style={styles.bidCard}
              onPress={() => handleBidPress(bid.id, 'trending-bids')}
            >
              <Card.Content style={styles.cardContent}>
                <Avatar.Icon size={40} icon={bid.image} style={styles.cardIcon} />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle}>{bid.title}</Text>
                  <View style={styles.bidInfo}>
                    <Text>Current Bid: ${bid.currentBid}</Text>
                    <Text>{bid.bidCount} bids</Text>
                  </View>
                  <View style={styles.bidStatus}>
                    <Text style={styles.timeLeft}>{bid.timeLeft} left</Text>
                    <Text style={styles.watchers}>{bid.watchers} watching</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#2196F3',
    fontSize: 14,
  },
  scrollView: {
    maxHeight: 280,
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  bidCard: {
    marginBottom: 10,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    backgroundColor: '#e0e0e0',
  },
  cardDetails: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bidInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  bidStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLeft: {
    color: '#757575',
    fontSize: 13,
  },
  watchers: {
    color: '#757575',
    fontSize: 13,
  },
  statusBadge: {
    fontSize: 12,
  }
});