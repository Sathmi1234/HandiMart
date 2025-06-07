import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type HeaderProps = {
  showBackButton?: boolean;
  title?: string;
};

export default function Header({ showBackButton = false, title }: HeaderProps) {
  const router = useRouter();
  const theme = useTheme();

  const dynamicStyles = {
    header: {
      backgroundColor: theme.colors.elevation.level2,
      borderBottomColor: theme.colors.outline,
    },
    title: {
      color: theme.colors.onSurface,
    },
    icon: {
      color: theme.colors.onSurface,
    }
  };

  return (
    <Appbar.Header style={[styles.header, dynamicStyles.header]}>
      {showBackButton && (
        <Appbar.BackAction 
          onPress={() => router.back()} 
          iconColor={theme.colors.onSurface}
        />
      )}
      
      {title ? (
        <Appbar.Content 
          title={title} 
          titleStyle={dynamicStyles.title}
        />
      ) : (
        <Image 
          source={require('../../assets/images/HandiMartLogo.png')} 
          style={styles.logo}
        />
      )}
      
      <View style={styles.headerRight}>
        <Feather
           name="shopping-cart"
           size={24}
           color={dynamicStyles.icon.color}
           style={styles.icon}
           onPress={() => router.push('/cart')}
        />
        <Feather
            name="bell"
            size={24}
            color={dynamicStyles.icon.color}
            style={styles.icon}
            onPress={() => router.push('/notification')}
         />
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    elevation: 0,
    borderBottomWidth: 1,
  },
  logo: {
    width: 80,
    height: 30,
    resizeMode: "contain",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 20,
  },
});
