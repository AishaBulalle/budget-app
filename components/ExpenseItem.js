import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseItem = ({ category, amount, description }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.category}>
        Kategori: <Text style={styles.bold}>{category}</Text>
      </Text>
      <Text style={styles.amount}>
        Beløb: <Text style={styles.bold}>{amount}</Text> DKK
      </Text>
      <Text style={styles.description}>
        Beskrivelse: <Text style={styles.bold}>{description}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  amount: {
    fontSize: 16,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ExpenseItem;
