import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { Feather } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

export default function EditProfileScreen() {
  const router = useRouter();
  const theme = useTheme();

  // State for form data
  const [formData, setFormData] = useState({
    name: "Alice",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, ST 12345"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    Alert.alert(
      "Profile Updated",
      "Your profile has been successfully updated!",
      [
        {
          text: "OK",
          onPress: () => router.back()
        }
      ]
    );
  };

  const handleCancel = () => {
    router.back();
  };
    
  
    const dynamicStyles = {
      container: {
        backgroundColor: theme.colors.background,
      },
      header: {
        backgroundColor: theme.colors.elevation.level2,
      },
      headerTitle: {
        color: theme.colors.onSurface,
      },
      card: {
        backgroundColor: theme.colors.elevation.level1,
      },
      text: {
        color: theme.colors.onSurface,
      },
      secondaryText: {
        color: theme.colors.onSurfaceVariant,
      },
      successTitle: {
        color: theme.colors.primary,
      },
    };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
             <Feather name="arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholder="Enter your address"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: "#4a90e2",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileSection: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  changePhotoButton: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changePhotoText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  formSection: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  saveButton: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
  },
});