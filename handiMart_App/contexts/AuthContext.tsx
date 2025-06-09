import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_SELLER';
}

interface AuthContextType {
  user: User | null;
  isFirstTime: boolean;
  isLoading: boolean;
  jwtToken: string | null;
  setFirstTimeComplete: () => Promise<void>;
  signIn: (userData: User, token?: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isSeller: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      setIsLoading(true);

      const firstTimeStatus = await AsyncStorage.getItem('isFirstTime');
      setIsFirstTime(firstTimeStatus === null);

      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }

      const token = await AsyncStorage.getItem('jwt_token');
      if (token) {
        setJwtToken(token);
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setFirstTimeComplete = async () => {
    try {
      await AsyncStorage.setItem('isFirstTime', 'false');
      setIsFirstTime(false);
    } catch (error) {
      console.error('Error setting first time complete:', error);
    }
  };

  const signIn = async (userData: User, token?: string) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      if (token) {
        await AsyncStorage.setItem('jwt_token', token);
        setJwtToken(token);
      }
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('jwt_token');
      setUser(null);
      setJwtToken(null);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isFirstTime,
    isLoading,
    jwtToken,
    setFirstTimeComplete,
    signIn,
    signOut,
    isAuthenticated: user !== null,
    isSeller: user?.role === 'ROLE_SELLER',
    isCustomer: user?.role === 'ROLE_CUSTOMER',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


