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
} from "react-native-paper";

export default function AuctionItemsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedConditions, setSelectedConditions] = useState({
    "New": false,
    "Used - Like New": false,
    "Used - Excellent": false,
    "Used - Good": false,
    "Used - Fair": false,
  });
  
  // Sort state
  const [sortOption, setSortOption] = useState("endingSoon");
  
  // Category state
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Sample auction item data
  const [originalItems, setOriginalItems] = useState([
    {
      id: 1,
      title: "Vintage Camera",
      image: "camera",
      currentBid: 120,
      minBid: 125,
      timeLeft: "2 days",
      bidCount: 12,
      condition: "Used - Good",
      category: "Electronics",
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
      category: "Electronics",
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
      category: "Clothing",
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
      category: "Electronics",
    },
    {
      id: 5,
      title: "Mountain Bike",
      image: "bike",
      currentBid: 350,
      minBid: 360,
      timeLeft: "3 days",
      bidCount: 7,
      condition: "Used - Good",
      category: "Sports",
    },
    {
      id: 6,
      title: "Antique Desk",
      image: "desk",
      currentBid: 425,
      minBid: 450,
      timeLeft: "1 day",
      bidCount: 18,
      condition: "Used - Fair",
      category: "Furniture",
    },
    {
      id: 7,
      title: "Vinyl Record Collection",
      image: "album",
      currentBid: 180,
      minBid: 190,
      timeLeft: "6 hours",
      bidCount: 13,
      condition: "Used - Good",
      category: "Collectibles",
    },
    {
      id: 8,
      title: "Professional DSLR Camera",
      image: "camera",
      currentBid: 650,
      minBid: 675,
      timeLeft: "2 days",
      bidCount: 21,
      condition: "Used - Excellent",
      category: "Electronics",
    },
  ]);
  
  const [displayedItems, setDisplayedItems] = useState([...originalItems]);
  const categories = ["All", "Electronics", "Clothing", "Sports", "Furniture", "Collectibles"];
  
  // Apply all filters, sorting, and search
  useEffect(() => {
    let filteredItems = [...originalItems];
    
    // Apply search filter
    if (searchQuery) {
      filteredItems = filteredItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filteredItems = filteredItems.filter(item => item.category === selectedCategory);
    }
    
    // Apply price range filter
    filteredItems = filteredItems.filter(item => 
      item.currentBid >= priceRange.min && item.currentBid <= priceRange.max
    );
    
    // Apply condition filter if any condition is selected
    const anyConditionSelected = Object.values(selectedConditions).some(Boolean);
    if (anyConditionSelected) {
      filteredItems = filteredItems.filter(item => 
        selectedConditions[item.condition]
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "endingSoon":
        // Simple mock sort based on timeLeft (in reality, you'd use actual date objects)
        filteredItems = sortByTimeLeft(filteredItems);
        break;
      case "priceLowToHigh":
        filteredItems.sort((a, b) => a.currentBid - b.currentBid);
        break;
      case "priceHighToLow":
        filteredItems.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case "mostBids":
        filteredItems.sort((a, b) => b.bidCount - a.bidCount);
        break;
      default:
        break;
    }
    
    setDisplayedItems(filteredItems);
  }, [searchQuery, selectedCategory, priceRange, selectedConditions, sortOption, originalItems]);
  
  // Mock function to sort by time left - in a real app, this would use actual date objects
  const sortByTimeLeft = (items) => {
    const timeOrder = { "hours": 0, "day": 1, "days": 2 };
    return [...items].sort((a, b) => {
      const aTime = a.timeLeft.split(" ");
      const bTime = b.timeLeft.split(" ");
      
      // Compare units first (hours, day, days)
      if (timeOrder[aTime[1]] !== timeOrder[bTime[1]]) {
        return timeOrder[aTime[1]] - timeOrder[bTime[1]];
      }
      
      // Then compare numbers
      return parseInt(aTime[0]) - parseInt(bTime[0]);
    });
  };
  
  const toggleCondition = (condition) => {
    setSelectedConditions({
      ...selectedConditions,
      [condition]: !selectedConditions[condition]
    });
  };
  
  const handleItemPress = (itemId) => {
    router.push({
      pathname: `/(tabs)/marketplace/${itemId}`,
      params: { type: "auction" },
    });
  };
  
  const resetFilters = () => {
    setPriceRange({ min: 0, max: 1000 });
    setSelectedConditions({
      "New": false,
      "Used - Like New": false,
      "Used - Excellent": false,
      "Used - Good": false,
      "Used - Fair": false,
    });
    setFilterModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton 
          icon="arrow-left" 
          size={24} 
          onPress={() => router.back()} 
        />
        <Text style={styles.headerTitle}>Auction Items</Text>
      </View>
      
      {/* Search and Filter Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search auctions"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      
      {/* Filter Chips */}
      <View style={styles.filterChipsContainer}>
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
          {sortOption === "endingSoon" ? "Ending Soon" : 
           sortOption === "priceLowToHigh" ? "Price: Low to High" :
           sortOption === "priceHighToLow" ? "Price: High to Low" : "Most Bids"}
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
          {Object.entries(selectedConditions).map(([condition, isSelected]) => (
            isSelected && (
              <Chip 
                key={condition}
                onClose={() => toggleCondition(condition)} 
                style={styles.activeFilterChip}
              >
                {condition}
              </Chip>
            )
          ))}
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
                  <View style={styles.bidInfo}>
                    <Text style={styles.currentBidText}>Current Bid</Text>
                    <Text style={styles.bidPrice}>${item.currentBid}</Text>
                    <Text style={styles.minBidText}>Min Bid: ${item.minBid}</Text>
                  </View>
                  <View style={styles.bidDetails}>
                    <Chip icon="clock-outline" textStyle={styles.smallerText}>
                      {item.timeLeft}
                    </Chip>
                    <Text style={styles.bidCount}>{item.bidCount} bids</Text>
                  </View>
                  <View style={styles.itemFooter}>
                    <Text style={styles.condition}>{item.condition}</Text>
                    <Chip size={20} style={styles.categoryChip}>
                      {item.category}
                    </Chip>
                  </View>
                </Card.Content>
              </Card>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No items match your filters</Text>
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
                    mode={priceRange.min === 0 && priceRange.max === 100 ? "contained" : "outlined"}
                    onPress={() => setPriceRange({ min: 0, max: 100 })}
                    style={styles.priceButton}
                  >
                    $0-$100
                  </Button>
                  <Button 
                    mode={priceRange.min === 100 && priceRange.max === 300 ? "contained" : "outlined"}
                    onPress={() => setPriceRange({ min: 100, max: 300 })}
                    style={styles.priceButton}
                  >
                    $100-$300
                  </Button>
                  <Button 
                    mode={priceRange.min === 300 && priceRange.max === 1000 ? "contained" : "outlined"}
                    onPress={() => setPriceRange({ min: 300, max: 1000 })}
                    style={styles.priceButton}
                  >
                    $300+
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
                        status={selectedConditions[condition] ? "checked" : "unchecked"}
                        onPress={() => toggleCondition(condition)}
                      />
                    )}
                    onPress={() => toggleCondition(condition)}
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
              <RadioButton.Item label="Ending Soon" value="endingSoon" />
              <RadioButton.Item label="Price: Low to High" value="priceLowToHigh" />
              <RadioButton.Item label="Price: High to Low" value="priceHighToLow" />
              <RadioButton.Item label="Most Bids" value="mostBids" />
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
                <RadioButton.Item key={category} label={category} value={category} />
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
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  searchBar: {
    elevation: 0,
    backgroundColor: "#f0f0f0",
  },
  filterChipsContainer: {
    backgroundColor: "#fff",
    paddingBottom: 10,
    height: 44,
    flexDirection: "row",
    alignItems: "center", 
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterChipsContent: {
    paddingHorizontal: 10,
  },
  filterChip: {
    marginRight: 8,
  },
  activeFiltersContainer: {
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  activeFiltersText: {
    marginRight: 8,
    color: "#666",
  },
  activeFilterChip: {
    marginRight: 8,
    marginBottom: 5,
    backgroundColor: "#e0f7fa",
  },
  itemsContainer: {
    flex: 1,
  },
  itemsGrid: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemCard: {
    width: "48%",
    marginBottom: 15,
    elevation: 2,
  },
  cardContent: {
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
  minBidText: {
    fontSize: 12,
    color: "#757575",
    marginTop: 2,
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
  itemFooter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  condition: {
    fontSize: 12,
    color: "#757575",
  },
  categoryChip: {
    backgroundColor: "#e1f5fe",
    height: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
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
    flexWrap: "wrap",
    padding: 10,
  },
  priceButton: {
    margin: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    width: "100%",
  },
  noResultsText: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 15,
  },
});