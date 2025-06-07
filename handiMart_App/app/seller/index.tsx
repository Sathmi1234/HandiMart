import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from '@expo/vector-icons';
import AddOptionsModal from './addOptionModal'; // Import the modal component

const { width } = Dimensions.get("window");
const itemWidth = width * 0.45;

export default function SellerProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Items");
  const [modalVisible, setModalVisible] = useState(false);

  // Dummy content posts data
  const contentPosts = [
    {
      id: 1,
      title: "How I make dreamcatchers",
      image: require('../../assets/images/home/dreamcatcher.jpeg'),
      description: "In this tutorial, I'll show you my process for creating handmade dreamcatchers using natural materials.",
      likes: 124,
      comments: 18,
      date: new Date(2025, 4, 12)
    },
    {
      id: 2,
      title: "Spring collection inspiration",
      image: require('../../assets/images/home/flowers.jpeg'),
      description: "The flowers are blooming and spring is here! Check out what's inspiring my new seasonal collection.",
      likes: 89,
      comments: 7,
      date: new Date(2025, 4, 5)
    },
    {
      id: 3,
      title: "Craft fair highlights",
      image: require('../../assets/images/home/summer.jpeg'),
      description: "Had an amazing weekend at the Downtown Summer Craft Fair. Thank you to everyone who stopped by!",
      likes: 156,
      comments: 22,
      date: new Date(2025, 4, 1)
    }
  ];

  const formatDate = (date) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleAddProduct = () => {
    router.push('/seller/addProduct');
  };

  const handleAddPost = () => {
    router.push('/seller/addPost');
  };

  const renderProductItem = (price, rating, reviews) => (
    <View style={styles.productCard} key={`${price}-${reviews}-${Math.random()}`}>
      <Image 
        source={require('../../assets/images/home/dreamcatcher.jpeg')} 
        style={styles.productImage}
      />
      <View style={styles.productActions}>
        <View style={styles.actionIcons}>
          <TouchableOpacity>
            <Feather name="trash-2" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editIcon}>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.priceText}>{price}$</Text>
      </View>
      <Text style={styles.productTitle}>Dreamcatcher</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Feather 
            key={star} 
            name="star" 
            size={18} 
            color={star <= rating ? "#FFD700" : "#e0e0e0"} 
          />
        ))}
        <Text style={styles.reviewCount}>({reviews})</Text>
      </View>
    </View>
  );

  const renderContentPost = (post) => (
    <View style={styles.contentCard} key={post.id}>
      <View style={styles.contentHeader}>
        <Image 
          source={require('../../assets/images/icon.png')} 
          style={styles.contentAuthorImage}
        />
        <View style={styles.contentHeaderText}>
          <Text style={styles.contentAuthorName}>Alice</Text>
          <Text style={styles.contentDate}>{formatDate(post.date)}</Text>
        </View>
      </View>
      <Text style={styles.contentTitle}>{post.title}</Text>
      <Image source={post.image} style={styles.contentImage} />
      <Text style={styles.contentDescription}>{post.description}</Text>
      <View style={styles.contentActions}>
        <View style={styles.contentAction}>
          <Feather name="heart" size={20} color="#555" />
          <Text style={styles.contentActionText}>{post.likes}</Text>
        </View>
        <View style={styles.contentAction}>
          <Feather name="message-circle" size={20} color="#555" />
          <Text style={styles.contentActionText}>{post.comments}</Text>
        </View>
        <View style={styles.contentAction}>
          <Feather name="share-2" size={20} color="#555" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/HandiMartLogo.png')} 
          style={styles.logo}
        />
        <TouchableOpacity>
          <Feather
              name="bell"
              size={24}
              color="black"
              style={styles.icon}
              onPress={() => router.push('/seller/notification')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image 
            source={require('../../assets/images/icon.png')} 
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Alice</Text>
          <View style={styles.detailsCard}>
            <Text style={styles.detailsText}>Details</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "Items" && styles.activeTab]} 
            onPress={() => setActiveTab("Items")}
          >
            <Text style={[styles.tabText, activeTab === "Items" && styles.activeTabText]}>Items</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "Content" && styles.activeTab]} 
            onPress={() => setActiveTab("Content")}
          >
            <Text style={[styles.tabText, activeTab === "Content" && styles.activeTabText]}>Content</Text>
          </TouchableOpacity>
        </View>

        {activeTab === "Items" ? (
          <>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Fixed Price Items</Text>
              <View style={styles.productsGrid}>
                {renderProductItem("14", 4, 3)}
                {renderProductItem("14", 4, 9)}
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Bidding Items</Text>
              <View style={styles.productsGrid}>
                {renderProductItem("14", 4, 0)}
                {renderProductItem("14", 4, 0)}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.contentContainer}>
            {contentPosts.map(post => renderContentPost(post))}
          </View>
        )}
      </ScrollView>

      <View style={styles.fabContainer}>
        <Pressable 
          style={({ pressed }) => [
            styles.fabAdd,
            pressed && styles.fabPressed
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="plus" size={24} color="white" />
        </Pressable>
        
        <Pressable 
          style={({ pressed }) => [
            styles.fabChat,
            pressed && styles.fabPressed
          ]}
          onPress={() => router.push('/seller/inbox')}
        >
          <Feather name="message-square" size={24} color="white" />
        </Pressable>
      </View>

      <AddOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddProduct={handleAddProduct}
        onAddPost={handleAddPost}
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  scrollView: {
    flex: 1,
  },
  icon: {
    marginLeft: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsCard: {
    width: "90%",
    backgroundColor: "#e0e0e0",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#7BD8FE",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#000",
  },
  sectionContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: itemWidth,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 170,
    resizeMode: "cover",
  },
  productActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionIcons: {
    flexDirection: "row",
  },
  editIcon: {
    marginLeft: 16,
  },
  priceText: {
    fontSize: 18,
    color: "#E24C4C",
    fontWeight: "bold",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  reviewCount: {
    marginLeft: 4,
    color: "#777",
  },
  contentContainer: {
    padding: 16,
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contentAuthorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contentHeaderText: {
    justifyContent: "center",
  },
  contentAuthorName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  contentDate: {
    color: "#777",
    fontSize: 12,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contentImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  contentDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  contentActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  contentAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentActionText: {
    marginLeft: 4,
    color: "#555",
    fontSize: 16,
  },
  fabContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  fabAdd: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E24C4C",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 5,
  },
  fabChat: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E24C4C",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
    fabPressed: {
    backgroundColor: "#B73E3E",
    transform: [{ scale: 0.95 }],
    elevation: 2,
  },
});
