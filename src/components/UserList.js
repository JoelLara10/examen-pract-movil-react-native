import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function UserList({ users, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Button title="Editar" onPress={() => onEdit(item)} />
            <Button title="Eliminar" onPress={() => onDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
