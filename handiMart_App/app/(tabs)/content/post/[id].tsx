import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

// Mock data structure matching the Java backend model
const mockContentPosts = {
  '1': {
    contentPostId: 1,
    urls: [
      { id: 1, url: '../../../../assets/images/icon.png', type: 'IMAGE' },
      { id: 2, url: '../../../../assets/images/icon.png', type: 'IMAGE' },
      { id: 3, url: 'https://example.com/video.mp4', type: 'VIDEO' }
    ],
    product: {
      productId: 101,
      name: 'Digital Art Brushes Package',
      price: 24.99,
      seller: {
        id: 'bio1',
        name: 'Alice',
        profileImage: require('../../../../assets/images/icon.png')
      }
    },
    title: 'Complete Guide to Digital Art Brushes',
    description: 'Learn how to use the included brushes to create stunning digital artwork. This comprehensive guide covers techniques for beginners to advanced artists.',
    createdAt: '2025-04-29T10:15:30'
  },
  '2': {
    contentPostId: 2,
    urls: [
      { id: 4, url: '../../../../assets/images/icon.png', type: 'IMAGE' },
      { id: 5, url: '../../../../assets/images/icon.png', type: 'IMAGE' }
    ],
    product: {
      productId: 102,
      name: 'Composition Framework Templates',
      price: 19.99,
      seller: {
        id: 'bio1',
        name: 'Alice',
        profileImage: require('../../../../assets/images/icon.png')
      }
    },
    title: 'Advanced Composition',
    description: 'Master the art of composition with these professional templates and techniques. Learn how to create balanced and visually appealing artwork.',
    createdAt: '2025-04-22T14:30:00'
  },
  '3': {
    contentPostId: 3,
    urls: [
      { id: 6, url: '../../../../assets/images/icon.png', type: 'IMAGE' },
      { id: 7, url: '../../../../assets/images/icon.png', type: 'IMAGE' },
      { id: 8, url: 'https://example.com/lighting_tutorial.mp4', type: 'VIDEO' }
    ],
    product: {
      productId: 103,
      name: 'Lighting Effects Pack',
      price: 29.99,
      seller: {
        id: 'bio1',
        name: 'Alice',
        profileImage: require('../../../../assets/images/icon.png')
      }
    },
    title: 'Lighting Techniques',
    description: 'Transform your artwork with professional lighting techniques. This guide provides step-by-step instructions for creating realistic lighting effects.',
    createdAt: '2025-04-15T09:45:00'
  },
  '4': {
    contentPostId: 4,
    urls: [
      { id: 9, url: '../../../../assets/images/icon.png', type: 'IMAGE' },
      { id: 10, url: '../../../../assets/images/icon.png', type: 'IMAGE' }
    ],
    product: {
      productId: 104,
      name: 'Color Theory Workbook',
      price: 15.99,
      seller: {
        id: 'bio2',
        name: 'Bob',
        profileImage: require('../../../../assets/images/icon.png')
      }
    },
    title: 'Color Theory Fundamentals',
    description: 'Understanding color theory is essential for any artist. This guide explains color relationships, harmony, and how to create effective color palettes.',
    createdAt: '2025-04-06T16:20:00'
  }
};


export default function ContentPostDetails() {
  const [contentPost, setContentPost] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  useEffect(() => {
    // In a real app, you would fetch from an API instead of using mock data
    if (id && mockContentPosts[id]) {
      setContentPost(mockContentPosts[id]);
    }
    // Reset active image index when content changes
    setActiveImageIndex(0);
  }, [id]);

  // If content not found or still loading
  if (!contentPost) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading content...</Text>
      </View>
    );
  }

  // Filter out image URLs for the carousel
  const imageUrls = contentPost?.urls?.filter(url => url.type === 'IMAGE') || [];
  
  // Get the video URL if available
  const videoUrl = contentPost?.urls?.find(url => url.type === 'VIDEO')?.url;

  return (
    <ScrollView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity 
        onPress={() => router.back()}
      >
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      
      {/* Content Header - Main Image/Video */}
      <View style={styles.mediaContainer}>
        {imageUrls.length > 0 && (
          <Image
            source={{ uri: imageUrls[activeImageIndex].url }}
            style={styles.mainImage}
            defaultSource={require('../../../../assets/images/icon.png')}
          />
        )}
        
        {/* Image indicator dots */}
        {imageUrls.length > 1 && (
          <View style={styles.indicatorContainer}>
            {imageUrls.map((_, index) => (
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
        
        {/* Creator Info */}
        <View style={styles.creatorContainer}>
          <TouchableOpacity 
            style={styles.creatorProfile}
            onPress={() => {
              // Navigate to creator profile
              router.push({
                pathname: `/content/seller/${contentPost.product.seller.id}`,
              });
            }}
          >
            <Image 
              source={contentPost.product?.seller?.profileImage} 
              style={styles.creatorImage}
            />
            <View style={styles.creatorDetails}>
              <Text style={styles.creatorName}>{contentPost.product?.seller?.name}</Text>
              <Text style={styles.subscriberCount}>4.2M subscribers</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push({
            pathname: '/seller/chat',
            params: { 
              senderName: contentPost.product?.seller?.name,
              senderId: contentPost.product?.seller?.id
            }
          })}>
            <View style={styles.inboxIconContainer}>
              <Text style={styles.inboxIcon}>✉️</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Product Info */}
        <TouchableOpacity 
          style={styles.productContainer}
          onPress={() => {
            // Navigate to product details
            router.push({
              pathname: `/products/${contentPost.product.productId}`,
            });
          }}
        >
          <View style={styles.productHeader}>
            <Text style={styles.productLabel}>RELATED PRODUCT</Text>
            <Text style={styles.shopNow}>SHOP NOW</Text>
          </View>
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{contentPost.product?.name}</Text>
            <Text style={styles.productPrice}>${contentPost.product?.price}</Text>
          </View>
        </TouchableOpacity>
        
        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{contentPost.description}</Text>
        </View>
      </View>
      
      {/* Related Content */}
      <View style={styles.relatedContent}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>More from {contentPost.product?.seller?.name}</Text>
          <TouchableOpacity>
            <Text style={styles.moreButton}>MORE</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            { id: '1', title: 'Advanced Sketching Techniques', thumbnail: require('../../../../assets/images/icon.png') },
            { id: '2', title: 'Color Theory for Digital Art', thumbnail: require('../../../../assets/images/icon.png') },
            { id: '3', title: 'Creating Realistic Textures', thumbnail: require('../../../../assets/images/icon.png') }
          ]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.relatedItem}
              onPress={() => {
                // Navigate to related content
                router.push({
                  pathname: `/content/post/${item.id}`,
                });
              }}
            >
              <Image source={item.thumbnail} style={styles.relatedThumbnail} />
              <Text style={styles.relatedTitle} numberOfLines={2}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  creatorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inboxIcon: {
    fontSize: 24,
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
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#065FD4',
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
  relatedTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
});