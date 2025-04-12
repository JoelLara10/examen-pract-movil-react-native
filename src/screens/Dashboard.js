import React, { useEffect, useState } from 'react';
import { View, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { getUsers, createUser, updateUser, deleteUser } from '../api';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

export default function Dashboard({ token, onLogout }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await getUsers(token);
      setUsers(data);
    } catch (error) {
      alert('Error al obtener usuarios');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateOrUpdate = async (userData) => {
    try {
      if (userData.id) {
        await updateUser(userData.id, userData, token);
        alert('Usuario actualizado');
      } else {
        await createUser(userData, token);
        alert('Usuario creado');
      }
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert('Error al guardar usuario');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id, token);
      alert('Usuario eliminado');
      fetchUsers();
    } catch (err) {
      alert('Error al eliminar usuario');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Panel de Usuarios</Text>
      <UserForm
        user={editingUser}
        onSubmit={handleCreateOrUpdate}
        onCancel={() => setEditingUser(null)}
      />
      <UserList
        users={users}
        onEdit={(user) => setEditingUser(user)}
        onDelete={handleDelete}
      />
      <Button title="Cerrar sesión" onPress={onLogout} color="red" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
