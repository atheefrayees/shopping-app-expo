import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

export default function ProductUploadScreen({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!name || !price || !imageUri) return Alert.alert('All fields are required');

    const img = await uploadImage();
    if (!img) return;

    const { error } = await supabase.from('products').insert([{ name, price: parseFloat(price), description: desc, image_url: img }]);
    if (error) Alert.alert('Error', error.message);
    else {
      Alert.alert('Success', 'Product uploaded!');
      navigation.navigate('Home');
    }
  };

  const uploadImage = async () => {
    const blob = await (await fetch(imageUri)).blob();
    const fn = `${Date.now()}.jpg`;
    const { data, error } = await supabase.storage.from('products').upload(fn, blob);
    if (error) return Alert.alert('Upload failed', error.message);
    const { publicUrl } = supabase.storage.from('products').getPublicUrl(fn).data;
    return publicUrl;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Upload Product</Text>
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Price" style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput placeholder="Description (optional)" style={[styles.input, { height: 80 }]} value={desc} onChangeText={setDesc} multiline />
      <Button title="Pick Image" onPress={pickImage} color="#FF6F00" />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <View style={{ height: 16 }} />
      <Button title="Upload" onPress={handleSubmit} color="#2196F3" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  image: { width: '100%', height: 200, borderRadius: 8, marginVertical: 16 },
});
