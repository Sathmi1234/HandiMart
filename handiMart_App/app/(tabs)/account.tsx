import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

export default function AccountScreen() {
  // Mock user data - in a real app, this would come from a state or props
  const userData = {
    name: "Alice",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, ST 12345",
    memberSince: "January 2023"
  };

  return (
    <ScrollView >
      <View style={styles.container}>
        {/* Profile Section */}
        <View >
          <Image
            source={{ uri: "https://via.placeholder.com/100" }} // Replace with user's profile picture URL
            
          />
          <Text >{userData.name}</Text>
        </View>

        {/* Details Section */}
        <View >
          <Text >Details</Text>
          
          <View >
            <Text >Email:</Text>
            <Text >{userData.email}</Text>
          </View>
          
          <View >
            <Text >Phone:</Text>
            <Text >{userData.phone}</Text>
          </View>
          
          <View >
            <Text >Address:</Text>
            <Text >{userData.address}</Text>
          </View>
          
          <View >
            <Text >Member Since:</Text>
            <Text >{userData.memberSince}</Text>
          </View>
        </View>

        {/* Account Options */}
        <View >
          <TouchableOpacity >
            <Text >Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text >Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text >Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity >
          <Text >Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});