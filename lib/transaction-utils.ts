import { Transaction, MonthlyExpense } from '@/types/transaction';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getMonthlyExpenses = (transactions: Transaction[]): MonthlyExpense[] => {
  const monthlyData: { [key: string]: { expenses: number; income: number } } = {};

  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { expenses: 0, income: 0 };
    }
    
    if (transaction.type === 'expense') {
      monthlyData[monthKey].expenses += transaction.amount;
    } else {
      monthlyData[monthKey].income += transaction.amount;
    }
  });

  return Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      expenses: data.expenses,
      income: data.income,
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
};

export const getTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getRecentTransactions = (transactions: Transaction[], count: number = 5): Transaction[] => {
  return transactions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
};