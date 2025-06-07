import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddPostScreen() {
  const router = useRouter();
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [images, setImages] = useState([]);

  const handleInputChange = (field, value) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddImage = () => {
    // In a real app, this would open image picker
    Alert.alert('Image Picker', 'This would open the image picker in a real app');
  };

  const handleSubmit = () => {
    // Basic validation
    if (!postData.title || !postData.content) {
      Alert.alert('Error', 'Please fill in title and content');
      return;
    }

    // In a real app, this would submit to your backend
    Alert.alert('Success', 'Post created successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const handleSaveDraft = () => {
    Alert.alert('Draft Saved', 'Your post has been saved as a draft');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity onPress={handleSaveDraft}>
          <Text style={styles.draftButton}>Save Draft</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Author Info */}
          <View style={styles.authorSection}>
            <Image 
              source={require('../../assets/images/icon.png')} 
              style={styles.authorImage}
            />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>Alice</Text>
              <Text style={styles.postType}>Creating a new post</Text>
            </View>
          </View>

          {/* Post Title */}
          <View style={styles.section}>
            <Text style={styles.label}>Post Title *</Text>
            <TextInput
              style={styles.input}
              value={postData.title}
              onChangeText={(value) => handleInputChange('title', value)}
              placeholder="What's your post about?"
              maxLength={100}
            />
          </View>

          {/* Post Content */}
          <View style={styles.section}>
            <Text style={styles.label}>Content *</Text>
            <TextInput
              style={[styles.input, styles.contentArea]}
              value={postData.content}
              onChangeText={(value) => handleInputChange('content', value)}
              placeholder="Share your thoughts, tutorials, behind-the-scenes, or inspiration..."
              multiline
              numberOfLines={8}
              maxLength={2000}
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>
              {postData.content.length}/2000
            </Text>
          </View>

          {/* Images Section */}
          <View style={styles.section}>
            <Text style={styles.label}>Add Images</Text>
            <TouchableOpacity style={styles.imageUpload} onPress={handleAddImage}>
              <Feather name="camera" size={32} color="#999" />
              <Text style={styles.imageUploadText}>Add Photos</Text>
              <Text style={styles.imageUploadSubtext}>
                Share photos of your work, process, or inspiration
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tags */}
          <View style={styles.section}>
            <Text style={styles.label}>Tags (optional)</Text>
            <TextInput
              style={styles.input}
              value={postData.tags}
              onChangeText={(value) => handleInputChange('tags', value)}
              placeholder="e.g., #handmade #tutorial #behindthescenes"
              maxLength={100}
            />
            <Text style={styles.helpText}>
              Use hashtags to help people discover your content
            </Text>
          </View>

          {/* Post Options */}
          <View style={styles.section}>
            <Text style={styles.label}>Post Options</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.option}>
                <Feather name="users" size={20} color="#666" />
                <Text style={styles.optionText}>Public</Text>
                <Feather name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.option}>
                <Feather name="bell" size={20} color="#666" />
                <Text style={styles.optionText}>Notify followers</Text>
                <View style={styles.toggle}>
                  <View style={styles.toggleActive} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.previewButton}>
              <Feather name="eye" size={20} color="#E24C4C" />
              <Text style={styles.previewButtonText}>Preview</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.publishButton} onPress={handleSubmit}>
              <Text style={styles.publishButtonText}>Publish Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  draftButton: {
    color: '#E24C4C',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  contentArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  characterCount: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  imageUpload: {
    height: 120,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  imageUploadText: {
    marginTop: 8,
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  imageUploadSubtext: {
    marginTop: 4,
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  toggle: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E24C4C',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 2,
  },
  toggleActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  previewButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E24C4C',
    backgroundColor: '#fff',
  },
  previewButtonText: {
    color: '#E24C4C',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  publishButton: {
    flex: 2,
    backgroundColor: '#E24C4C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});