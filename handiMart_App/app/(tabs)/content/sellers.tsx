import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface SellerItem {
  id: string;
  name: string;
  image: any;
  subscribers: string;
}

export default function SellersScreen() {
  const router = useRouter();
  
  // Updated seller IDs to match the ones in your CreatorDetails component
  const sellerItems: SellerItem[] = [
    { id: 'bio1', name: 'Alice', image: require('../../../assets/images/icon.png'), subscribers: '4.2M subscribers' },
    { id: 'bio2', name: 'Bob', image: require('../../../assets/images/icon.png'), subscribers: '1.8M subscribers' },
    { id: 'bio3', name: 'Charlie', image: require('../../../assets/images/icon.png'), subscribers: '89K subscribers' },
    { id: 'bio4', name: 'Dave', image: require('../../../assets/images/icon.png'), subscribers: '120K subscribers' },
    { id: 'bio5', name: 'Silva', image: require('../../../assets/images/icon.png'), subscribers: '45K subscribers' },
    { id: 'bio6', name: 'Chad', image: require('../../../assets/images/icon.png'), subscribers: '89K subscribers' }
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Creators</Text>
      </View>
      
      <FlatList
        data={sellerItems}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.sellerItem}
              onPress={() => {
                // Navigate to creator profile when clicked
                // Using the [sellerid].tsx file that exists in your project structure
                router.push({
                  pathname: `/content/seller/${item.id}`
                });
              }}
            >
              <Image
                source={item.image}
                style={styles.creatorAvatar}
                resizeMode="cover"
              />
              <View style={styles.creatorInfo}>
                <Text style={styles.creatorName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.subscriberCount}>
                  {item.subscribers}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  list: {
    flex: 1,
  },
  sellerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  creatorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subscriberCount: {
    fontSize: 14,
    color: '#606060',
  },
});