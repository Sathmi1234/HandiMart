import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Text, Button, Card, Avatar, Divider, IconButton, Badge } from "react-native-paper";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

export default function BidItemDetail() {
  const router = useRouter();
  const { id, section } = useLocalSearchParams();
  const bidId = Number(id);
  const bidSection = String(section);

  // State for bid details
  const [bidItem, setBidItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");

  // Sample bid history
  const [bidHistory, setBidHistory] = useState([
    { id: 1, user: "User378", amount: 125, time: "2 hours ago" },
    { id: 2, user: "User542", amount: 120, time: "4 hours ago" },
    { id: 3, user: "User189", amount: 115, time: "6 hours ago" },
    { id: 4, user: "User256", amount: 110, time: "8 hours ago" },
    { id: 5, user: "User921", amount: 105, time: "12 hours ago" },
  ]);

  // Simulate fetching data based on ID
  useEffect(() => {
    // Simulated API call based on section and ID
    setTimeout(() => {
      // Based on which section the bid is from
      if (bidSection === "your-bids") {
        setBidItem({
          id: bidId,
          title: bidId === 1 ? "Vintage Camera" : 
                 bidId === 2 ? "Gaming Console" : 
                 bidId === 3 ? "Leather Jacket" : "Mechanical Keyboard",
          description: "This is a detailed description of the item. It includes information about the condition, history, and any special features. The seller has provided high quality images and is open to reasonable offers.",
          image: bidId === 1 ? "camera" : 
                 bidId === 2 ? "gamepad" : 
                 bidId === 3 ? "hanger" : "keyboard",
          currentBid: bidId === 1 ? 120 : 
                     bidId === 2 ? 210 : 
                     bidId === 3 ? 85 : 75,
          yourBid: bidId === 1 ? 125 : 
                   bidId === 2 ? 205 : 
                   bidId === 3 ? 95 : 72,
          timeLeft: bidId === 1 ? "2 days" : 
                    bidId === 2 ? "4 hours" : 
                    bidId === 3 ? "1 day" : "12 hours",
          status: bidId === 1 || bidId === 3 ? "winning" : "outbid",
          bidCount: 15,
          watchers: 32,
          seller: {
            name: "SellerName",
            rating: 4.8,
            sales: 124
          },
          shipping: "Free domestic shipping",
          returnPolicy: "30-day returns accepted"
        });
      } else { // trending-bids
        setBidItem({
          id: bidId,
          title: bidId === 101 ? "Limited Edition Sneakers" : 
                 bidId === 102 ? "Smartphone Latest Model" : 
                 bidId === 103 ? "Drone with Camera" : "Vintage Record Player",
          description: "This is a trending item with lots of interest. The condition is excellent and it comes with all original accessories and packaging. This is a rare opportunity to own this coveted item.",
          image: bidId === 101 ? "shoe-heel" : 
                 bidId === 102 ? "cellphone" : 
                 bidId === 103 ? "drone" : "record-player",
          currentBid: bidId === 101 ? 340 : 
                     bidId === 102 ? 550 : 
                     bidId === 103 ? 230 : 175,
          bidCount: bidId === 101 ? 24 : 
                    bidId === 102 ? 18 : 
                    bidId === 103 ? 15 : 12,
          timeLeft: bidId === 101 ? "2 days" : 
                    bidId === 102 ? "3 days" : 
                    bidId === 103 ? "1 day" : "5 hours",
          watchers: bidId === 101 ? 56 : 
                    bidId === 102 ? 42 : 
                    bidId === 103 ? 38 : 27,
          seller: {
            name: "TopSeller",
            rating: 4.9,
            sales: 351
          },
          shipping: "$5.99 standard shipping",
          returnPolicy: "14-day returns, buyer pays return shipping"
        });
      }
      setLoading(false);
    }, 500);
  }, [bidId, bidSection]);

  const getStatusColor = (status:string) => {
    return status === "winning" ? "#4CAF50" : "#F44336";
  };

  const handlePlaceBid = () => {
    // Here would be logic to place a new bid
    console.log(`New bid placed: $${bidAmount}`);
    // Update the UI accordingly
    alert(`Bid of $${bidAmount} placed successfully!`);
    setBidAmount("");
  };

  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading bid details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Bid Details</Text>
        <IconButton
          icon="share-variant"
          size={24}
          onPress={() => console.log("Share pressed")}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Item Image/Icon */}
        <View style={styles.imageContainer}>
          <Avatar.Icon
            size={120}
            icon={bidItem.image}
            style={styles.itemImage}
          />
        </View>

        {/* Item Title and Status */}
        <View style={styles.titleContainer}>
          <Text style={styles.itemTitle}>{bidItem.title}</Text>
          {bidSection === "your-bids" && (
            <Badge
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(bidItem.status) },
              ]}
            >
              {bidItem.status.toUpperCase()}
            </Badge>
          )}
        </View>

        {/* Current Bid Information */}
        <Card style={styles.bidInfoCard}>
          <Card.Content>
            <View style={styles.bidInfoRow}>
              <View style={styles.bidInfoColumn}>
                <Text style={styles.bidInfoLabel}>Current Bid</Text>
                <Text style={styles.bidInfoValue}>${bidItem.currentBid}</Text>
              </View>
              
              {bidSection === "your-bids" ? (
                <View style={styles.bidInfoColumn}>
                  <Text style={styles.bidInfoLabel}>Your Bid</Text>
                  <Text style={styles.bidInfoValue}>${bidItem.yourBid}</Text>
                </View>
              ) : (
                <View style={styles.bidInfoColumn}>
                  <Text style={styles.bidInfoLabel}>Bid Count</Text>
                  <Text style={styles.bidInfoValue}>{bidItem.bidCount}</Text>
                </View>
              )}
              
              <View style={styles.bidInfoColumn}>
                <Text style={styles.bidInfoLabel}>Time Left</Text>
                <Text style={styles.bidInfoValue}>{bidItem.timeLeft}</Text>
              </View>
            </View>

            <Divider style={styles.divider} />

            {/* Place Bid Section */}
            <View style={styles.placeBidSection}>
              <View style={styles.placeBidContainer}>
                <Button
                  mode="contained"
                  style={styles.bidButton}
                  labelStyle={styles.bidButtonLabel}
                  onPress={handlePlaceBid}
                >
                  Place Bid
                </Button>
                <Text style={styles.minBidText}>
                  Minimum bid: ${bidItem.currentBid + 5}
                </Text>
              </View>
              
              <View style={styles.watcherInfo}>
                <IconButton
                  icon="eye"
                  size={16}
                  style={styles.watcherIcon}
                />
                <Text style={styles.watcherText}>{bidItem.watchers} watching</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Item Description */}
        <Card style={styles.descriptionCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{bidItem.description}</Text>
          </Card.Content>
        </Card>

        {/* Seller Information */}
        <Card style={styles.sellerCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Seller Information</Text>
            <View style={styles.sellerInfo}>
              <Avatar.Text size={40} label={bidItem.seller.name.substring(0, 2)} />
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>{bidItem.seller.name}</Text>
                <View style={styles.sellerRating}>
                  <IconButton
                    icon="star"
                    size={16}
                    style={styles.ratingIcon}
                  />
                  <Text>{bidItem.seller.rating} ({bidItem.seller.sales} sales)</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Shipping & Returns */}
        <Card style={styles.shippingCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Shipping & Returns</Text>
            <View style={styles.shippingInfo}>
              <View style={styles.infoRow}>
                <IconButton
                  icon="truck-delivery"
                  size={20}
                  style={styles.infoIcon}
                />
                <Text>{bidItem.shipping}</Text>
              </View>
              <View style={styles.infoRow}>
                <IconButton
                  icon="swap-horizontal"
                  size={20}
                  style={styles.infoIcon}
                />
                <Text>{bidItem.returnPolicy}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Bid History */}
        <Card style={styles.bidHistoryCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Bid History</Text>
            {bidHistory.map((bid) => (
              <View key={bid.id} style={styles.bidHistoryItem}>
                <View style={styles.bidHistoryUser}>
                  <Text style={styles.bidHistoryUsername}>{bid.user}</Text>
                  <Text style={styles.bidHistoryTime}>{bid.time}</Text>
                </View>
                <Text style={styles.bidHistoryAmount}>${bid.amount}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  itemImage: {
    backgroundColor: "#e0e0e0",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  statusBadge: {
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bidInfoCard: {
    marginBottom: 16,
  },
  bidInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  bidInfoColumn: {
    alignItems: "center",
    flex: 1,
  },
  bidInfoLabel: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 4,
  },
  bidInfoValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    marginBottom: 16,
  },
  placeBidSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeBidContainer: {
    flex: 2,
  },
  bidButton: {
    marginBottom: 4,
  },
  bidButtonLabel: {
    fontSize: 16,
  },
  minBidText: {
    fontSize: 12,
    color: "#757575",
  },
  watcherInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  watcherIcon: {
    margin: 0,
  },
  watcherText: {
    fontSize: 14,
    color: "#757575",
  },
  descriptionCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  descriptionText: {
    lineHeight: 22,
  },
  sellerCard: {
    marginBottom: 16,
  },
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  sellerDetails: {
    marginLeft: 16,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sellerRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingIcon: {
    margin: 0,
  },
  shippingCard: {
    marginBottom: 16,
  },
  shippingInfo: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoIcon: {
    margin: 0,
  },
  bidHistoryCard: {
    marginBottom: 24,
  },
  bidHistoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  bidHistoryUser: {
    flex: 1,
  },
  bidHistoryUsername: {
    fontWeight: "bold",
  },
  bidHistoryTime: {
    fontSize: 12,
    color: "#757575",
  },
  bidHistoryAmount: {
    fontWeight: "bold",
    fontSize: 16,
  },
});