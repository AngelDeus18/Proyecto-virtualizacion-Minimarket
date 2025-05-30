import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { firebaseApp } from "../firebase.config";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CartContext";
import { showMessage } from "react-native-flash-message";

const db = getFirestore(firebaseApp);

export default function ProductCard({ selectedCategory, searchQuery }) {
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    showMessage({
      message: "Agregado al carrito correctamente",
      type: "success",
      duration: 1500,
      titleStyle: { fontSize: 20, fontWeight: "bold" },
      style: {
      paddingVertical: 24,
      paddingHorizontal: 32,
      minWidth: 350,
      alignSelf: "center",
      borderRadius: 10,
    },
      icon: "success",
    });
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (querySnapshot) => {
        // Cuando hay cambios, se actualiza el array de productos
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsArray); // Actualiza el estado con los productos
        setLoading(false); // Quita el indicador de carga
      },
      (error) => {
        // Manejo de errores en la suscripción
        console.error("Error al obtener productos:", error);
        setLoading(false);
      }
    );

    // Esta es la función de limpieza del useEffect, Se llama cuando el componente se desmonta para detener la suscripción en tiempo real y evitar fugas de memoria (memory leaks).
    return () => unsubscribe();
  }, []);

  // Filtrar productos por categoría
  const filteredByCategory = selectedCategory
    ? products.filter(
        (product) =>
          (product.category || "").toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim()
      )
    : products;

  // Filtrar productos por búsqueda
  const filteredProducts = filteredByCategory.filter((product) => {
    const query = (searchQuery || "").toLowerCase();

    return Object.values(product).some((value) =>
      String(value).toLowerCase().includes(query)
    );
  });

  const handlePressProduct = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#4A90E2"
        style={{ marginTop: 40 }}
      />
    );
  }

  return (
    <FlatList
      style={styles.content}
      data={filteredProducts}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => handlePressProduct(item)}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
          </View>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardPresentation}>
            Presentacion: {item.quantity_per_unit} {item.unit}
          </Text>
          <View style={styles.cardBottom}>
            <Text style={styles.cardPrice}>
              ${item.price.toLocaleString("es-CL")}
            </Text>
            <Pressable
              onPress={() => handleAddToCart(item, 1, item.price)}
              style={({ pressed }) => [
                styles.addToCartButtonText,
                { backgroundColor: pressed ? "#2563EB" : "#4A90E2" },
              ]}
            >
              <Ionicons name="cart-outline" style={styles.iconCart} />
            </Pressable>
          </View>
        </Pressable>
      )}
    />
  );
}
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 10,
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 25,
    marginRight: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardPressed: {
    transform: [{ scale: 1.05 }],
  },
  imageContainer: {
    alignItems: "center",
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 19,
    alignItems: "center",
    fontWeight: "900",
    textAlign: "center",
  },
  cardPresentation: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 8,
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardPrice: {
    fontSize: 22,
    color: "#4A90E2",
    marginTop: 10,
    fontWeight: "900",
    maxWidth: "70%",
  },
  addToCartButtonText: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 15,
    padding: 10,
    borderRadius: 50,
  },
  iconCart: {
    fontSize: 20,
    color: "#fff",
  },
});
