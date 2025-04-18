import React from 'react';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ProductDetails = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { product } = route.params;
  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        {/* Header + Product juntos con sombra */}
        <View style={styles.headerProductWrapper}>
          <View style={styles.header}>
            <Pressable onPress={handlePressBack} style={styles.backButton}>
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => navigation.goCart?.()} style={styles.cartButton}>
              <Ionicons name="cart" size={24} color="black" />
            </Pressable>
          </View>
          {/* Conteneder del producto */}
          <View style={styles.productContainer}>
            <View>
              <Image source={{ uri: product.image }} style={styles.image} />
            </View>
            <Text style={styles.name}>{product.name}</Text>
            <View style={styles.quantity} >
              <Ionicons name="remove-outline" size={24} color="black" style={styles.minusQuantity} />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>1</Text>
              <Ionicons name="add-outline" size={24} color="black" style={styles.plusQuantity} />
            </View>
          </View>
        </View>
      </View>
      {/* Contenedor de la información del producto */}
      <View style={styles.infoContainer}>
        <Text style={styles.description}>Descripcion</Text>
        <Text style={styles.descriptionProduct}>{product.description}</Text>
      </View>
      <View style={styles.addToCart}>
        <Text style={styles.price}>${product.price}</Text>
        <Pressable style={styles.buttonAddToCart}>
          <Text style={{ fontSize: 20, fontWeight: '900', color: 'white' }}>Agregar al carrito</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#grey',
  },
  headerProductWrapper: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E0E7FF',
  },
  cartButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E0E7FF',
  },
  productContainer: {
    paddingTop: 5,
    alignItems: 'center',
    paddingBottom: 60,
  },
  image: {
    marginBottom: 10,
    width: 220,
    height: 220,
  },
  name: {
    fontSize: 30,
    fontWeight: '900',
  },
  quantity: {
    position: 'absolute',
    bottom: -18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderRadius: 15,
    backgroundColor: 'white',
  },
  plusQuantity: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#E0E7FF',
    borderRadius: 15,
  },
  minusQuantity: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#E0E7FF',
    borderRadius: 15,
  },
  infoContainer: {
    marginTop: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  description: {
    paddingBottom: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },
  addToCart: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  price: {
    flex: 1,
    fontSize: 30,
    fontWeight: '900',
    color: '#4A90E2',
  },
  buttonAddToCart: {
    backgroundColor: '#4A90E2',
    paddingTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 'auto',
  },
});

export default ProductDetails;