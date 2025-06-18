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

export default function ContentPostsScreen() {
  const router = useRouter();
  const [contentPosts, setContentPosts] = useState<ContentItemWithUrls[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your actual backend URL
  const BASE_URL = 'http://192.168.7.149:5454/'; // Update this with your actual backend URL

  // Fetch content posts from backend
const fetchContentPosts = async () => {
  try {
    setLoading(true);
    setError(null);

    // Add detailed error logging
    console.log('Attempting to fetch from:', `${BASE_URL}content-posts/`);

    // Fetch all content posts with proper headers
    const postsResponse = await fetch(`${BASE_URL}content-posts/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Log the response status and headers for debugging
    console.log('Response status:', postsResponse.status);
    console.log('Response headers:', [...postsResponse.headers.entries()]);

    if (!postsResponse.ok) {
      // Try to get more details about the error
      const errorText = await postsResponse.text();
      console.error('Server error response:', errorText);
      throw new Error(`Server returned ${postsResponse.status}: ${errorText}`);
    }

    const posts: ContentPostResponse[] = await postsResponse.json();
    
    // Validate the response data
    if (!Array.isArray(posts)) {
      throw new Error('Invalid response format: expected an array of posts');
    }

    // Rest of your existing code...
    const postsWithUrls: ContentItemWithUrls[] = await Promise.all(
      posts.map(async (post) => {
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
      Alert.alert('Error', 'Failed to load content posts. Please try again.');
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

  // Retry function
  const handleRetry = () => {
    fetchContentPosts();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Content Posts</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading content posts...</Text>
        </View>
      </View>
    );
  }

  if (error && contentPosts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Content Posts</Text>
        </View>
        <View style={styles.centerContainer}>
          <Feather name="alert-circle" size={48} color="#FF3B30" />
          <Text style={styles.errorText}>Failed to load content</Text>
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
        <Text style={styles.headerTitle}>All Content Posts</Text>
        <TouchableOpacity onPress={handleRetry} style={styles.refreshButton}>
          <Feather name="refresh-cw" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      {contentPosts.length === 0 ? (
        <View style={styles.centerContainer}>
          <Feather name="file-text" size={48} color="#8E8E93" />
          <Text style={styles.emptyText}>No content posts available</Text>
        </View>
      ) : (
        <FlatList
          data={contentPosts}
          keyExtractor={(item) => item.contentPostId.toString()}
          style={styles.list}
          onRefresh={handleRetry}
          refreshing={loading}
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
                      // Handle image load error
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
                  {item.urls.length > 0 && (
                    <Text style={styles.urlCount}>
                      {item.urls.length} resource{item.urls.length !== 1 ? 's' : ''}
                    </Text>
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
  contentItem: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    marginBottom: 2,
  },
  urlCount: {
    fontSize: 12,
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