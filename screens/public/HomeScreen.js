import React from 'react';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { View, Text,  StyleSheet, TextInput, FlatList, Pressable, Image } from 'react-native';
import ProductCard from '../../components/ProductCard';
import { Ionicons } from '@expo/vector-icons';
import { products } from '../../data/products';

const categories = ['Todas', 'Aseo hogar', 'Despensa', 'Frutas Verduras', 'Carnes', 'Lacteos', 'Higiene Personal'];

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);//estado para la categoria seleccionada
    const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

    //funcion para manejar cuando el usuario selecciona una categoría
    const handleCategoryPress = (category) => {
        if (category === 'Todas') {
            setSelectedCategory(null); // Si se selecciona todas, se limpia la categoría seleccionada
        } else {
            setSelectedCategory(category);// Si se selecciona una categoría, se establece la categoría seleccionada
        }
    };

    // Filtrar productos según la categoría seleccionada
    const filteredProductsByCategory = selectedCategory
        ? products.filter(product => product.category === selectedCategory)// Si hay una categoría seleccionada, se filtra por ella
        : products; // Si no hay categoría seleccionada, no se filtra

    // Filtrar productos por nombre según la búsqueda
    const filteredProducts = filteredProductsByCategory.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())// Filtra productos cuyo nombre incluya el término de búsqueda
    );

    return (
        <Layout>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.containerTitle}>
                        
                        <Text style={styles.title}>
                            Empieza{"\n"}
                            <Text style={{ color: '#4A90E2' }}>Elije, </Text>
                            lleva 
                        </Text>
                        
                        <View style={styles.imageContainer}>
                            <Image source={require('../../assets/logo-market.png')} style={styles.logo} />
                        </View>
                    </View>

                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Buscar productos"
                            style={styles.searchInput}
                            placeholderTextColor="gray"
                            value={searchQuery} 
                            onChangeText={setSearchQuery} 
                        />
                    </View>

                    <View style={styles.categoryList}>
                        <FlatList
                            data={categories}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => {
                                const isSelected = selectedCategory === item || (item === 'Todas' && selectedCategory === null);
                                return (
                                    <Pressable
                                        style={[
                                            styles.categoryButton,
                                            isSelected && styles.selectedCategoryButton // estilo especial si está seleccionada
                                        ]}
                                        onPress={() => handleCategoryPress(item)}
                                    >
                                        <Text style={[
                                            styles.categoryText,
                                            isSelected && styles.selectedCategoryText 
                                        ]}>
                                            {item}
                                        </Text>
                                    </Pressable>
                                );
                            }}
                        />
                    </View>
                </View>

                {/* Lista de productos */}
                <ProductCard products={filteredProducts} /> {/* Pasa los productos filtrados a `ProductCard */}
            </View >
        </Layout>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6FDFF',
    },
    content: {
        paddingHorizontal: 10,
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
    title: {
        fontSize: 45,
        paddingTop: 20,
        paddingBottom: 20,
        fontWeight: '900',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        fontSize: 16,
        color: '#000',
    },
    categoryList: {
        marginTop: 15,
        marginBottom: 15,
    },
    categoryButton: {
        backgroundColor: '#E4F0FF',
        borderRadius: 20,
        marginRight: 10,
        padding: 8,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    selectedCategoryButton: {
        backgroundColor: '#4A90E2',
    },

    selectedCategoryText: {
        color: '#fff',
    },
});

export default HomeScreen;
