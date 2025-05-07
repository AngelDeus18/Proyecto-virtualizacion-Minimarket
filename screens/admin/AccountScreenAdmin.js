import React from "react";
import {Text,StyleSheet,View,Pressable,Image} from "react-native";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";

const AccountScreen = ({ navigation }) => {
  const { onLogout } = useAuth(); // Obtén la función logout del contexto

  const handleLogout = async () => {
    try {
      onLogout(); // Llama al método logout del contexto para limpiar la sesión
      // Redirige al HomeScreen
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>DA</Text>
          </View>
          <Text style={styles.title}>Daniel Alejandro</Text>
          <Text style={styles.subtitle}>Administrador</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Información Personal</Text>

            <View style={styles.infoRow}>
              <MaterialIcons
                name="email"
                size={20}
                color="#4A6572"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>danie@example.com</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons
                name="phone"
                size={20}
                color="#4A6572"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Teléfono:</Text>
              <Text style={styles.infoValue}>+123456789</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Panel de Administración</Text>

          <Pressable
            style={styles.menuItem}
            onPress={() => navigation.navigate("AdminDashboard")}
          >
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="box" size={18} color="#ffffff" />
            </View>
            <Text style={styles.menuText}>Productos</Text>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color="#4A6572"
              style={styles.menuArrow}
            />
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={() => navigation.navigate("UserManagement")}
          >
            <View style={styles.menuIconContainer}>
              <Feather name="users" size={18} color="#ffffff" />
            </View>
            <Text style={styles.menuText}>Gestionar Usuarios</Text>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color="#4A6572"
              style={styles.menuArrow}
            />
          </Pressable>
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons
            name="logout"
            size={20}
            color="#ffffff"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0077B6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#263238",
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#4A6572",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#263238",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoIcon: {
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A6572",
    width: 80,
  },
  infoValue: {
    fontSize: 16,
    color: "#263238",
    flex: 1,
  },
  menuSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#0077B6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuText: {
    fontSize: 16,
    color: "#263238",
    fontWeight: "500",
    flex: 1,
  },
  menuArrow: {
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: "auto",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AccountScreen;
