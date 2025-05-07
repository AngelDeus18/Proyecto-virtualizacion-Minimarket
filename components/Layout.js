import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';

const Layout = ({ children }) => {
    const navigation = useNavigation();
    const { authState } = useAuth(); // Obtén el estado global
    const userRole = authState.role; // Obtén el rol del usuario

    const handleMenuPress = () => {
        navigation.toggleDrawer?.(); // si usas Drawer
    };

    const handleProfilePress = () => {
        if (userRole === 'admin') {
            navigation.navigate('AdminRoot', { screen: 'AccountScreenAdmin' }); // Navega a la pantalla de admin
        } else if (userRole === 'user') {
            navigation.navigate('UserRoot', { screen: 'AccountScreen' }); // Navega a la pantalla de usuario
        } else {
            navigation.navigate('Login'); // Navega a la pantalla de login si no está logueado
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Header
                onMenuPress={handleMenuPress}
                onProfilePress={handleProfilePress}
            />
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6FDFF',
    },
    content: {
        flex: 1,
        backgroundColor: '#F6FDFF',
    },
});

export default Layout;
