import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getExpenses, deleteExpense } from '../services/firebase'; // Import deleteExpense function
import ExpenseItem from '../components/ExpenseItem';
import { signOut } from 'firebase/auth'; // Import signOut from firebase
import { auth } from '../services/firebase'; // Import auth

const HomeScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch expenses from Firebase Firestore
  const fetchExpenses = async () => {
    const expensesData = await getExpenses();
    setExpenses(expensesData);

    // Calculate total amount only if amount is a valid number
    const total = expensesData.reduce((acc, expense) => {
      const expenseAmount = parseFloat(expense.amount);
      if (!isNaN(expenseAmount)) {
        return acc + expenseAmount;
      }
      return acc;
    }, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id); // Call delete function from firebase.js
    fetchExpenses(); // Re-fetch expenses after deletion
  };

  // Log out the user
  const handleLogOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigation.reset({
        index: 0, // Reset the stack to only have the Login screen
        routes: [{ name: 'Login' }], // Navigate to Login screen
      });
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Udgifter</Text>
      <Text style={styles.total}>Total: {totalAmount} DKK</Text>

      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <ExpenseItem
              category={item.category}
              amount={item.amount}
              description={item.description}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteExpense(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Tilføj ny udgift"
        onPress={() => navigation.navigate('AddExpense')} // Navigate to AddExpenseScreen
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Log ud</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  expenseItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
