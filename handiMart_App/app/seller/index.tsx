import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get("window");
const itemWidth = width * 0.45;

export default function SellerProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Items");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/HandiMartLogo.png')} 
          style={styles.logo}
        />
        <TouchableOpacity>
          <Feather name="bell" size={24} color="black" />
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
          </>
        ) : (
        <></>
        )}
      </ScrollView>

      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fabAdd}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fabChat}>
          <Feather name="message-square" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
});
