import React, { useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    // For demo: Just alert success and clear cart
    Alert.alert('Success', 'Your order has been placed!');
    clearCart();
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Checkout</Text>
      <Button title="Confirm Order" onPress={handleCheckout} />
    </View>
  );
}
