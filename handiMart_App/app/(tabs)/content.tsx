import React from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

export default function ContentScreen() {
  const navigation = useNavigation();
  
  const contentItems = [
    {
      id: '1',
      title: 'Concept Art Process',
      author: 'Alice',
      thumbnail: require('../../assets/images/icon.png'),
      type: 'tutorial',
      postedTime: '2 days ago'
    },
    {
      id: '2',
      title: 'Advanced Composition',
      author: 'Alice',
      thumbnail: require('../../assets/images/icon.png'),
      type: 'tutorial',
      postedTime: '1 week ago'
    },
    {
      id: '3',
      title: 'Lighting Techniques',
      author: 'Alice',
      thumbnail: require('../../assets/images/icon.png'),
      type: 'tutorial',
      postedTime: '3 weeks ago'
    }
  ];
  
  const selleItems = [
    { id: 'bio1', name: 'Alice', image: require('../../assets/images/icon.png'), subscribers: '120K subscribers' },
    { id: 'bio2', name: 'Bob', image: require('../../assets/images/icon.png'), subscribers: '45K subscribers' },
    { id: 'bio3', name: 'Charlie', image: require('../../assets/images/icon.png'), subscribers: '89K subscribers' }
  ];
  
  return (
    <>
      <View >
        <Text >Content Posts</Text>
        <TouchableOpacity>
          <Text >MORE</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contentItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (!item || !item.thumbnail) return null;
          
          return (
            <TouchableOpacity >
              <View >
                <Image
                  source={item.thumbnail}
                  resizeMode="cover"
                />
                <View >
                  <Text  numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text >{item.author} • {item.postedTime}</Text>
                  <Text >Part 1: Sketching</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      
      <View >
        <Text >Popular Creators</Text>
        <TouchableOpacity>
          <Text >MORE</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={selleItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity >
              <Image
                source={item.image}
                resizeMode="cover"
              />
              <View >
                <Text  numberOfLines={1}>
                  {item.name}
                </Text>
                <Text >
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