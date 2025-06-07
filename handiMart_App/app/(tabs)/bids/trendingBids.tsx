import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Text, Card, Avatar, Chip, IconButton, Divider } from "react-native-paper";
import { useState } from "react";

type BidItem = {
  id: number;
  title: string;
  image: string;
  description: string;
  currentBid: number;
  startingBid?: number;
  bidCount: number;
  timeLeft: string;
  watchers: number;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  categories: string[];
}

export default function TrendingBids() {
  const router = useRouter();
  
  // Sample data for Trending Bids section - expanded with more details
  const [trendingBids, setTrendingBids] = useState([
    {
      id: 101,
      title: 'Limited Edition Sneakers',
      image: 'shoe-heel',
      description: 'Limited edition collectible sneakers, size 10, never worn, original box',
      currentBid: 340,
      startingBid: 150,
      bidCount: 24,
      timeLeft: '2 days 8 hours',
      watchers: 56,
      seller: {
        name: 'SneakerCollector',
        rating: 4.9,
        verified: true
      },
      categories: ['Fashion', 'Shoes', 'Limited Edition']
    },
    {
      id: 102,
      title: 'Smartphone Latest Model',
      image: 'cellphone',
      description: 'Latest flagship smartphone, 256GB storage, factory sealed in box',
      currentBid: 550,
      startingBid: 400,
      bidCount: 18,
      timeLeft: '3 days 12 hours',
      watchers: 42,
      seller: {
        name: 'TechStore',
        rating: 4.8,
        verified: true
      },
      categories: ['Electronics', 'Smartphones']
    },
    {
      id: 103,
      title: 'Drone with Camera',
      image: 'drone',
      description: '4K camera drone with 30min flight time, obstacle avoidance and follow mode',
      currentBid: 230,
      startingBid: 150,
      bidCount: 15,
      timeLeft: '1 day 4 hours',
      watchers: 38,
      seller: {
        name: 'DroneEnthusiast',
        rating: 4.7,
        verified: false
      },
      categories: ['Electronics', 'Drones', 'Photography']
    },
    {
      id: 104,
      title: 'Vintage Record Player',
      image: 'record-player',
      description: 'Classic turntable from the 70s, fully restored and in working condition',
      currentBid: 175,
      startingBid: 100,
      bidCount: 12,
      timeLeft: '5 hours 30 min',
      watchers: 27,
      seller: {
        name: 'VinylCollector',
        rating: 4.9,
        verified: true
      },
      categories: ['Electronics', 'Vintage', 'Music']
    },
    {
      id: 105,
      title: 'Designer Handbag',
      image: 'bag-personal',
      description: 'Authentic designer handbag, barely used, includes dust bag and authentication card',
      currentBid: 430,
      startingBid: 300,
      bidCount: 20,
      timeLeft: '2 days 14 hours',
      watchers: 45,
      seller: {
        name: 'LuxuryFinds',
        rating: 4.8,
        verified: true
      },
      categories: ['Fashion', 'Accessories', 'Designer']
    },
    {
      id: 106,
      title: 'Professional Camera Kit',
      image: 'camera',
      description: 'DSLR camera with multiple lenses, tripod, and carrying case',
      currentBid: 850,
      startingBid: 600,
      bidCount: 14,
      timeLeft: '4 days 6 hours',
      watchers: 32,
      seller: {
        name: 'PhotoPro',
        rating: 5.0,
        verified: true
      },
      categories: ['Electronics', 'Photography', 'Professional']
    },
  ]);

  // Filter options
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const categories = ['All', 'Electronics', 'Fashion', 'Vintage', 'Designer', 'Photography'];

  const filteredBids = trendingBids.filter(bid => {
    if (categoryFilter === 'All') return true;
    return bid.categories.includes(categoryFilter);
  });

  // Sort options
  const [sortMethod, setSortMethod] = useState('popular'); // 'popular', 'ending', 'highBid'

  const sortedBids = [...filteredBids].sort((a, b) => {
    switch (sortMethod) {
      case 'popular':
        return b.watchers - a.watchers;
      case 'ending':
        // This is a simplified sort - in real app you'd parse the timeLeft properly
        return a.timeLeft.localeCompare(b.timeLeft);
      case 'highBid':
        return b.currentBid - a.currentBid;
      default:
        return 0;
    }
  });

  // Handler for navigating to individual bid details
  const handleBidPress = (bidId: number) => {
    router.push({
      pathname: "/(tabs)/bids/[id]",
      params: { id: String(bidId)},
    });
  };

  // Render a bid item
  const renderBidItem = ({ item } : {item:BidItem}) => (
    <Card 
      style={styles.bidCard}
      onPress={() => handleBidPress(item.id)}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <Avatar.Icon size={40} icon={item.image} style={styles.cardIcon} />
          <View style={styles.titleContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>{item.seller.name}</Text>
              {item.seller.verified && (
                <IconButton icon="check-circle" size={16} style={styles.verifiedIcon} />
              )}
              <Text style={styles.sellerRating}>⭐ {item.seller.rating}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.bidDetails}>
          <View>
            <Text style={styles.currentBidLabel}>Current Bid</Text>
            <Text style={styles.currentBidValue}>${item.currentBid}</Text>
            <Text style={styles.bidCount}>{item.bidCount} bids</Text>
          </View>
          
          <View style={styles.watcherContainer}>
            <IconButton icon="eye" size={16} style={styles.watcherIcon} />
            <Text style={styles.watcherCount}>{item.watchers}</Text>
          </View>
        </View>
        
        <View style={styles.bottomRow}>
          <View style={styles.timeContainer}>
            <IconButton icon="clock-outline" size={16} style={styles.timeIcon} />
            <Text style={styles.timeLeft}>{item.timeLeft}</Text>
          </View>
          
          <TouchableOpacity style={styles.bidButton}>
            <Text style={styles.bidButtonText}>Bid Now</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoryContainer}>
          {item.categories.slice(0, 2).map((category, index) => (
            <Chip key={index} style={styles.categoryChip} textStyle={styles.categoryText}>
              {category}
            </Chip>
          ))}
          {item.categories.length > 2 && (
            <Chip style={styles.categoryChip} textStyle={styles.categoryText}>
              +{item.categories.length - 2}
            </Chip>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trending Bids</Text>
        <IconButton 
          icon="magnify" 
          size={24} 
          onPress={() => console.log('Search pressed')}
        />
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryFilterContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.categoryFilterChip,
              categoryFilter === category && styles.activeCategoryFilterChip
            ]}
            onPress={() => setCategoryFilter(category)}
          >
            <Text 
              style={[
                styles.categoryFilterText,
                categoryFilter === category && styles.activeCategoryFilterText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity 
          style={[styles.sortOption, sortMethod === 'popular' && styles.activeSortOption]}
          onPress={() => setSortMethod('popular')}
        >
          <Text style={sortMethod === 'popular' ? styles.activeSortText : styles.sortText}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sortOption, sortMethod === 'ending' && styles.activeSortOption]}
          onPress={() => setSortMethod('ending')}
        >
          <Text style={sortMethod === 'ending' ? styles.activeSortText : styles.sortText}>Ending Soon</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sortOption, sortMethod === 'highBid' && styles.activeSortOption]}
          onPress={() => setSortMethod('highBid')}
        >
          <Text style={sortMethod === 'highBid' ? styles.activeSortText : styles.sortText}>Highest Bid</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bid List */}
      <FlatList
        data={sortedBids}
        renderItem={renderBidItem}
        keyExtractor={item => item.id.toString()}
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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  categoryFilterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  categoryFilterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    height: 32,
    backgroundColor: '#f0f0f0',
  },
  activeCategoryFilterChip: {
    backgroundColor: '#2196F3',
  },
  categoryFilterText: {
    color: '#757575',
  },
  activeCategoryFilterText: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sortLabel: {
    marginRight: 10,
    color: '#757575',
  },
  sortOption: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  activeSortOption: {
    backgroundColor: '#e3f2fd',
  },
  sortText: {
    color: '#757575',
    fontSize: 12,
  },
  activeSortText: {
    color: '#2196F3',
    fontSize: 12,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  bidCard: {
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    backgroundColor: '#e0e0e0',
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  sellerName: {
    fontSize: 12,
    color: '#757575',
  },
  verifiedIcon: {
    margin: 0,
    marginHorizontal: 2,
  },
  sellerRating: {
    fontSize: 12,
    color: '#757575',
  },
  description: {
    color: '#757575',
    marginBottom: 12,
  },
  bidDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  currentBidLabel: {
    fontSize: 12,
    color: '#757575',
  },
  currentBidValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bidCount: {
    fontSize: 12,
    color: '#757575',
  },
  watcherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watcherIcon: {
    margin: 0,
  },
  watcherCount: {
    fontSize: 14,
    color: '#757575',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    margin: 0,
    marginRight: 4,
  },
  timeLeft: {
    color: '#757575',
    fontSize: 13,
  },
  bidButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  bidButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryChip: {
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  categoryText: {
    fontSize: 12,
  },
});

// Don't forget to import ScrollView at the top
import { ScrollView } from 'react-native';
import { Feather } from "@expo/vector-icons";
