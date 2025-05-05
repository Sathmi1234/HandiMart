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

interface SellerItem {
  id: string;
  name: string;
  image: any;
  subscribers: string;
}

export default function SellersScreen() {
  const router = useRouter();

  const sellerItem: SellerItem[] = [
    { id: 'bio1', name: 'Alice', image: require('../../../assets/images/icon.png'), subscribers: '120K subscribers' },
    { id: 'bio2', name: 'Bob', image: require('../../../assets/images/icon.png'), subscribers: '45K subscribers' },
    { id: 'bio3', name: 'Charlie', image: require('../../../assets/images/icon.png'), subscribers: '89K subscribers' },
    { id: 'bio4', name: 'Dave', image: require('../../../assets/images/icon.png'), subscribers: '120K subscribers' },
    { id: 'bio5', name: 'Silva', image: require('../../../assets/images/icon.png'), subscribers: '45K subscribers' },
    { id: 'bio6', name: 'Chad', image: require('../../../assets/images/icon.png'), subscribers: '89K subscribers' }

  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Sellers</Text>
      </View>
      
      <FlatList
        data={sellerItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.sellerItem}>
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
  backButton: {
    marginRight: 16,
    backgroundColor: '#E6F0FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#065FD4',
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