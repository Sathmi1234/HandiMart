import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  imageUrls: ContentUrlResponse[];
  videoUrls: ContentUrlResponse[];
}

export default function ContentPostDetails() {
  const [contentPost, setContentPost] = useState<ContentItemWithUrls | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<ContentItemWithUrls[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id, title, description, productId } = useLocalSearchParams();
  
  // Replace with your actual backend URL
  const BASE_URL = 'http://192.168.7.149:5454/'; // Update this with your actual backend URL

  // Fetch content post details
  const fetchContentPost = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!id) {
        throw new Error('No content post ID provided');
      }

      console.log('Fetching content post:', id);

      // First, get the content post basic info (we might already have it from params)
      let postData: ContentPostResponse;
      
      if (title && description && productId) {
        // Use the data passed from navigation params
        postData = {
          contentPostId: parseInt(id as string),
          title: title as string,
          description: description as string,
          productId: parseInt(productId as string),
          createdAt: new Date().toISOString() // Fallback date
        };
      } else {
        // Fetch from backend if not provided
        const postResponse = await fetch(`${BASE_URL}content-posts/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!postResponse.ok) {
          throw new Error(`Failed to fetch content post: ${postResponse.status}`);
        }

        postData = await postResponse.json();
      }

      // Fetch content URLs for this post
      const urlsResponse = await fetch(`${BASE_URL}content-urls/content-post/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!urlsResponse.ok) {
        throw new Error(`Failed to fetch content URLs: ${urlsResponse.status}`);
      }

      const urls: ContentUrlResponse[] = await urlsResponse.json();
      
      // Separate image and video URLs
      const imageUrls = urls.filter(url => 
        url.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
      );
      
      const videoUrls = urls.filter(url => 
        url.url.match(/\.(mp4|mov|avi|webm)$/i)
      );

      const contentPostWithUrls: ContentItemWithUrls = {
        ...postData,
        urls,
        imageUrls,
        videoUrls
      };

      setContentPost(contentPostWithUrls);
      
      // Fetch related posts (other posts from the same product or random posts)
      fetchRelatedPosts();

    } catch (err) {
      console.error('Error fetching content post:', err);
      setError(err instanceof Error ? err.message : 'Failed to load content post');
      Alert.alert('Error', 'Failed to load content post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch related posts
  const fetchRelatedPosts = async () => {
    try {
      const postsResponse = await fetch(`${BASE_URL}content-posts/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!postsResponse.ok) {
        console.warn('Failed to fetch related posts');
        return;
      }

      const posts: ContentPostResponse[] = await postsResponse.json();
      
      // Filter out current post and limit to 5 related posts
      const filteredPosts = posts
        .filter(post => post.contentPostId.toString() !== id)
        .slice(0, 5);

      // Get URLs for each related post
      const relatedWithUrls = await Promise.all(
        filteredPosts.map(async (post) => {
          try {
            const urlsResponse = await fetch(`${BASE_URL}content-urls/content-post/${post.contentPostId}`, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });

            if (!urlsResponse.ok) {
              return {
                ...post,
                urls: [],
                imageUrls: [],
                videoUrls: []
              };
            }

            const urls: ContentUrlResponse[] = await urlsResponse.json();
            const imageUrls = urls.filter(url => 
              url.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
            );
            const videoUrls = urls.filter(url => 
              url.url.match(/\.(mp4|mov|avi|webm)$/i)
            );

            return {
              ...post,
              urls,
              imageUrls,
              videoUrls
            };
          } catch (error) {
            console.warn(`Failed to fetch URLs for related post ${post.contentPostId}`);
            return {
              ...post,
              urls: [],
              imageUrls: [],
              videoUrls: []
            };
          }
        })
      );

      setRelatedPosts(relatedWithUrls);
    } catch (error) {
      console.warn('Error fetching related posts:', error);
    }
  };

  useEffect(() => {
    fetchContentPost();
    // Reset active image index when content changes
    setActiveImageIndex(0);
  }, [id]);

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
    fetchContentPost();
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Content Details</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading content...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error || !contentPost) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Content Details</Text>
        </View>
        <View style={styles.errorContainer}>
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
    <ScrollView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Content Details</Text>
      </View>
      
      {/* Content Header - Main Image/Video */}
      <View style={styles.mediaContainer}>
        {contentPost.imageUrls.length > 0 ? (
          <Image
            source={{ uri: contentPost.imageUrls[activeImageIndex].url }}
            style={styles.mainImage}
            onError={(error) => {
              console.warn('Failed to load image:', error);
            }}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Feather name="image" size={48} color="#8E8E93" />
            <Text style={styles.placeholderText}>No image available</Text>
          </View>
        )}
        
        {/* Image indicator dots */}
        {contentPost.imageUrls.length > 1 && (
          <View style={styles.indicatorContainer}>
            {contentPost.imageUrls.map((_, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={() => setActiveImageIndex(index)}
                style={[
                  styles.indicatorDot,
                  activeImageIndex === index && styles.activeDot
                ]}
              />
            ))}
          </View>
        )}
      </View>
      
      {/* Content Info */}
      <View style={styles.contentInfo}>
        <Text style={styles.title}>{contentPost.title}</Text>
        <Text style={styles.date}>{formatDate(contentPost.createdAt)}</Text>
        
        {/* Creator Info - Mock data for now */}
        <View style={styles.creatorContainer}>
          <TouchableOpacity 
            style={styles.creatorProfile}
            onPress={() => {
              // Navigate to creator profile - you can implement this when you have seller data
              console.log('Navigate to creator profile');
              
            }}
          >
            <View style={styles.creatorImagePlaceholder}>
              <Feather name="user" size={20} color="#8E8E93" />
            </View>
            <View style={styles.creatorDetails}>
              <Text style={styles.creatorName}>Content Creator</Text>
              <Text style={styles.subscriberCount}>Creator</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            // Navigate to chat - implement when you have seller data
            console.log('Navigate to chat');
          }}>
            <View style={styles.inboxIconContainer}>
              <Feather name="message-circle" size={24} color="#007AFF" />
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Product Info */}
        <TouchableOpacity 
          style={styles.productContainer}
          onPress={() => {
            // Navigate to product details
            router.push({
              pathname: `/products/${contentPost.productId}`,
            });
          }}
        >
          <View style={styles.productHeader}>
            <Text style={styles.productLabel}>RELATED PRODUCT</Text>
            <Text style={styles.shopNow}>SHOP NOW</Text>
          </View>
          <View style={styles.productDetails}>
            <Text style={styles.productName}>Product ID: {contentPost.productId}</Text>
            <Feather name="external-link" size={16} color="#065FD4" />
          </View>
        </TouchableOpacity>
        
        {/* Description */}
        {contentPost.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{contentPost.description}</Text>
          </View>
        )}

        {/* Resources */}
        {contentPost.urls.length > 0 && (
          <View style={styles.resourcesContainer}>
            <Text style={styles.resourcesTitle}>Resources ({contentPost.urls.length})</Text>
            {contentPost.videoUrls.length > 0 && (
              <Text style={styles.resourceItem}>
                <Feather name="video" size={16} color="#007AFF" /> {contentPost.videoUrls.length} Video{contentPost.videoUrls.length !== 1 ? 's' : ''}
              </Text>
            )}
            {contentPost.imageUrls.length > 0 && (
              <Text style={styles.resourceItem}>
                <Feather name="image" size={16} color="#007AFF" /> {contentPost.imageUrls.length} Image{contentPost.imageUrls.length !== 1 ? 's' : ''}
              </Text>
            )}
          </View>
        )}
      </View>
      
      {/* Related Content */}
      {relatedPosts.length > 0 && (
        <View style={styles.relatedContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Related Content</Text>
            <TouchableOpacity onPress={() => router.push('/content/posts')}>
              <Text style={styles.moreButton}>MORE</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={relatedPosts}
            keyExtractor={item => item.contentPostId.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.relatedItem}
                onPress={() => {
                  router.push({
                    pathname: `/content/post/[id]`,
                    params: { 
                      id: item.contentPostId.toString(),
                      title: item.title,
                      description: item.description,
                      productId: item.productId.toString()
                    },
                  });
                }}
              >
                {item.imageUrls.length > 0 ? (
                  <Image 
                    source={{ uri: item.imageUrls[0].url }} 
                    style={styles.relatedThumbnail} 
                    onError={() => {
                      console.warn(`Failed to load related thumbnail: ${item.imageUrls[0].url}`);
                    }}
                  />
                ) : (
                  <View style={styles.relatedThumbnailPlaceholder}>
                    <Feather name="image" size={24} color="#8E8E93" />
                  </View>
                )}
                <Text style={styles.relatedTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.relatedMeta}>{formatDate(item.createdAt)}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ScrollView>
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
    marginLeft: 16,
  },
  loadingContainer: {
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FF3B30',
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
  mediaContainer: {
    position: 'relative',
    width: '100%',
    height: 240,
    backgroundColor: '#e0e0e0',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 14,
    color: '#8E8E93',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  contentInfo: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 16,
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  creatorProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  creatorImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  creatorDetails: {
    marginLeft: 12,
  },
  creatorName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  subscriberCount: {
    fontSize: 12,
    color: '#606060',
  },
  inboxIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  productContainer: {
    marginVertical: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productLabel: {
    fontSize: 12,
    color: '#606060',
    fontWeight: '500',
  },
  shopNow: {
    color: '#065FD4',
    fontWeight: '500',
    fontSize: 12,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  descriptionContainer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#303030',
  },
  resourcesContainer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  resourcesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resourceItem: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  relatedContent: {
    backgroundColor: '#fff',
    marginTop: 8,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moreButton: {
    color: '#065FD4',
    fontSize: 14,
    fontWeight: '500',
  },
  relatedItem: {
    width: 160,
    marginLeft: 16,
    marginBottom: 8,
  },
  relatedThumbnail: {
    width: 160,
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
  },
  relatedThumbnailPlaceholder: {
    width: 160,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  relatedMeta: {
    fontSize: 12,
    color: '#606060',
  },
});