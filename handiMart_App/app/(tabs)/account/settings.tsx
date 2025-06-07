import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { Feather } from "@expo/vector-icons";

export default function SettingsScreen() {
  const router = useRouter();
  
  // State for toggles
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    locationServices: true,
    biometricAuth: false,
    darkMode: false,
    autoSync: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyPolicy = () => {
    Alert.alert("Privacy Policy", "This would open the privacy policy page.");
  };

  const handleTermsOfService = () => {
    Alert.alert("Terms of Service", "This would open the terms of service page.");
  };

  const handleContactSupport = () => {
    Alert.alert("Contact Support", "This would open the support contact form.");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => Alert.alert("Account Deletion", "Your account deletion request has been submitted.")
        }
      ]
    );
  };

  const SettingItem = ({ title, subtitle, value, onToggle, type = "toggle" }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {type === "toggle" && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: "#ddd", true: "#4a90e2" }}
          thumbColor={value ? "#fff" : "#f4f3f4"}
        />
      )}
      {type === "arrow" && (
        <Text style={styles.arrowIcon}>→</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <SettingItem
            title="Push Notifications"
            subtitle="Receive notifications about orders and updates"
            value={settings.notifications}
            onToggle={() => toggleSetting('notifications')}
          />
          <SettingItem
            title="Email Updates"
            subtitle="Get promotional emails and newsletters"
            value={settings.emailUpdates}
            onToggle={() => toggleSetting('emailUpdates')}
          />
        </View>

        {/* Privacy & Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <SettingItem
            title="Location Services"
            subtitle="Allow app to access your location"
            value={settings.locationServices}
            onToggle={() => toggleSetting('locationServices')}
          />
          <SettingItem
            title="Biometric Authentication"
            subtitle="Use fingerprint or face ID to unlock"
            value={settings.biometricAuth}
            onToggle={() => toggleSetting('biometricAuth')}
          />
        </View>

        {/* App Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <SettingItem
            title="Dark Mode"
            subtitle="Use dark theme throughout the app"
            value={settings.darkMode}
            onToggle={() => toggleSetting('darkMode')}
          />
          <SettingItem
            title="Auto Sync"
            subtitle="Automatically sync data when connected"
            value={settings.autoSync}
            onToggle={() => toggleSetting('autoSync')}
          />
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionTitle}>Change Password</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionTitle}>Payment Methods</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionTitle}>Saved Addresses</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.actionItem} onPress={handleContactSupport}>
            <Text style={styles.actionTitle}>Contact Support</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionTitle}>FAQ</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity style={styles.actionItem} onPress={handlePrivacyPolicy}>
            <Text style={styles.actionTitle}>Privacy Policy</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={handleTermsOfService}>
            <Text style={styles.actionTitle}>Terms of Service</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={[styles.section, styles.dangerSection]}>
          <Text style={[styles.sectionTitle, styles.dangerTitle]}>Danger Zone</Text>
          <TouchableOpacity style={styles.dangerItem} onPress={handleDeleteAccount}>
            <Text style={styles.dangerText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>App Version 1.0.0</Text>
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
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  settingContent: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  arrowIcon: {
    fontSize: 18,
    color: "#666",
  },
  dangerSection: {
    borderColor: "#ff4d4d",
    borderWidth: 1,
  },
  dangerTitle: {
    color: "#ff4d4d",
  },
  dangerItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  dangerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ff4d4d",
  },
  versionSection: {
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 14,
    color: "#666",
  },
});