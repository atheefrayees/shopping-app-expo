import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function ProductScreen({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image_url }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description || 'No description provided'}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add to Cart" color="#FF6F00" onPress={() => addToCart(product)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', backgroundColor: '#fff' },
  image: { width: '100%', height: 300, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 20, color: '#2196F3', marginBottom: 16 },
  description: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 24 },
  buttonContainer: { width: '100%', marginTop: 16 },
});
