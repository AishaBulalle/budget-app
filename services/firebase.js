import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore'; // Make sure to import these

const firebaseConfig = {
  apiKey: 'AIzaSyCWgp8W4rnYgorWEyqiEwjwCnrkscEvF2U',
  authDomain: 'mandatory-budgetapp.firebaseapp.com',
  projectId: 'mandatory-budgetapp',
  storageBucket: 'mandatory-budgetapp.firebasestorage.app',
  messagingSenderId: '1021375360133',
  appId: '1:1021375360133:web:fc2bce5ee351951e4bcdec',
  measurementId: 'G-RDG5KMH8E5',
};

// Initialize Firebase only if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firebase auth setup with AsyncStorage for persistence
const auth = getAuth(app);
setPersistence(auth, getReactNativePersistence(ReactNativeAsyncStorage)).catch(
  (error) => console.error('Error setting persistence:', error)
);

// Initialize Firestore
const db = getFirestore(app);

// Firestore functions for expenses
export const addExpense = async (expense) => {
  try {
    const expensesCollection = collection(db, 'expenses');
    await addDoc(expensesCollection, expense);
    console.log('Expense added successfully!');
  } catch (error) {
    console.error('Error adding expense: ', error);
  }
};

export const getExpenses = async () => {
  try {
    const expensesCollection = collection(db, 'expenses');
    const snapshot = await getDocs(expensesCollection);
    const expensesList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return expensesList;
  } catch (error) {
    console.error('Error getting expenses: ', error);
    return [];
  }
};

// Function to delete an expense from Firestore
export const deleteExpense = async (id) => {
  try {
    const expenseDoc = doc(db, 'expenses', id); // Get the document reference using doc
    await deleteDoc(expenseDoc); // Delete the expense document
    console.log('Expense deleted successfully!');
  } catch (error) {
    console.error('Error deleting expense: ', error);
  }
};

export { auth, db };
