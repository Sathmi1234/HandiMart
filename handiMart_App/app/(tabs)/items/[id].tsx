import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Text, Button, Card, Avatar, Divider, IconButton, Badge } from "react-native-paper";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

export default function ItemDetail() {
  const router = useRouter();
  const { id, section } = useLocalSearchParams();
  const itemId = Number(id);
  const itemSection = String(section);

  // State for item details
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sample purchase history/reviews
  const [recentPurchases, setRecentPurchases] = useState([
    { id: 1, user: "User378", rating: 5, review: "Great quality product!", time: "2 days ago" },
    { id: 2, user: "User542", rating: 4, review: "Fast shipping, as described.", time: "1 week ago" },
    { id: 3, user: "User189", rating: 5, review: "Excellent condition, highly recommend!", time: "2 weeks ago" },
    { id: 4, user: "User256", rating: 4, review: "Good value for money.", time: "3 weeks ago" },
    { id: 5, user: "User921", rating: 5, review: "Perfect! Will buy again.", time: "1 month ago" },
  ]);

  // Simulate fetching data based on ID
  useEffect(() => {
    // Simulated API call based on section and ID
    setTimeout(() => {
      // Based on which section the item is from
      if (itemSection === "your-items" || itemSection === "purchased") {
        setItem({
          id: itemId,
          title: itemId === 1 ? "Vintage Camera" : 
                 itemId === 2 ? "Gaming Console" : 
                 itemId === 3 ? "Leather Jacket" : "Mechanical Keyboard",
          description: "This is a detailed description of the item. It includes information about the condition, features, specifications, and warranty. The seller provides high quality images and excellent customer service.",
          image: itemId === 1 ? "camera" : 
                 itemId === 2 ? "gamepad" : 
                 itemId === 3 ? "hanger" : "keyboard",
          price: itemId === 1 ? 299.99 : 
                 itemId === 2 ? 449.99 : 
                 itemId === 3 ? 129.99 : 89.99,
          originalPrice: itemId === 1 ? 399.99 : 
                        itemId === 2 ? 499.99 : 
                        itemId === 3 ? 159.99 : 109.99,
          discount: itemId === 1 ? 25 : 
                   itemId === 2 ? 10 : 
                   itemId === 3 ? 19 : 18,
          inStock: itemId === 1 ? 12 : 
                   itemId === 2 ? 5 : 
                   itemId === 3 ? 23 : 8,
          condition: "Like New",
          rating: 4.6,
          reviewCount: 143,
          seller: {
            name: "SellerName",
            rating: 4.8,
            sales: 124
          },
          shipping: "Free domestic shipping",
          returnPolicy: "30-day returns accepted",
          estimatedDelivery: "3-5 business days"
        });
      } else { // trending-items or featured
        setItem({
          id: itemId,
          title: itemId === 101 ? "Limited Edition Sneakers" : 
                 itemId === 102 ? "Smartphone Latest Model" : 
                 itemId === 103 ? "Drone with Camera" : "Vintage Record Player",
          description: "This is a popular item with excellent reviews. The condition is brand new and it comes with all original accessories, packaging, and manufacturer warranty. Limited stock available.",
          image: itemId === 101 ? "shoe-heel" : 
                 itemId === 102 ? "cellphone" : 
                 itemId === 103 ? "drone" : "record-player",
          price: itemId === 101 ? 189.99 : 
                 itemId === 102 ? 799.99 : 
                 itemId === 103 ? 449.99 : 249.99,
          originalPrice: itemId === 101 ? 249.99 : 
                        itemId === 102 ? 899.99 : 
                        itemId === 103 ? 549.99 : 299.99,
          discount: itemId === 101 ? 24 : 
                   itemId === 102 ? 11 : 
                   itemId === 103 ? 18 : 17,
          inStock: itemId === 101 ? 3 : 
                   itemId === 102 ? 15 : 
                   itemId === 103 ? 7 : 12,
          condition: "Brand New",
          rating: 4.8,
          reviewCount: itemId === 101 ? 87 : 
                      itemId === 102 ? 234 : 
                      itemId === 103 ? 156 : 92,
          seller: {
            name: "TopSeller",
            rating: 4.9,
            sales: 351
          },
          shipping: "$5.99 standard shipping",
          returnPolicy: "14-day returns, buyer pays return shipping",
          estimatedDelivery: "2-4 business days"
        });
      }
      setLoading(false);
    }, 500);
  }, [itemId, itemSection]);

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", color: "#F44336" };
    if (stock <= 5) return { text: "Low Stock", color: "#FF9800" };
    return { text: "In Stock", color: "#4CAF50" };
  };

  const handleAddToCart = () => {
    setIsInCart(true);
    console.log(`Added ${quantity} item(s) to cart`);
    alert(`${quantity} item(s) added to cart successfully!`);
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} item(s) for $${(item.price * quantity).toFixed(2)}`);
    alert(`Proceeding to checkout for ${quantity} item(s)`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, Math.min(item.inStock, quantity + change));
    setQuantity(newQuantity);
  };

  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading item details...</Text>
      </View>
    );
  }

  const stockStatus = getStockStatus(item.inStock);

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
        <Text style={styles.headerTitle}>Item Details</Text>
        <View style={styles.headerActions}>
          <IconButton
            icon={isWishlisted ? "heart" : "heart-outline"}
            size={24}
            iconColor={isWishlisted ? "#F44336" : undefined}
            onPress={handleWishlist}
          />
          <IconButton
            icon="share-variant"
            size={24}
            onPress={() => console.log("Share pressed")}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Item Image/Icon */}
        <View style={styles.imageContainer}>
          <Avatar.Icon
            size={120}
            icon={item.image}
            style={styles.itemImage}
          />
        </View>

        {/* Item Title and Condition */}
        <View style={styles.titleContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Badge style={styles.conditionBadge}>
            {item.condition}
          </Badge>
        </View>

        {/* Price and Stock Information */}
        <Card style={styles.priceInfoCard}>
          <Card.Content>
            <View style={styles.priceRow}>
              <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>${item.price}</Text>
                {item.originalPrice > item.price && (
                  <View style={styles.originalPriceContainer}>
                    <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                    <Text style={styles.discount}>-{item.discount}%</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.stockContainer}>
                <Text style={[styles.stockStatus, { color: stockStatus.color }]}>
                  {stockStatus.text}
                </Text>
                <Text style={styles.stockCount}>
                  {item.inStock > 0 ? `${item.inStock} available` : 'Notify when available'}
                </Text>
              </View>
            </View>

            <View style={styles.ratingContainer}>
              <IconButton
                icon="star"
                size={16}
                style={styles.ratingIcon}
              />
              <Text style={styles.ratingText}>
                {item.rating} ({item.reviewCount} reviews)
              </Text>
            </View>

            <Divider style={styles.divider} />

            {/* Quantity and Purchase Section */}
            {item.inStock > 0 && (
              <View style={styles.purchaseSection}>
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity:</Text>
                  <View style={styles.quantityControls}>
                    <IconButton
                      icon="minus"
                      size={20}
                      onPress={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    />
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <IconButton
                      icon="plus"
                      size={20}
                      onPress={() => handleQuantityChange(1)}
                      disabled={quantity >= item.inStock}
                    />
                  </View>
                </View>
                
                <View style={styles.buttonContainer}>
                  <Button
                    mode="outlined"
                    style={[styles.actionButton, styles.cartButton]}
                    onPress={handleAddToCart}
                    disabled={isInCart}
                  >
                    {isInCart ? "Added to Cart" : "Add to Cart"}
                  </Button>
                  <Button
                    mode="contained"
                    style={[styles.actionButton, styles.buyButton]}
                    onPress={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </View>
                
                <Text style={styles.totalPrice}>
                  Total: ${(item.price * quantity).toFixed(2)}
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Item Description */}
        <Card style={styles.descriptionCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </Card.Content>
        </Card>

        {/* Seller Information */}
        <Card style={styles.sellerCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Seller Information</Text>
            <View style={styles.sellerInfo}>
              <Avatar.Text size={40} label={item.seller.name.substring(0, 2)} />
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>{item.seller.name}</Text>
                <View style={styles.sellerRating}>
                  <IconButton
                    icon="star"
                    size={16}
                    style={styles.ratingIcon}
                  />
                  <Text>{item.seller.rating} ({item.seller.sales} sales)</Text>
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
                <Text>{item.shipping}</Text>
              </View>
              <View style={styles.infoRow}>
                <IconButton
                  icon="clock-outline"
                  size={20}
                  style={styles.infoIcon}
                />
                <Text>Estimated delivery: {item.estimatedDelivery}</Text>
              </View>
              <View style={styles.infoRow}>
                <IconButton
                  icon="swap-horizontal"
                  size={20}
                  style={styles.infoIcon}
                />
                <Text>{item.returnPolicy}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Recent Reviews */}
        <Card style={styles.reviewsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
            {recentPurchases.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUsername}>{review.user}</Text>
                  <View style={styles.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <IconButton
                        key={i}
                        icon={i < review.rating ? "star" : "star-outline"}
                        size={12}
                        style={styles.starIcon}
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewTime}>{review.time}</Text>
                </View>
                <Text style={styles.reviewText}>{review.review}</Text>
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
  headerActions: {
    flexDirection: "row",
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
  conditionBadge: {
    backgroundColor: "#2196F3",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priceInfoCard: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  priceContainer: {
    flex: 1,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  originalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#757575",
    marginRight: 8,
  },
  discount: {
    fontSize: 14,
    color: "#F44336",
    fontWeight: "bold",
  },
  stockContainer: {
    alignItems: "flex-end",
  },
  stockStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stockCount: {
    fontSize: 12,
    color: "#757575",
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingIcon: {
    margin: 0,
  },
  ratingText: {
    fontSize: 14,
    color: "#757575",
  },
  divider: {
    marginBottom: 16,
  },
  purchaseSection: {
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 12,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  cartButton: {
    borderColor: "#2196F3",
  },
  buyButton: {
    backgroundColor: "#4CAF50",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
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
  reviewsCard: {
    marginBottom: 24,
  },
  reviewItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewUsername: {
    fontWeight: "bold",
    marginRight: 12,
  },
  reviewRating: {
    flexDirection: "row",
    marginRight: 12,
  },
  starIcon: {
    margin: 0,
    padding: 0,
  },
  reviewTime: {
    fontSize: 12,
    color: "#757575",
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 18,
  },
});