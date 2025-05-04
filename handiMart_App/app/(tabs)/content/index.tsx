import React from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

// Define types
interface ContentItem {
  id: string;
  title: string;
  author: string;
  thumbnail: any;
  type: string;
  postedTime: string;
}

interface SellerItem {
  id: string;
  name: string;
  image: any;
  subscribers: string;
}

export default function ContentScreen() {
  
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
    }
  ];
  
  const sellerItems: SellerItem[] = [
    { id: 'bio1', name: 'Alice', image: require('../../../assets/images/icon.png'), subscribers: '120K subscribers' },
    { id: 'bio2', name: 'Bob', image: require('../../../assets/images/icon.png'), subscribers: '45K subscribers' },
    { id: 'bio3', name: 'Charlie', image: require('../../../assets/images/icon.png'), subscribers: '89K subscribers' }
  ];
  
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Content Posts</Text>
        <TouchableOpacity >
          <Text style={styles.moreButton}>MORE</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contentItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (!item || !item.thumbnail) return null;
          
          return (
            <TouchableOpacity style={styles.contentItem}>
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
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Creators</Text>
        <TouchableOpacity>
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
});