import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Title, Text, Appbar, useTheme } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from "@/services/axiosInstance";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from '@/contexts/ToastContext';

interface SignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const theme = useTheme();
  const { signIn } = useAuth();
  const { showError } = useToast();
  
  const [formData, setFormData] = useState<SignInForm>({
    email: "",
    password: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field: keyof SignInForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      showError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const authResponse = await apiClient.post('auth/signin', {
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signin success:', authResponse.data);
      
      if (!authResponse.data.jwt) {
        throw new Error('No JWT token received');
      }

      try {
        const profileResponse = await apiClient.get('api/users/profile', {
          headers: {
            'Authorization': `Bearer ${authResponse.data.jwt}`
          }
        });

        console.log('Profile data:', profileResponse.data);

        const userData = {
          id: (profileResponse.data.userId || profileResponse.data.id || 'temp_id').toString(),
          username: profileResponse.data.username || formData.email,
          email: profileResponse.data.email || formData.email,
          first_name: profileResponse.data.first_name || '',
          last_name: profileResponse.data.last_name || '',
          role: authResponse.data.role === 'ROLE_SELLER' ? 'ROLE_SELLER' as const : 'ROLE_CUSTOMER' as const
        };
        
        await signIn(userData, authResponse.data.jwt);
        
        if (authResponse.data.role === 'ROLE_SELLER') {
          if (profileResponse.data.sellerProfile) {
            router.replace('/seller');
          } else {
            router.replace('/(auth)/seller-setup');
          }
        } else {
          router.replace('/(tabs)');
        }

      } catch (profileError: any) {
        console.error('Profile fetch error:', profileError);
        
        const userData = {
          id: 'temp_id',
          username: formData.email,
          email: formData.email,
          first_name: '',
          last_name: '',
          role: authResponse.data.role === 'ROLE_SELLER' ? 'ROLE_SELLER' as const : 'ROLE_CUSTOMER' as const
        };
        
        await signIn(userData, authResponse.data.jwt);
        
        if (authResponse.data.role === 'ROLE_SELLER') {
          router.replace('/(auth)/seller-setup');
        } else {
          router.replace('/(tabs)');
        }
      }
      
    } catch (error: any) {
      console.error('Signin error:', error.response?.data || error.message);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Invalid credentials';
      
      showError(errorMessage);
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
        <Appbar.Content title="Sign In" titleStyle={{ color: theme.colors.onSurface }} />
      </Appbar.Header>
      
      <View style={[styles.content, dynamicStyles.content]}>
        <Title style={[styles.title, dynamicStyles.title]}>Welcome Back!</Title>

        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(value) => updateFormData('password', value)}
          mode="outlined"
          style={styles.input}
          secureTextEntry
        />

        <Button 
          mode="contained" 
          onPress={handleSignIn} 
          style={styles.button}
          loading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </Button>

        <View style={styles.footer}>
          <Text style={[styles.regularText, dynamicStyles.regularText]}>
            Don't have an account? 
          </Text>
          <Link href="/sign_up">
            <Text style={[styles.linkText, dynamicStyles.linkText]}> Sign Up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    flexWrap: 'wrap',
  },
  linkText: {
    fontWeight: 'bold',
  },
  regularText: {
    fontSize: 16,
  },
});
