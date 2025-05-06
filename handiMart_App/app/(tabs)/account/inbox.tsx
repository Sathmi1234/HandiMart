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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inbox</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />
      
      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.messageItem}>
            <Image
              source={item.avatar}
              style={styles.avatar}
              defaultSource={require('../../../assets/images/icon.png')}
            />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.senderName}>{item.sender}</Text>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
              <View style={styles.messagePreviewContainer}>
                {item.hasCheckmark && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
                <Text style={styles.messagePreview} numberOfLines={1}>
                  {item.message}
                </Text>
                {item.count && (
                  <View style={styles.messageCount}>
                    <Text style={styles.messageCountText}>{item.count}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.messageDivider} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e1e1e1', // Placeholder color
  },
  messageContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  messageTime: {
    fontSize: 16,
    color: '#666',
  },
  messagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    color: '#8A2BE2',
    marginRight: 4,
    fontSize: 16,
  },
  messagePreview: {
    fontSize: 16,
    color: '#606060',
    flex: 1,
  },
  messageCount: {
    backgroundColor: '#8A2BE2', 
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageCountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  messageDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  }
});