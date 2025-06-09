import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, Title, Text, Appbar, RadioButton, useTheme } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import apiClient from '@/services/axiosInstance';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_SELLER';
}

export default function SignUp() {
  const router = useRouter();
  const theme = useTheme();
  const { signIn } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [formData, setFormData] = useState<SignUpForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'ROLE_CUSTOMER'
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field: keyof SignUpForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      showError('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      showError('Please enter your email');
      return false;
    }
    if (formData.password.length < 6) {
      showError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const [first_name, ...lastParts] = formData.name.trim().split(' ');
    const last_name = lastParts.join(' ') || ' ';

    const payload = {
      username: formData.email,
      email: formData.email,
      password: formData.password,
      first_name,
      last_name,
      role: formData.role
    };

    try {
      // Step 1: Create user account
      const signupResponse = await apiClient.post('auth/signup', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signup success:', signupResponse.data);

      // Step 2: Sign in to get JWT token
      const signinResponse = await apiClient.post('auth/signin', {
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signin after signup:', signinResponse.data);

      if (!signinResponse.data.jwt) {
        throw new Error('No JWT token received after signup');
      }

      // Step 3: Get user profile
      try {
        const profileResponse = await apiClient.get('api/users/profile', {
          headers: {
            'Authorization': `Bearer ${signinResponse.data.jwt}`
          }
        });

        console.log('Profile response:', profileResponse.data);

        const userData = {
          id: (profileResponse.data.userId || profileResponse.data.id || 'temp_id').toString(),
          username: profileResponse.data.username || formData.email,
          email: profileResponse.data.email || formData.email,
          first_name: profileResponse.data.first_name || first_name,
          last_name: profileResponse.data.last_name || last_name,
          role: formData.role
        };
        
        await signIn(userData, signinResponse.data.jwt);
        
        showSuccess('Account created successfully! Welcome to HandiMart!');
        
        setTimeout(() => {
          if (formData.role === 'ROLE_SELLER') {
            router.replace('/(auth)/seller-setup');
          } else {
            router.replace('/(tabs)');
          }
        }, 1000);

      } catch (profileError: any) {
        console.error('Profile fetch error:', profileError);
        
        const userData = {
          id: 'temp_id',
          username: formData.email,
          email: formData.email,
          first_name: first_name,
          last_name: last_name,
          role: formData.role
        };
        
        await signIn(userData, signinResponse.data.jwt);
        
        showSuccess('Account created successfully!');
        
        setTimeout(() => {
          if (formData.role === 'ROLE_SELLER') {
            router.replace('/(auth)/seller-setup');
          } else {
            router.replace('/(tabs)');
          }
        }, 1000);
      }

    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      showError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const dynamicStyles = {
    container: {
      backgroundColor: theme.colors.background,
    },
    content: {
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.colors.onBackground,
    },
    sectionTitle: {
      color: theme.colors.onBackground,
    },
    radioText: {
      color: theme.colors.onBackground,
    },
    linkText: {
      color: theme.colors.primary,
    },
    regularText: {
      color: theme.colors.onBackground,
    }
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Sign Up" titleStyle={{ color: theme.colors.onSurface }} />
      </Appbar.Header>

      <ScrollView style={[styles.content, dynamicStyles.content]}>
        <View style={styles.padding}>
          <Title style={[styles.title, dynamicStyles.title]}>Create Account</Title>

          <TextInput
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => updateFormData('name', value)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            label="Password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            Account Type
          </Text>
          
          <RadioButton.Group
            onValueChange={(value) => updateFormData('role', value as 'ROLE_CUSTOMER' | 'ROLE_SELLER')}
            value={formData.role}
          >
            <View style={styles.radioOption}>
              <RadioButton value="ROLE_CUSTOMER" />
              <Text style={[styles.radioText, dynamicStyles.radioText]}>
                Customer - I want to buy products
              </Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="ROLE_SELLER" />
              <Text style={[styles.radioText, dynamicStyles.radioText]}>
                Seller - I want to sell products
              </Text>
            </View>
          </RadioButton.Group>

          <Button 
            mode="contained" 
            onPress={handleSignUp}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          >
            Sign Up
          </Button>

          <View style={styles.footer}>
            <Text style={[styles.regularText, dynamicStyles.regularText]}>
              Already have an account? 
            </Text>
            <Link href="/sign_in">
              <Text style={[styles.linkText, dynamicStyles.linkText]}> Sign In</Text>
            </Link>
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  button: {
    marginTop: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  linkText: {
    fontWeight: 'bold',
  },
  regularText: {
    fontSize: 16,
  },
});
