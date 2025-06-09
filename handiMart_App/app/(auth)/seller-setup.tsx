import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, Title, Text, Appbar, Chip, useTheme, Surface } from 'react-native-paper';
import { useRouter } from 'expo-router';
import apiClient from '@/services/axiosInstance';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

interface SellerProfileForm {
  bio: string;
  tags: string[];
}

export default function SellerSetup() {
  const router = useRouter();
  const theme = useTheme();
  const { jwtToken, user } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [formData, setFormData] = useState<SellerProfileForm>({
    bio: '',
    tags: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field: keyof SellerProfileForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      updateFormData('tags', [...formData.tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFormData('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const validateForm = (): boolean => {
    if (!formData.bio.trim()) {
      showError('Please enter a bio describing your services');
      return false;
    }
    if (formData.bio.length < 20) {
      showError('Bio must be at least 20 characters long');
      return false;
    }
    if (formData.tags.length === 0) {
      showError('Please add at least one skill/service tag');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!jwtToken) {
      showError('Authentication required. Please sign in again.');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await apiClient.post('api/sellers/create', {
        bio: formData.bio,
        tags: formData.tags,
        featuredFlag: false,
        rating: null,
        ratingCount: 0,
        status: 'NEW'
      }, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Seller profile created:', response.data);
      
      showSuccess('Your seller profile has been created! You can now start selling.');
      
      setTimeout(() => {
        router.replace('/seller');
      }, 1500);
      
    } catch (error: any) {
      console.error('Seller setup error:', error.response?.data || error.message);
      showError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipForNow = () => {
    showError('You can complete your seller profile later. Some features may be limited until you do.');
    setTimeout(() => {
      router.replace('/seller');
    }, 2000);
  };

  const dynamicStyles = {
    container: {
      backgroundColor: theme.colors.background,
    },
    content: {
      backgroundColor: theme.colors.background,
    },
    welcomeTitle: {
      color: theme.colors.onBackground,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
    },
    sectionTitle: {
      color: theme.colors.onBackground,
    },
    helperText: {
      color: theme.colors.onSurfaceVariant,
    },
    tagsLabel: {
      color: theme.colors.onSurface,
    },
    tagsContainer: {
      backgroundColor: theme.colors.surface,
    }
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content 
          title="Complete Your Seller Profile" 
          titleStyle={{ color: theme.colors.onSurface }} 
        />
      </Appbar.Header>

      <ScrollView style={[styles.content, dynamicStyles.content]}>
        <View style={styles.padding}>
          <Title style={[styles.welcomeTitle, dynamicStyles.welcomeTitle]}>
            Welcome, {user?.first_name}!
          </Title>
          <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
            Let's set up your seller profile to help customers find and trust your services.
          </Text>

          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            About Your Services
          </Text>
          <TextInput
            label="Bio (Describe your skills and services)"
            value={formData.bio}
            onChangeText={(value) => updateFormData('bio', value)}
            mode="outlined"
            multiline
            numberOfLines={4}
            placeholder="Tell customers about your skills, experience, and what services you offer..."
            style={styles.bioInput}
          />

          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            Skills & Services Tags
          </Text>
          <Text style={[styles.helperText, dynamicStyles.helperText]}>
            Add tags that describe your skills (e.g., "plumbing", "web design", "tutoring")
          </Text>
          
          <View style={styles.tagInputRow}>
            <TextInput
              label="Add a skill/service tag"
              value={tagInput}
              onChangeText={setTagInput}
              mode="outlined"
              style={styles.tagInput}
              onSubmitEditing={addTag}
            />
            <Button 
              mode="contained" 
              onPress={addTag}
              disabled={!tagInput.trim() || formData.tags.length >= 10}
              style={styles.addButton}
            >
              Add
            </Button>
          </View>

          {formData.tags.length > 0 && (
            <Surface style={[styles.tagsContainer, dynamicStyles.tagsContainer]} elevation={1}>
              <Text style={[styles.tagsLabel, dynamicStyles.tagsLabel]}>
                Your tags:
              </Text>
              <View style={styles.tagsWrapper}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    onClose={() => removeTag(tag)}
                    style={styles.tagChip}
                    textStyle={{ color: theme.colors.onSurface }}
                  >
                    {tag}
                  </Chip>
                ))}
              </View>
            </Surface>
          )}

          <Button 
            mode="contained" 
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            style={styles.submitButton}
          >
            Complete Setup
          </Button>

          <Button 
            mode="text" 
            onPress={handleSkipForNow}
            disabled={isLoading}
            style={styles.skipButton}
          >
            Skip for now
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  padding: {
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  helperText: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  bioInput: {
    marginBottom: 24,
  },
  tagInputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  tagInput: {
    flex: 1,
    marginRight: 12,
  },
  addButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
  },
  tagsContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  tagsLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    marginRight: 4,
    marginBottom: 4,
  },
  submitButton: {
    marginBottom: 16,
    paddingVertical: 6,
  },
  skipButton: {
    marginBottom: 20,
  },
});
