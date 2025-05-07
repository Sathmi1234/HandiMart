import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import {
  Text,
  Card,
  Avatar,
  IconButton,
  Chip,
  Searchbar,
  Button,
  Divider,
  RadioButton,
  Checkbox,
  List,
  Badge,
} from "react-native-paper";

export default function FixedPriceItemsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedConditions, setSelectedConditions] = useState({
    New: false,
    "Open Box": false,
    "Used - Mint": false,
    "Used - Very Good": false,
    "Used - Good": false,
  });
  const [selectedAvailability, setSelectedAvailability] = useState({
    "In Stock": false,
    Limited: false,
  });

  // Sort state
  const [sortOption, setSortOption] = useState("recommended");

  // Category state
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample fixed price item data
  const [originalItems, setOriginalItems] = useState([
    {
      id: 101,
      title: "Wireless Earbuds",
      image: "headphones",
      price: 89.99,
      rating: 4.7,
      reviewCount: 342,
      condition: "New",
      availability: "In Stock",
      category: "Electronics",
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
      category: "Home",
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
      category: "Accessories",
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
      category: "Kitchen",
    },
    {
      id: 105,
      title: "Smart TV 43-inch",
      image: "television",
      price: 329.99,
      rating: 4.5,
      reviewCount: 186,
      condition: "New",
      availability: "In Stock",
      category: "Electronics",
    },
    {
      id: 106,
      title: "Hiking Boots",
      image: "shoe-hiking",
      price: 120.0,
      rating: 4.3,
      reviewCount: 94,
      condition: "New",
      availability: "Limited (2)",
      category: "Clothing",
    },
    {
      id: 107,
      title: "Vintage Record Player",
      image: "record-player",
      price: 175.99,
      rating: 4.8,
      reviewCount: 76,
      condition: "Used - Very Good",
      availability: "In Stock",
      category: "Electronics",
    },
    {
      id: 108,
      title: "Cookware Set",
      image: "pot",
      price: 95.5,
      rating: 4.1,
      reviewCount: 124,
      condition: "Open Box",
      availability: "In Stock",
      category: "Kitchen",
    },
    {
      id: 109,
      title: "Bluetooth Speaker",
      image: "speaker",
      price: 65.99,
      rating: 4.4,
      reviewCount: 310,
      condition: "New",
      availability: "In Stock",
      category: "Electronics",
    },
    {
      id: 110,
      title: "Designer Handbag",
      image: "bag-personal",
      price: 249.99,
      rating: 4.6,
      reviewCount: 52,
      condition: "Used - Good",
      availability: "Limited (1)",
      category: "Accessories",
    },
  ]);

  const [displayedItems, setDisplayedItems] = useState([...originalItems]);
  const categories = [
    "All",
    "Electronics",
    "Home",
    "Kitchen",
    "Clothing",
    "Accessories",
  ];

  // Apply all filters, sorting, and search
  useEffect(() => {
    let filteredItems = [...originalItems];

    // Apply search filter
    if (searchQuery) {
      filteredItems = filteredItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      filteredItems = filteredItems.filter(
        (item) => item.category === selectedCategory,
      );
    }

    // Apply price range filter
    filteredItems = filteredItems.filter(
      (item) => item.price >= priceRange.min && item.price <= priceRange.max,
    );

    // Apply condition filter if any condition is selected
    const anyConditionSelected =
      Object.values(selectedConditions).some(Boolean);
    if (anyConditionSelected) {
      filteredItems = filteredItems.filter(
        (item) => selectedConditions[item.condition],
      );
    }

    // Apply availability filter if any availability is selected
    const anyAvailabilitySelected =
      Object.values(selectedAvailability).some(Boolean);
    if (anyAvailabilitySelected) {
      filteredItems = filteredItems.filter((item) => {
        if (
          selectedAvailability["In Stock"] &&
          item.availability === "In Stock"
        ) {
          return true;
        }
        if (
          selectedAvailability["Limited"] &&
          item.availability.includes("Limited")
        ) {
          return true;
        }
        return false;
      });
    }

    // Apply sorting
    switch (sortOption) {
      case "recommended":
        // For recommended, we'll just use the original order for this demo
        break;
      case "priceLowToHigh":
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      case "topRated":
        filteredItems.sort((a, b) => b.rating - a.rating);
        break;
      case "mostReviewed":
        filteredItems.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    setDisplayedItems(filteredItems);
  }, [
    searchQuery,
    selectedCategory,
    priceRange,
    selectedConditions,
    selectedAvailability,
    sortOption,
    originalItems,
  ]);

  const toggleCondition = (condition) => {
    setSelectedConditions({
      ...selectedConditions,
      [condition]: !selectedConditions[condition],
    });
  };

  const toggleAvailability = (availability) => {
    setSelectedAvailability({
      ...selectedAvailability,
      [availability]: !selectedAvailability[availability],
    });
  };

  const handleItemPress = (itemId) => {
    router.push({
      pathname: `/(tabs)/marketplace/${itemId}`,
      params: { type: "fixed" },
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

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 1000 });
    setSelectedConditions({
      New: false,
      "Open Box": false,
      "Used - Mint": false,
      "Used - Very Good": false,
      "Used - Good": false,
    });
    setSelectedAvailability({
      "In Stock": false,
      Limited: false,
    });
    setFilterModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Buy Now Items</Text>
      </View>

      {/* Search and Filter Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search items"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      {/* Filter Chips */}
      <View
        
        
        style={styles.filterChipsContainer}
      
      >
        <Chip
          icon="filter-variant"
          mode="outlined"
          onPress={() => setFilterModalVisible(true)}
          style={styles.filterChip}
        >
          Filters
        </Chip>
        <Chip
          icon="sort"
          mode="outlined"
          onPress={() => setSortModalVisible(true)}
          style={styles.filterChip}
        >
          {sortOption === "recommended"
            ? "Recommended"
            : sortOption === "priceLowToHigh"
              ? "Price: Low to High"
              : sortOption === "priceHighToLow"
                ? "Price: High to Low"
                : sortOption === "topRated"
                  ? "Top Rated"
                  : "Most Reviewed"}
        </Chip>
        <Chip
          icon="shape"
          mode="outlined"
          onPress={() => setCategoryModalVisible(true)}
          style={styles.filterChip}
        >
          {selectedCategory}
        </Chip>
      </View>

      {/* Active Filters Display */}
      {(selectedCategory !== "All" ||
        Object.values(selectedConditions).some(Boolean) ||
        Object.values(selectedAvailability).some(Boolean) ||
        priceRange.min > 0 ||
        priceRange.max < 1000) && (
        <View style={styles.activeFiltersContainer}>
          <Text style={styles.activeFiltersText}>Active Filters:</Text>
          {selectedCategory !== "All" && (
            <Chip
              onClose={() => setSelectedCategory("All")}
              style={styles.activeFilterChip}
            >
              {selectedCategory}
            </Chip>
          )}
          {Object.entries(selectedConditions).map(
            ([condition, isSelected]) =>
              isSelected && (
                <Chip
                  key={condition}
                  onClose={() => toggleCondition(condition)}
                  style={styles.activeFilterChip}
                >
                  {condition}
                </Chip>
              ),
          )}
          {Object.entries(selectedAvailability).map(
            ([availability, isSelected]) =>
              isSelected && (
                <Chip
                  key={availability}
                  onClose={() => toggleAvailability(availability)}
                  style={styles.activeFilterChip}
                >
                  {availability}
                </Chip>
              ),
          )}
          {(priceRange.min > 0 || priceRange.max < 1000) && (
            <Chip
              onClose={() => setPriceRange({ min: 0, max: 1000 })}
              style={styles.activeFilterChip}
            >
              ${priceRange.min} - ${priceRange.max}
            </Chip>
          )}
        </View>
      )}

      {/* Items Grid */}
      <ScrollView style={styles.itemsContainer}>
        <View style={styles.itemsGrid}>
          {displayedItems.length > 0 ? (
            displayedItems.map((item) => (
              <Card
                key={item.id}
                style={styles.itemCard}
                onPress={() => handleItemPress(item.id)}
              >
                <Card.Content style={styles.cardContent}>
                  <Avatar.Icon
                    size={60}
                    icon={item.image}
                    style={styles.cardIcon}
                  />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingStars}>
                      {renderRatingStars(item.rating)}
                    </Text>
                    <Text style={styles.reviewCount}>({item.reviewCount})</Text>
                  </View>
                  <View style={styles.itemFooter}>
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
                  <Chip
                    style={styles.categoryChip}
                    textStyle={styles.categoryChipText}
                  >
                    {item.category}
                  </Chip>
                </Card.Content>
              </Card>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No items match your filters
              </Text>
              <Button mode="contained" onPress={resetFilters}>
                Reset Filters
              </Button>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Options</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setFilterModalVisible(false)}
              />
            </View>
            <Divider />

            <ScrollView style={styles.modalScrollView}>
              {/* Price Range */}
              <List.Section>
                <List.Subheader>Price Range</List.Subheader>
                <View style={styles.priceRangeContainer}>
                  <Button
                    mode={
                      priceRange.min === 0 && priceRange.max === 100
                        ? "contained"
                        : "outlined"
                    }
                    onPress={() => setPriceRange({ min: 0, max: 100 })}
                    style={styles.priceButton}
                  >
                    $0-$100
                  </Button>
                  <Button
                    mode={
                      priceRange.min === 100 && priceRange.max === 250
                        ? "contained"
                        : "outlined"
                    }
                    onPress={() => setPriceRange({ min: 100, max: 250 })}
                    style={styles.priceButton}
                  >
                    $100-$250
                  </Button>
                  <Button
                    mode={
                      priceRange.min === 250 && priceRange.max === 1000
                        ? "contained"
                        : "outlined"
                    }
                    onPress={() => setPriceRange({ min: 250, max: 1000 })}
                    style={styles.priceButton}
                  >
                    $250+
                  </Button>
                </View>
              </List.Section>

              <Divider />

              {/* Condition */}
              <List.Section>
                <List.Subheader>Condition</List.Subheader>
                {Object.keys(selectedConditions).map((condition) => (
                  <List.Item
                    key={condition}
                    title={condition}
                    left={() => (
                      <Checkbox
                        status={
                          selectedConditions[condition]
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => toggleCondition(condition)}
                      />
                    )}
                    onPress={() => toggleCondition(condition)}
                  />
                ))}
              </List.Section>

              <Divider />

              {/* Availability */}
              <List.Section>
                <List.Subheader>Availability</List.Subheader>
                {Object.keys(selectedAvailability).map((availability) => (
                  <List.Item
                    key={availability}
                    title={availability}
                    left={() => (
                      <Checkbox
                        status={
                          selectedAvailability[availability]
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => toggleAvailability(availability)}
                      />
                    )}
                    onPress={() => toggleAvailability(availability)}
                  />
                ))}
              </List.Section>
            </ScrollView>

            <Divider />
            <View style={styles.modalButtons}>
              <Button mode="outlined" onPress={resetFilters}>
                Reset
              </Button>
              <Button
                mode="contained"
                onPress={() => setFilterModalVisible(false)}
              >
                Apply
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setSortModalVisible(false)}
              />
            </View>
            <Divider />

            <RadioButton.Group
              onValueChange={(value) => setSortOption(value)}
              value={sortOption}
            >
              <RadioButton.Item label="Recommended" value="recommended" />
              <RadioButton.Item
                label="Price: Low to High"
                value="priceLowToHigh"
              />
              <RadioButton.Item
                label="Price: High to Low"
                value="priceHighToLow"
              />
              <RadioButton.Item label="Top Rated" value="topRated" />
              <RadioButton.Item label="Most Reviewed" value="mostReviewed" />
            </RadioButton.Group>

            <Divider />
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={() => setSortModalVisible(false)}
              >
                Apply
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Category Modal */}
      <Modal
        visible={categoryModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setCategoryModalVisible(false)}
              />
            </View>
            <Divider />

            <RadioButton.Group
              onValueChange={(value) => setSelectedCategory(value)}
              value={selectedCategory}
            >
              {categories.map((category) => (
                <RadioButton.Item
                  key={category}
                  label={category}
                  value={category}
                />
              ))}
            </RadioButton.Group>

            <Divider />
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={() => setCategoryModalVisible(false)}
              >
                Apply
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  searchContainer: {
    padding: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchBar: {
    elevation: 0,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  filterChipsContainer: {
    backgroundColor: "#ffffff",
    height: 44,
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterChip: {
    marginRight: 8,
    backgroundColor: "#f0f0f0",
    height: 36, 
    paddingVertical: 0, 
  },
  activeFiltersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  activeFiltersText: {
    marginRight: 8,
    fontSize: 12,
    color: "#757575",
  },
  activeFilterChip: {
    margin: 4,
    backgroundColor: "#e3f2fd",
    height: 28,
  },
  itemsContainer: {
    flex: 1,
    padding: 12,
  },
  itemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  itemCard: {
    width: "48%",
    marginBottom: 16,
    elevation: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardContent: {
    padding: 12,
    alignItems: "center",
  },
  cardIcon: {
    marginBottom: 8,
    backgroundColor: "#e1f5fe",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    height: 40,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32", // Green color for price
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingStars: {
    color: "#ffc107", // Amber color for stars
    fontSize: 12,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: "#757575",
  },
  itemFooter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  condition: {
    fontSize: 11,
    color: "#616161",
  },
  stockBadge: {
    backgroundColor: "#4caf50", // Green for in stock
    fontSize: 10,
  },
  limitedBadge: {
    backgroundColor: "#ff9800", // Orange for limited stock
    fontSize: 10,
  },
  categoryChip: {
    marginTop: 8,
    backgroundColor: "#f0f0f0",
    height: 24,
  },
  categoryChipText: {
    fontSize: 10,
  },
  noResultsContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 20,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalScrollView: {
    maxHeight: 400,
  },
  priceRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  priceButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    gap: 8,
  },
});
