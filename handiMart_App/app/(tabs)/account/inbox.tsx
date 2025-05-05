import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';

interface MessageItem {
  id: string;
  sender: string;
  message: string;
  time: string;
  avatar: any;
  read: boolean;
  count?: number;
  hasCheckmark?: boolean;
}

export default function InboxScreen() {
  const router = useRouter();

  // Mock data for messages
  const messages: MessageItem[] = [
    {
      id: '1',
      sender: 'Jane Cooper',
      message: "Hey there, I'm experiencing slo...",
      time: '11:23 pm',
      avatar: require('../../../assets/images/icon.png'),
      read: false,
      count: 2
    },
    {
      id: '2',
      sender: 'Esther Howard',
      message: "Hi, I'm having trouble setting up m...",
      time: '02:30 pm',
      avatar: require('../../../assets/images/icon.png'),
      read: true,
      hasCheckmark: true
    },
    {
      id: '3',
      sender: 'Kathryn Murphy',
      message: 'Hey, I accidentally unsubscribed fr...',
      time: '01:08 pm',
      avatar: require('../../../assets/images/icon.png'),
      read: true,
      hasCheckmark: true
    },
    {
      id: '4',
      sender: 'Jenny Wilson',
      message: 'Hello, I received a damaged product a...',
      time: '12:23 pm',
      avatar: require('../../../assets/images/icon.png'),
      read: false
    },
    {
      id: '5',
      sender: 'Darrell Steward',
      message: 'Hey there, I received an email fro...',
      time: '11:27 pm',
      avatar: require('../../../assets/images/icon.png'),
      read: true,
      hasCheckmark: true
    },
    {
      id: '6',
      sender: 'Dianne Russell',
      message: "Hello, I'm having trouble navigatin...",
      time: '09:16 am',
      avatar: require('../../../assets/images/icon.png'),
      read: true,
      hasCheckmark: true
    }
  ];

  return (
    <SafeAreaView >
      {/* Header */}
      <View >
        <TouchableOpacity 
          onPress={() => router.back()}
        >
          <Text >←</Text>
        </TouchableOpacity>
        <Text >Inbox</Text>
        <TouchableOpacity >
          <Text >🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View  />
      
      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity >
            <Image
              source={item.avatar}
              defaultSource={require('../../../assets/images/icon.png')}
            />
            <View >
              <View >
                <Text >{item.sender}</Text>
                <Text >{item.time}</Text>
              </View>
              <View >
                {item.hasCheckmark && (
                  <Text >✓</Text>
                )}
                <Text  numberOfLines={1}>
                  {item.message}
                </Text>
                {item.count && (
                  <View >
                    <Text >{item.count}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View/>}
      />
    </SafeAreaView>
  );
}

