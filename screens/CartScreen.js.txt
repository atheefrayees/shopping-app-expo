import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.name} x {item.quantity}</Text>
                <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                <Button title="Remove" onPress={() => removeFromCart(item.id)} />
              </View>
            )}
          />
          <Text style={styles.total}>Total: ${total}</Text>
          <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
          <Button title="Clear Cart" onPress={clearCart} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 16,
  },
});
