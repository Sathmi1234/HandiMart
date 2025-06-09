import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  visible,
  onHide,
  duration = 3000
}) => {
  const [slideAnim] = useState(new Animated.Value(-100));
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  useEffect(() => {
    if (visible) {
      // Trigger haptic feedback
      switch (type) {
        case 'success':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'error':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        case 'warning':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        default:
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      // Slide in
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();

      // Auto hide
      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, slideAnim, onHide, duration, type]);

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return theme.colors.primary; // Use theme primary for success
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.tertiary; // Use tertiary for warning
      case 'info': return theme.colors.secondary;
      default: return theme.colors.outline;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success': return theme.colors.onPrimary;
      case 'error': return theme.colors.onError;
      case 'warning': return theme.colors.onTertiary;
      case 'info': return theme.colors.onSecondary;
      default: return theme.colors.onSurface;
    }
  };

  const dynamicStyles = {
    container: {
      backgroundColor: getBackgroundColor(),
      shadowColor: theme.colors.shadow,
    },
    message: {
      color: getTextColor(),
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        dynamicStyles.container,
        {
          top: insets.top + 10,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <Text style={[styles.message, dynamicStyles.message]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    zIndex: 9999,
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Toast;
