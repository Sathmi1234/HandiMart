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

interface ContentItem {
  id: string;
  title: string;
  author: string;
  thumbnail: any;
  type: string;
  postedTime: string;
}

export default function ContentPostsScreen() {
  const router = useRouter();

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Concept Art Process',
      author: 'Alice',
      thumbnail: require('../../../assets/images/icon.png'),
      type: 'tutorial',
      postedTime: '2 days ago'
    },
    {
      id: '2',
      title: 'Advanced Composition',
      author: 'Alice',
      thumbnail: require('../../../assets/images/icon.png'),
      type: 'tutorial',
      postedTime: '1 week ago'
    },
    {
      id: '3',
      title: 'Lighting Techniques',
      author: 'Alice',
      thumbnail: require('../../../assets/images/icon.png'),
      type: 'tutorial',
      postedTime: '3 weeks ago'
    },
    {
      id: '4',
      title: 'Color Theory Fundamentals',
      author: 'Bob',
      thumbnail: require('../../../assets/images/icon.png'),
      type: 'tutorial',
      postedTime: '1 month ago'
    },
    {
      id: '5',
      title: 'Digital Painting Workshop',
      author: 'Charlie',
      thumbnail: require('../../../assets/images/icon.png'),
      type: 'tutorial',
      postedTime: '5 weeks ago'
    },
    {
      id: '6',
      title: 'Character Design Basics',
      author: 'Alice',
      thumbnail: require('../../../assets/images/icon.png'),
      type: 'tutorial',
      postedTime: '2 months ago'
    }
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Content Posts</Text>
      </View>
      
      <FlatList
        data={contentItems}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => {
          if (!item || !item.thumbnail) return null;
          
          return (
            <TouchableOpacity 
              style={styles.contentItem}
              onPress={() => {
                // Navigate to content post details when clicked
                router.push({
                  pathname: `/content/post/${item.id}`
                });
              }}
            >
              <View style={styles.contentLayout}>
                <Image
                  source={item.thumbnail}
                  style={styles.videoThumbnail}
                  resizeMode="cover"
                />
                <View style={styles.videoInfoContainer}>
                  <Text style={styles.videoTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.videoMeta}>{item.author} • {item.postedTime}</Text>
                  <Text style={styles.videoSubtitle}>Part 1: Sketching</Text>
                </View>
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
});