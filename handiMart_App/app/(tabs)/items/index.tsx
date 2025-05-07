import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {
  Text,
  Card,
  Avatar,
  IconButton,
  Badge,
  Chip,
} from "react-native-paper";
import { useState } from "react";

export default function ItemsScreen() {
  const router = useRouter();

  // Sample data for Bid Items section
  const [bidItems, setBidItems] = useState([
    {
      id: 1,
      title: "Vintage Camera",
      image: "camera",
      currentBid: 120,
      minBid: 125,
      timeLeft: "2 days",
      bidCount: 12,
      condition: "Used - Good",
    },
    {
      id: 2,
      title: "Gaming Console",
      image: "gamepad",
      currentBid: 210,
      minBid: 215,
      timeLeft: "4 hours",
      bidCount: 24,
      condition: "Used - Like New",
    },
    {
      id: 3,
      title: "Leather Jacket",
      image: "hanger",
      currentBid: 85,
      minBid: 90,
      timeLeft: "1 day",
      bidCount: 8,
      condition: "Used - Excellent",
    },
    {
      id: 4,
      title: "Mechanical Keyboard",
      image: "keyboard",
      currentBid: 75,
      minBid: 80,
      timeLeft: "12 hours",
      bidCount: 15,
      condition: "New",
    },
  ]);

  // Sample data for Fixed Price Items section
  const [fixedPriceItems, setFixedPriceItems] = useState([
    {
      id: 101,
      title: "Wireless Earbuds",
      image: "headphones",
      price: 89.99,
      rating: 4.7,
      reviewCount: 342,
      condition: "New",
      availability: "In Stock",
    },
    {
      id: 102,
      title: "Desk Lamp",
      image: "lamp",
      price: 45.5,
      rating: 4.2,
      reviewCount: 128,
      condition: "New",
      availability: "In Stock",
    },
    {
      id: 103,
      title: "Vintage Watch",
      image: "watch",
      price: 199.99,
      rating: 4.9,
      reviewCount: 87,
      condition: "Used - Mint",
      availability: "Limited (3)",
    },
    {
      id: 104,
      title: "Coffee Maker",
      image: "coffee",
      price: 75.0,
      rating: 4.0,
      reviewCount: 215,
      condition: "Open Box",
      availability: "In Stock",
    },
  ]);

  // Handler for navigating to individual item details
  const handleItemPress = (itemId, type) => {
    router.push({
      pathname: `/(tabs)/marketplace/${itemId}`,
      params: { type },
    });
  };

  // Function to display rating stars
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      `★`.repeat(fullStars) +
      (hasHalfStar ? "½" : "") +
      `☆`.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Items</Text>
        <View style={styles.headerIcons}>
          <IconButton
            icon="filter-variant"
            size={24}
            onPress={() => console.log("Filter pressed")}
          />
          <IconButton
            icon="magnify"
            size={24}
            onPress={() => console.log("Search pressed")}
          />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainScroll}>
        <View style={styles.content}>
          {/* Bid Items Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Auction Items</Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/items/auctionItems")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollView}
          >
            {bidItems.map((item) => (
              <Card
                key={item.id}
                style={styles.bidItemCard}
                onPress={() => handleItemPress(item.id, "auction")}
              >
                <Card.Content style={styles.cardContentVertical}>
                  <Avatar.Icon
                    size={60}
                    icon={item.image}
                    style={styles.cardIcon}
                  />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={styles.bidInfo}>
                    <Text style={styles.currentBidText}>Current Bid</Text>
                    <Text style={styles.bidPrice}>${item.currentBid}</Text>
                  </View>
                  <View style={styles.bidDetails}>
                    <Chip icon="clock-outline" textStyle={styles.smallerText}>
                      {item.timeLeft}
                    </Chip>
                    <Text style={styles.bidCount}>{item.bidCount} bids</Text>
                  </View>
                  <Text style={styles.condition}>{item.condition}</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>

          {/* Fixed Price Items Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Buy Now</Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/items/fixedPriceItems")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fixedItemsGrid}>
            {fixedPriceItems.map((item) => (
              <Card
                key={item.id}
                style={styles.fixedItemCard}
                onPress={() => handleItemPress(item.id, "fixed")}
              >
                <Card.Content style={styles.cardContentVertical}>
                  <Avatar.Icon
                    size={60}
                    icon={item.image}
                    style={styles.cardIcon}
                  />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.fixedPrice}>
                    ${item.price.toFixed(2)}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingStars}>
                      {renderRatingStars(item.rating)}
                    </Text>
                    <Text style={styles.reviewCount}>({item.reviewCount})</Text>
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.condition}>{item.condition}</Text>
                    <Badge
                      style={
                        item.availability.includes("Limited")
                          ? styles.limitedBadge
                          : styles.stockBadge
                      }
                    >
                      {item.availability}
                    </Badge>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
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
  mainScroll: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
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
  headerIcons: {
    flexDirection: "row",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#2196F3",
    fontSize: 14,
  },
  horizontalScrollView: {
    marginBottom: 15,
  },
  bidItemCard: {
    width: 180,
    marginRight: 12,
    elevation: 2,
  },
  fixedItemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fixedItemCard: {
    width: "48%",
    marginBottom: 12,
    elevation: 2,
  },
  cardContentVertical: {
    alignItems: "center",
    paddingVertical: 10,
  },
  cardIcon: {
    backgroundColor: "#e0e0e0",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  bidInfo: {
    alignItems: "center",
    marginBottom: 6,
  },
  currentBidText: {
    fontSize: 12,
    color: "#757575",
  },
  bidPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
  },
  fixedPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 6,
  },
  bidDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 6,
  },
  smallerText: {
    fontSize: 11,
  },
  bidCount: {
    fontSize: 12,
    color: "#757575",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingStars: {
    color: "#FFC107",
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: "#757575",
  },
  itemDetails: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  condition: {
    fontSize: 12,
    color: "#757575",
  },
  stockBadge: {
    backgroundColor: "#4CAF50",
    fontSize: 10,
  },
  limitedBadge: {
    backgroundColor: "#FF9800",
    fontSize: 10,
  },
});
