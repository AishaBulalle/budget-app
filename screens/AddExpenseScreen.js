import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { addExpense } from '../services/firebase'; // Function to add expense to Firestore

const AddExpenseScreen = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExpense = async () => {
    const expense = {
      category,
      amount: parseFloat(amount), // Ensure the amount is a number
      description,
    };

    // Add the expense to Firebase
    await addExpense(expense);

    // Clear the form fields after adding the expense
    setCategory('');
    setAmount('');
    setDescription('');

    // Navigate to the Home screen and reset the stack so "Back" leads to Login
    navigation.reset({
      index: 0, // Set Home screen as the root of the stack
      routes: [{ name: 'Home' }], // Go to Home screen
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        placeholder="Kategori"
        value={category}
        onChangeText={setCategory}
      />
      <Text style={styles.label}>Beløb</Text>
      <TextInput
        style={styles.input}
        placeholder="Beløb"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Beskrivelse</Text>
      <TextInput
        style={styles.input}
        placeholder="Beskrivelse"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Tilføj Udgift" onPress={handleAddExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default AddExpenseScreen;
