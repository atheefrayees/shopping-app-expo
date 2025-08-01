import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

export default function ProductUploadScreen({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const uploadImage = async () => {
    if (!imageUri) return null;
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const fileName = `${Date.now()}.jpg`;

    const { data, error } = await supabase.storage.from('products').upload(fileName, blob);
    if (error) {
      Alert.alert('Upload error', error.message);
      return null;
    }
    const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async () => {
    const imageUrl = await uploadImage();

    const { data, error } = await supabase.from('products').insert([
      { name, price: parseFloat(price), description, image_url: imageUrl }
    ]);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Product uploaded!');
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Product Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={[styles.input, { height: 80 }]}
      />
      <Button title="Pick Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Upload Product" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 12,
  },
});
