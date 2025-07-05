import { Budget } from '@/types/transaction';

const STORAGE_KEY = 'personal_finance_budgets';

export const budgetStorage = {
  getAll: (): Budget[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading budgets:', error);
      return [];
    }
  },

  save: (budgets: Budget[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
    } catch (error) {
      console.error('Error saving budgets:', error);
    }
  },

  add: (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>): Budget => {
    const newBudget: Budget = {
      ...budget,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const budgets = budgetStorage.getAll();
    
    // Remove existing budget for same category and month
    const filteredBudgets = budgets.filter(
      b => !(b.category === budget.category && b.month === budget.month)
    );
    
    filteredBudgets.push(newBudget);
    budgetStorage.save(filteredBudgets);
    
    return newBudget;
  },

  update: (id: string, updates: Partial<Budget>): Budget | null => {
    const budgets = budgetStorage.getAll();
    const index = budgets.findIndex(b => b.id === id);
    
    if (index === -1) return null;
    
    const updatedBudget = {
      ...budgets[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    budgets[index] = updatedBudget;
    budgetStorage.save(budgets);
    
    return updatedBudget;
  },

  delete: (id: string): boolean => {
    const budgets = budgetStorage.getAll();
    const filteredBudgets = budgets.filter(b => b.id !== id);
    
    if (filteredBudgets.length === budgets.length) return false;
    
    budgetStorage.save(filteredBudgets);
    return true;
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },
};