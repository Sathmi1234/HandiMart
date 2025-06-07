import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Mock data for creators
const mockCreators = {
  'bio1': {
    id: 'bio1',
    name: 'Alice',
    profileImage: require('../../../../assets/images/icon.png'),
    bio: 'Digital artist specializing in concept art and tutorials.',
    subscribers: '4.2M subscribers',
    content: [
      { id: '1', title: 'Concept Art Process', thumbnail: require('../../../../assets/images/icon.png') },
      { id: '2', title: 'Advanced Composition', thumbnail: require('../../../../assets/images/icon.png') },
      { id: '3', title: 'Lighting Techniques', thumbnail: require('../../../../assets/images/icon.png') },
    ],
  },
  'bio2': {
    id: 'bio2',
    name: 'Bob',
    profileImage: require('../../../../assets/images/icon.png'),
    bio: 'Expert in color theory and digital painting techniques.',
    subscribers: '1.8M subscribers',
    content: [
      { id: '4', title: 'Color Theory Fundamentals', thumbnail: require('../../../../assets/images/icon.png') },
      { id: '5', title: 'Creating Realistic Textures', thumbnail: require('../../../../assets/images/icon.png') },
    ],
  },
  'bio3': {
    id: 'bio3',
    name: 'Charlie',
    profileImage: require('../../../../assets/images/icon.png'),
    bio: 'Illustrator with a focus on character design.',
    subscribers: '89K subscribers',
    content: [
      { id: '6', title: 'Character Design Basics', thumbnail: require('../../../../assets/images/icon.png') },
    ],
  },
  'bio4': {
    id: 'bio4',
    name: 'Dave',
    profileImage: require('../../../../assets/images/icon.png'),
    bio: 'Traditional artist with digital skills.',
    subscribers: '120K subscribers',
    content: [
      { id: '7', title: 'Traditional to Digital', thumbnail: require('../../../../assets/images/icon.png') },
    ],
  },
  'bio5': {
    id: 'bio5',
    name: 'Silva',
    profileImage: require('../../../../assets/images/icon.png'),
    bio: 'Animation expert and storyteller.',
    subscribers: '45K subscribers',
    content: [
      { id: '8', title: 'Animation Fundamentals', thumbnail: require('../../../../assets/images/icon.png') },
    ],
  },
  'bio6': {
    id: 'bio6',
    name: 'Chad',
    profileImage: require('../../../../assets/images/icon.png'),
    bio: 'Game art designer and concept artist.',
    subscribers: '89K subscribers',
    content: [
      { id: '9', title: 'Game Environment Design', thumbnail: require('../../../../assets/images/icon.png') },
    ],
  },
};

export default function CreatorDetails() {
  const [creator, setCreator] = useState(null);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  useEffect(() => {
    // Fetch creator details from mock data
    if (id && mockCreators[id]) {
      setCreator(mockCreators[id]);
    }
  }, [id]);

  if (!creator) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading creator details... ID: {id}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity  onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Creator Profile */}
      <View style={styles.profileContainer}>
        <Image source={creator.profileImage} style={styles.profileImage} />
        <Text style={styles.creatorName}>{creator.name}</Text>
        <Text style={styles.subscriberCount}>{creator.subscribers}</Text>
        <Text style={styles.bio}>{creator.bio}</Text>
        <TouchableOpacity>
          <View style={styles.inboxIconContainer}>
            <Text style={styles.inboxIcon}>✉️</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Creator's Content */}
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Content by {creator.name}</Text>
        <FlatList
          data={creator.content}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contentItem}
              onPress={() => {
                // Navigate to content details
                router.push({
                  pathname: `/content/post/${item.id}`,
                });
              }}
            >
              <Image source={item.thumbnail} style={styles.contentThumbnail} />
              <Text style={styles.contentTitle} numberOfLines={2}>
                {item.title}
              </Text>
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
  inboxIconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inboxIcon: {
    fontSize: 24,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  creatorName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subscriberCount: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#303030',
    textAlign: 'center',
  },
  contentSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contentItem: {
    marginRight: 16,
    width: 160,
  },
  contentThumbnail: {
    width: 160,
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
});