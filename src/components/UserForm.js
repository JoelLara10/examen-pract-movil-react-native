import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function UserForm({ user, onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(''); // por seguridad, no rellenamos la contraseña
    }
  }, [user]);

  const handleSubmit = () => {
    if (!name || !email || (!user && !password)) {
      return alert('Completa todos los campos');
    }

    const userData = {
      ...user,
      name,
      email,
      ...(password ? { password } : {}), // solo manda password si fue escrita
    };

    onSubmit(userData);

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={user ? 'Actualizar' : 'Crear'} onPress={handleSubmit} />
      {onCancel && <Button title="Cancelar" color="gray" onPress={onCancel} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
    borderRadius: 5,
  },
});
