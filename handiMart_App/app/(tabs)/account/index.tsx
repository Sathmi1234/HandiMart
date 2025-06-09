import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from 'expo-router';
import { Button, useTheme, Surface } from 'react-native-paper';
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from '@/contexts/ToastContext';

export default function AccountScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { user, isAuthenticated, signOut } = useAuth();
  const { showInfo, showError } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      showInfo('You have been signed out successfully');
      setTimeout(() => {
        router.replace('/');
      }, 1000);
    } catch (error) {
      showError('Error signing out. Please try again.');
    }
  };

  const handleSignIn = () => {
    router.push('/(auth)/sign_in');
  };

  const dynamicStyles = {
    mainContainer: {
      backgroundColor: theme.colors.background,
    },
    container: {
      backgroundColor: theme.colors.background,
    },
    username: {
      color: theme.colors.onBackground,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
    },
    userRole: {
      color: theme.colors.primary,
    },
    detailsSection: {
      backgroundColor: theme.colors.surface,
      shadowColor: theme.colors.shadow,
    },
    sectionTitle: {
      color: theme.colors.onSurface,
      borderBottomColor: theme.colors.outline + '40',
    },
    detailLabel: {
      color: theme.colors.onSurfaceVariant,
    },
    detailValue: {
      color: theme.colors.onSurface,
    },
    optionButton: {
      backgroundColor: theme.colors.surface,
      shadowColor: theme.colors.shadow,
    },
    optionText: {
      color: theme.colors.onSurface,
    },
    logoutButton: {
      backgroundColor: theme.colors.error,
    },
    logoutText: {
      color: theme.colors.onError,
    },
    floatingInbox: {
      backgroundColor: theme.colors.primary,
      shadowColor: theme.colors.shadow,
    }
  };

  // If user is not authenticated, show limited account screen
  if (!isAuthenticated) {
    return (
      <View style={[styles.mainContainer, dynamicStyles.mainContainer]}>
        <ScrollView style={styles.scrollView}>
          <View style={[styles.container, dynamicStyles.container]}>
            <View style={styles.profileSection}>
              <Image
                source={{ uri: "https://via.placeholder.com/100" }}
                style={styles.profileImage}
              />
              <Text style={[styles.username, dynamicStyles.username]}>Guest User</Text>
              <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
                Sign in to access full features
              </Text>
            </View>

            <View style={styles.optionsSection}>
              <Button 
                mode="contained" 
                onPress={handleSignIn}
                style={styles.signInButton}
              >
                Sign In / Sign Up
              </Button>
              
              <TouchableOpacity style={[styles.optionButton, dynamicStyles.optionButton]}>
                <Text style={[styles.optionText, dynamicStyles.optionText]}>
                  Browse Categories
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.optionButton, dynamicStyles.optionButton]}>
                <Text style={[styles.optionText, dynamicStyles.optionText]}>
                  Help & Support
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.optionButton, dynamicStyles.optionButton]}>
                <Text style={[styles.optionText, dynamicStyles.optionText]}>
                  About HandiMart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // If user is authenticated, show full account screen
  return (
    <View style={[styles.mainContainer, dynamicStyles.mainContainer]}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.container, dynamicStyles.container]}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.profileImage}
            />
            <Text style={[styles.username, dynamicStyles.username]}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text style={[styles.userRole, dynamicStyles.userRole]}>
              {user?.role === 'ROLE_SELLER' ? 'Seller Account' : 'Customer Account'}
            </Text>
          </View>

          {/* Details Section */}
          <Surface style={[styles.detailsSection, dynamicStyles.detailsSection]} elevation={2}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
              Account Details
            </Text>
            
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>Email:</Text>
              <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
                {user?.email}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>Username:</Text>
              <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
                {user?.username}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>Account Type:</Text>
              <Text style={[styles.detailValue, dynamicStyles.detailValue]}>
                {user?.role === 'ROLE_SELLER' ? 'Seller' : 'Customer'}
              </Text>
            </View>
          </Surface>

          {/* Account Options */}
          <View style={styles.optionsSection}>
            <TouchableOpacity style={[styles.optionButton, dynamicStyles.optionButton]}>
              <Text style={[styles.optionText, dynamicStyles.optionText]}>
                Edit Profile
              </Text>
            </TouchableOpacity>
            {user?.role === 'ROLE_CUSTOMER' && (
              <TouchableOpacity style={[styles.optionButton, dynamicStyles.optionButton]}>
                <Text style={[styles.optionText, dynamicStyles.optionText]}>
                  Order History
                </Text>
              </TouchableOpacity>
            )}
            {user?.role === 'ROLE_SELLER' && (
              <TouchableOpacity style={[styles.optionButton, dynamicStyles.optionButton]}>
                <Text style={[styles.optionText, dynamicStyles.optionText]}>
                  My Products
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.optionButton, dynamicStyles.optionButton]}>
              <Text style={[styles.optionText, dynamicStyles.optionText]}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity 
            style={[styles.logoutButton, dynamicStyles.logoutButton]} 
            onPress={handleSignOut}
          >
            <Text style={[styles.logoutText, dynamicStyles.logoutText]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Inbox Icon */}
      <TouchableOpacity 
        style={[styles.floatingInbox, dynamicStyles.floatingInbox]}
        onPress={() => router.push('/(tabs)/account/inbox')}
      >
        <View style={styles.inboxIconContainer}>
          <Text style={styles.inboxIcon}>✉️</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  userRole: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
  },
  signInButton: {
    marginBottom: 20,
    width: "100%",
  },
  detailsSection: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    marginVertical: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  detailItem: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
  },
  optionsSection: {
    width: "100%",
    marginVertical: 15,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    width: "100%",
  },
  logoutText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  floatingInbox: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  inboxIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inboxIcon: {
    fontSize: 24,
  },
});
