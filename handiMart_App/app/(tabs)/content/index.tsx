import React, { useState, useEffect } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'; 
import { useRouter } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

// Define interfaces based on your backend response
interface ContentPostResponse {
  contentPostId: number;
  title: string;
  description: string;
  productId: number;
  createdAt: string;
}

interface ContentUrlResponse {
  contentUrlId: number;
  url: string;
  contentPostId: number;
}

interface ContentItemWithUrls extends ContentPostResponse {
  urls: ContentUrlResponse[];
  thumbnailUrl?: string;
}

interface SellerItem {
  id: string;
  name: string;
  image: any;
  subscribers: string;
}

export default function ContentScreen() {
  const router = useRouter();
  const [contentPosts, setContentPosts] = useState<ContentItemWithUrls[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your actual backend URL
  const BASE_URL = 'http://192.168.7.149:5454/'; // Update this with your actual backend URL
  
  // Fetch content posts from backend (limited to first 3 for homepage)
  const fetchContentPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Attempting to fetch from:', `${BASE_URL}content-posts/`);

      const postsResponse = await fetch(`${BASE_URL}content-posts/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!postsResponse.ok) {
        const errorText = await postsResponse.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server returned ${postsResponse.status}: ${errorText}`);
      }

      const posts: ContentPostResponse[] = await postsResponse.json();
      
      if (!Array.isArray(posts)) {
        throw new Error('Invalid response format: expected an array of posts');
      }

      // Limit to first 3 posts for homepage display
      const limitedPosts = posts.slice(0, 3);

      const postsWithUrls: ContentItemWithUrls[] = await Promise.all(
        limitedPosts.map(async (post) => {
          try {
            const urlsResponse = await fetch(`${BASE_URL}content-urls/content-post/${post.contentPostId}`, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });

            if (!urlsResponse.ok) {
              throw new Error(`Failed to fetch URLs: ${urlsResponse.status}`);
            }

            const urls: ContentUrlResponse[] = await urlsResponse.json();
            
            // Find the first image URL as thumbnail
            const thumbnailUrl = urls.find(url => 
              url.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
            )?.url;

            return {
              ...post,
              urls,
              thumbnailUrl
            };
          } catch (urlError) {
            console.warn(`Failed to fetch URLs for post ${post.contentPostId}:`, urlError);
            return {
              ...post,
              urls: [],
              thumbnailUrl: undefined
            };
          }
        })
      );

      setContentPosts(postsWithUrls);
    } catch (err) {
      console.error('Error fetching content posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentPosts();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };
  
  // Keep the mock seller data for now
  const sellerItems: SellerItem[] = [
    { id: 'bio1', name: 'Alice', image: require('../../../assets/images/icon.png'), subscribers: '120K subscribers' },
    { id: 'bio2', name: 'Bob', image: require('../../../assets/images/icon.png'), subscribers: '45K subscribers' },
    { id: 'bio3', name: 'Charlie', image: require('../../../assets/images/icon.png'), subscribers: '89K subscribers' }
  ];
  
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Content</Text>
        <IconButton
          icon="magnify"
          size={24}
          onPress={() => console.log("Search pressed")}
        />
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Content Posts</Text>
        <TouchableOpacity onPress={() => router.push('/content/posts')}>
          <Text style={styles.moreButton}>MORE</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Loading content...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={24} color="#FF3B30" />
          <Text style={styles.errorText}>Failed to load content</Text>
          <TouchableOpacity onPress={fetchContentPosts} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : contentPosts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="file-text" size={24} color="#8E8E93" />
          <Text style={styles.emptyText}>No content posts available</Text>
        </View>
      ) : (
        <FlatList
          data={contentPosts}
          keyExtractor={(item) => item.contentPostId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.contentItem}
              onPress={() => {
                router.push({
                  pathname: "/content/post/[id]",
                  params: { 
                    id: item.contentPostId.toString(),
                    title: item.title,
                    description: item.description || '',
                    productId: item.productId.toString()
                  },
                });
              }}
            >
              <View style={styles.contentLayout}>
                {item.thumbnailUrl ? (
                  <Image
                    source={{ uri: item.thumbnailUrl }}
                    style={styles.videoThumbnail}
                    resizeMode="cover"
                    onError={() => {
                      console.warn(`Failed to load thumbnail: ${item.thumbnailUrl}`);
                    }}
                  />
                ) : (
                  <View style={styles.placeholderThumbnail}>
                    <Feather name="image" size={32} color="#8E8E93" />
                  </View>
                )}
                <View style={styles.videoInfoContainer}>
                  <Text style={styles.videoTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.videoMeta}>
                    Product ID: {item.productId} • {formatDate(item.createdAt)}
                  </Text>
                  {item.description && (
                    <Text style={styles.videoSubtitle} numberOfLines={2}>
                      {item.description}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Creators</Text>
        <TouchableOpacity onPress={() => router.push('/content/sellers')}>
          <Text style={styles.moreButton}>MORE</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sellerItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity 
              style={styles.sellerItem}
              onPress={() => {
                router.push({
                  pathname: "/content/seller/[id]",
                  params: { id: String(item.id)},
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
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 5,
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
  moreButton: {
    color: '#065FD4',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: '#E6F0FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  contentItem: {
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  contentLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  videoThumbnail: {
    width: 160,
    height: 90,
    borderRadius: 8,
  },
  placeholderThumbnail: {
    width: 160,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'flex-start',
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  videoMeta: {
    fontSize: 13,
    color: '#606060',
    marginBottom: 2,
  },
  videoSubtitle: {
    fontSize: 13,
    color: '#606060',
  },
  sellerItem: {
    marginRight: 16,
    marginBottom: 16,
    width: 100,
    alignItems: 'center',
  },
  creatorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  creatorInfo: {
    width: '100%',
    alignItems: 'center',
    marginTop: 6,
  },
  creatorName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subscriberCount: {
    fontSize: 12,
    color: '#606060',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#8E8E93',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: '#FF3B30',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});