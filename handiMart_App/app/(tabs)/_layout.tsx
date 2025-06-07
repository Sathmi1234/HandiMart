import { Tabs } from "expo-router";
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Header from '../components/header';

export default function TabsLayout() {
  const theme = useTheme();

  const dynamicStyles = {
    container: {
      backgroundColor: theme.colors.background,
    },
    tabBar: {
      backgroundColor: theme.colors.elevation.level2,
      borderTopColor: theme.colors.outline,
      borderTopWidth: 1,
      height: 60,
      paddingBottom: 5,
    }
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Header />
      <Tabs 
        screenOptions={{ 
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
          tabBarStyle: dynamicStyles.tabBar,
          tabBarLabelStyle: {
            fontSize: 12,
          },
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
