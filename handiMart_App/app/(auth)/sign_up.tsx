import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { TextInput, Button, Title, Text, Appbar } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Sign up:', { name, email, password });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Sign Up" />
      </Appbar.Header>
      
      <View style={styles.content}>
        <Title style={styles.title}>Create Account</Title>
        
        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
        />
        
        <Button 
          mode="contained" 
          onPress={handleSignUp}
          style={styles.button}
        >
          Sign Up
        </Button>
        
        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <Link href="/sign_in">
            <Text style={styles.link}>Sign In</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 24,
    paddingVertical: 6,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    paddingBottom: 20,
  },
  link: {
    color: '#1565C0',
    fontWeight: 'bold',
  },
});