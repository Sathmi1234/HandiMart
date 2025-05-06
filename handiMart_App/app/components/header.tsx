import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type HeaderProps = {
  showBackButton?: boolean;
  title?: string;
};

export default function Header({ showBackButton = false, title }: HeaderProps) {
  const router = useRouter();

  return (
    <Appbar.Header style={styles.header}>
      {showBackButton && (
        <Appbar.BackAction onPress={() => router.back()} />
      )}
      
      {title ? (
        <Appbar.Content title={title} />
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
          color="black" 
          style={styles.icon} 
          onPress={() => console.log('Cart pressed')}
        />
        <Feather 
          name="bell" 
          size={24} 
          color="black" 
          style={styles.icon} 
          onPress={() => console.log('Notifications pressed')}
        />
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
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