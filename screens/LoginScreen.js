import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // or 'register'
  const [error, setError] = useState(null);
  const { signIn, signUp } = useContext(AuthContext);

  const handle = async () => {
    setError(null);
    try {
      if (mode === 'login') await signIn(email, password);
      else {
        await signUp(email, password);
        alert('Check your email to confirm your account.');
        setMode('login');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{mode === 'login' ? 'Sign In' : 'Register'}</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title={mode === 'login' ? 'Sign In' : 'Register'} onPress={handle} color="#2196F3" />
      <Text style={styles.toggle} onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? "Don't have account? Register" : 'Already have account? Sign in'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f9f9f9' },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
  },
  error: { color: 'red', marginBottom: 8, textAlign: 'center' },
  toggle: { marginTop: 16, color: '#2196F3', textAlign: 'center' },
});
