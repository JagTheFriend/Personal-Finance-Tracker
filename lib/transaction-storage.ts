import { Transaction } from '@/types/transaction';

const STORAGE_KEY = 'personal_finance_transactions';

export const transactionStorage = {
  getAll: (): Transaction[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading transactions:', error);
      return [];
    }
  },

  save: (transactions: Transaction[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  },

  add: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Transaction => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const transactions = transactionStorage.getAll();
    transactions.push(newTransaction);
    transactionStorage.save(transactions);
    
    return newTransaction;
  },

  update: (id: string, updates: Partial<Transaction>): Transaction | null => {
    const transactions = transactionStorage.getAll();
    const index = transactions.findIndex(t => t.id === id);
    
    if (index === -1) return null;
    
    const updatedTransaction = {
      ...transactions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    transactions[index] = updatedTransaction;
    transactionStorage.save(transactions);
    
    return updatedTransaction;
  },

  delete: (id: string): boolean => {
    const transactions = transactionStorage.getAll();
    const filteredTransactions = transactions.filter(t => t.id !== id);
    
    if (filteredTransactions.length === transactions.length) return false;
    
    transactionStorage.save(filteredTransactions);
    return true;
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },
};