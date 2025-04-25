import { Tabs } from "expo-router";
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import Header from '../components/header';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <Tabs 
        screenOptions={{ 
          headerShown: false, // Hide the default header since we're using our custom one
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            height: 60,
            paddingBottom: 5,
          }
        }}
      >
        <Tabs.Screen 
          name="bids"
          options={{
            title: "Ongoing Bids",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="gavel" size={24} color={color} />,
          }}
        />
        <Tabs.Screen 
          name="content"
          options={{
            title: "Content",
            tabBarIcon: ({ color }) => <Feather name="grid" size={24} color={color} />,
          }}
        />
        <Tabs.Screen 
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen 
          name="items"
          options={{
            title: "Items",
            tabBarIcon: ({ color }) => <Feather name="shopping-bag" size={24} color={color} />,
          }}
        />
        <Tabs.Screen 
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});