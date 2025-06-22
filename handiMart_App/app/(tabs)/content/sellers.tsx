import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define interfaces based on your backend response
interface SellerProfileResponse {
  profileID: number;
  bio: string;
  featuredFlag: boolean;
  rating: number | null;
  ratingCount: number;
  status: 'NEW' | 'STANDARD' | 'PREMIUM' | 'ELITE';
  tags: string[];
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl?: string;
  };
}

interface SellerItem {
  id: string;
  name: string;
  image: any;
  subscribers: string;
  rating: number | null;
  ratingCount: number;
  status: string;
  bio: string;
  tags: string[];
  featuredFlag: boolean;
}

export default function SellersScreen() {
  const router = useRouter();
  const [sellers, setSellers] = useState<SellerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your actual backend URL
  const BASE_URL = 'http://192.168.7.149:5454';

  // Fetch sellers from backend
const fetchSellers = async () => {
  try {
    setLoading(true);
    setError(null);

    // Get the authentication token from your auth storage
    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('Attempting to fetch sellers from:', `${BASE_URL}/sellers/`);

    const response = await fetch(`${BASE_URL}/sellers/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add authentication header
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response:', errorText);
      
      if (response.status === 403) {
        throw new Error('You do not have permission to view sellers');
      }
      
      throw new Error(`Server returned ${response.status}: ${errorText}`);
    }

    // ...existing code...
  } catch (err) {
    console.error('Error fetching sellers:', err);
    setError(err instanceof Error ? err.message : 'Failed to load sellers');
    
  } finally {
    setLoading(false);
  }
};

  // Format subscriber/rating count for display
  const formatSubscriberCount = (count: number): string => {
    if (count === 0) return 'No ratings yet';
    if (count === 1) return '1 rating';
    if (count < 1000) return `${count} ratings`;
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K ratings`;
    return `${(count / 1000000).toFixed(1)}M ratings`;
  };

  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'NEW': return '#34C759';
      case 'STANDARD': return '#007AFF';
      case 'PREMIUM': return '#FF9500';
      case 'ELITE': return '#AF52DE';
      default: return '#8E8E93';
    }
  };

  // Retry function
  const handleRetry = () => {
    fetchSellers();
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Creators</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading creators...</Text>
        </View>
      </View>
    );
  }

  if (error && sellers.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Creators</Text>
        </View>
        <View style={styles.centerContainer}>
          <Feather name="alert-circle" size={48} color="#FF3B30" />
          <Text style={styles.errorText}>Failed to load creators</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Creators</Text>
        <TouchableOpacity onPress={handleRetry} style={styles.refreshButton}>
          <Feather name="refresh-cw" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      {sellers.length === 0 ? (
        <View style={styles.centerContainer}>
          <Feather name="users" size={48} color="#8E8E93" />
          <Text style={styles.emptyText}>No creators available</Text>
        </View>
      ) : (
        <FlatList
          data={sellers}
          keyExtractor={(item) => item.id}
          style={styles.list}
          onRefresh={handleRetry}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.sellerItem}
              onPress={() => {
                router.push({
                  pathname: "/content/seller/[id]",
                  params: { 
                    id: item.id,
                    name: item.name,
                    bio: item.bio,
                    rating: item.rating?.toString() || '0',
                    ratingCount: item.ratingCount.toString(),
                    status: item.status,
                    tags: item.tags.join(','),
                    featuredFlag: item.featuredFlag.toString()
                  },
                });
              }}
            >
              <View style={styles.sellerLayout}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={item.image}
                    style={styles.creatorAvatar}
                    resizeMode="cover"
                    onError={() => {
                      console.warn(`Failed to load avatar for ${item.name}`);
                    }}
                  />
                  {item.featuredFlag && (
                    <View style={styles.featuredBadge}>
                      <Feather name="star" size={12} color="white" />
                    </View>
                  )}
                </View>
                
                <View style={styles.creatorInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.creatorName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.ratingRow}>
                    {item.rating !== null ? (
                      <>
                        <View style={styles.ratingContainer}>
                          <Feather name="star" size={14} color="#FFD700" />
                          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                        </View>
                        <Text style={styles.subscriberCount}>
                          {item.subscribers}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.subscriberCount}>
                        {item.subscribers}
                      </Text>
                    )}
                  </View>
                  
                  {item.bio && (
                    <Text style={styles.bioText} numberOfLines={2}>
                      {item.bio}
                    </Text>
                  )}
                  
                  {item.tags.length > 0 && (
                    <View style={styles.tagsContainer}>
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                      {item.tags.length > 3 && (
                        <Text style={styles.moreTagsText}>+{item.tags.length - 3}</Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
    marginLeft: 16,
  },
  refreshButton: {
    padding: 4,
  },
  list: {
    flex: 1,
  },
  sellerItem: {
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sellerLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
  },
  creatorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  featuredBadge: {
    position: 'absolute',
    top: -2,
    right: 8,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  creatorInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  creatorName: {
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 2,
    color: '#333',
  },
  subscriberCount: {
    fontSize: 14,
    color: '#606060',
  },
  bioText: {
    fontSize: 13,
    color: '#606060',
    marginBottom: 8,
    lineHeight: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  moreTagsText: {
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '500',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});