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
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddProductScreen() {
  const router = useRouter();
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'New',
    isAuction: false,
    startingBid: '',
    auctionDuration: '7',
  });
  const [images, setImages] = useState([]);

  const handleInputChange = (field, value) => {
    setProductData(prev => ({
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
    if (!productData.title || !productData.description || !productData.price) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (productData.isAuction && !productData.startingBid) {
      Alert.alert('Error', 'Please set a starting bid for auction items');
      return;
    }

    // In a real app, this would submit to your backend
    Alert.alert('Success', 'Product added successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Product Images */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Images</Text>
            <TouchableOpacity style={styles.imageUpload} onPress={handleAddImage}>
              <Feather name="camera" size={32} color="#999" />
              <Text style={styles.imageUploadText}>Add Photos</Text>
            </TouchableOpacity>
          </View>

          {/* Product Title */}
          <View style={styles.section}>
            <Text style={styles.label}>Product Title *</Text>
            <TextInput
              style={styles.input}
              value={productData.title}
              onChangeText={(value) => handleInputChange('title', value)}
              placeholder="Enter product title"
              maxLength={50}
            />
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={productData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder="Describe your product..."
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.input}
              value={productData.category}
              onChangeText={(value) => handleInputChange('category', value)}
              placeholder="e.g., Handicrafts, Jewelry, Art"
            />
          </View>

          {/* Condition */}
          <View style={styles.section}>
            <Text style={styles.label}>Condition</Text>
            <View style={styles.conditionContainer}>
              {['New', 'Like New', 'Good', 'Fair'].map((condition) => (
                <TouchableOpacity
                  key={condition}
                  style={[
                    styles.conditionOption,
                    productData.condition === condition && styles.selectedCondition
                  ]}
                  onPress={() => handleInputChange('condition', condition)}
                >
                  <Text style={[
                    styles.conditionText,
                    productData.condition === condition && styles.selectedConditionText
                  ]}>
                    {condition}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Auction Toggle */}
          <View style={styles.section}>
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Enable Auction</Text>
              <Switch
                value={productData.isAuction}
                onValueChange={(value) => handleInputChange('isAuction', value)}
                trackColor={{ false: '#767577', true: '#7BD8FE' }}
                thumbColor={productData.isAuction ? '#E24C4C' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Price or Starting Bid */}
          {productData.isAuction ? (
            <>
              <View style={styles.section}>
                <Text style={styles.label}>Starting Bid *</Text>
                <TextInput
                  style={styles.input}
                  value={productData.startingBid}
                  onChangeText={(value) => handleInputChange('startingBid', value)}
                  placeholder="Enter starting bid"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Auction Duration (days)</Text>
                <TextInput
                  style={styles.input}
                  value={productData.auctionDuration}
                  onChangeText={(value) => handleInputChange('auctionDuration', value)}
                  placeholder="7"
                  keyboardType="numeric"
                />
              </View>
            </>
          ) : (
            <View style={styles.section}>
              <Text style={styles.label}>Fixed Price *</Text>
              <TextInput
                style={styles.input}
                value={productData.price}
                onChangeText={(value) => handleInputChange('price', value)}
                placeholder="Enter price"
                keyboardType="numeric"
              />
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Product</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageUpload: {
    height: 120,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  imageUploadText: {
    marginTop: 8,
    color: '#999',
    fontSize: 16,
  },
  conditionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedCondition: {
    backgroundColor: '#E24C4C',
    borderColor: '#E24C4C',
  },
  conditionText: {
    color: '#333',
  },
  selectedConditionText: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#E24C4C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});