import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemName}>{item.name} x {item.quantity}</Text>
                <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${total}</Text>
          </View>
          <View style={styles.buttons}>
            <Button title="Checkout" color="#2196F3" onPress={() => navigation.navigate('Checkout')} />
            <View style={{ height: 8 }} />
            <Button title="Clear Cart" color="#888" onPress={clearCart} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f7f7f7' },
  empty: { fontSize: 18, textAlign: 'center', marginTop: 40 },
  item: {
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemName: { fontWeight: '600', fontSize: 16 },
  remove: { color: '#FF6F00', marginTop: 4 },
  totalContainer: { marginVertical: 16, alignItems: 'center' },
  totalText: { fontSize: 20, fontWeight: 'bold' },
  buttons: { width: '100%' },
});
