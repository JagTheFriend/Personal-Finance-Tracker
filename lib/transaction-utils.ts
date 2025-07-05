import { Transaction, MonthlyExpense, CategoryExpense, BudgetComparison, SpendingInsight, Budget } from '@/types/transaction';

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

export const getCategoryExpenses = (transactions: Transaction[]): CategoryExpense[] => {
  const categoryData: { [key: string]: number } = {};
  const totalExpenses = getTotalExpenses(transactions);

  transactions
    .filter(t => t.type === 'expense')
    .forEach(transaction => {
      categoryData[transaction.category] = (categoryData[transaction.category] || 0) + transaction.amount;
    });

  const colors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4',
    '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#84cc16',
    '#06b6d4', '#6366f1', '#a855f7'
  ];

  return Object.entries(categoryData)
    .map(([category, amount], index) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      color: colors[index % colors.length],
    }))
    .sort((a, b) => b.amount - a.amount);
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

export const getCurrentMonth = (): string => {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

export const getBudgetComparisons = (budgets: Budget[], transactions: Transaction[]): BudgetComparison[] => {
  const currentMonth = getCurrentMonth();
  const currentMonthTransactions = transactions.filter(t => {
    const transactionMonth = new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    return transactionMonth === currentMonth && t.type === 'expense';
  });

  const actualSpending: { [category: string]: number } = {};
  currentMonthTransactions.forEach(t => {
    actualSpending[t.category] = (actualSpending[t.category] || 0) + t.amount;
  });

  return budgets
    .filter(b => b.month === currentMonth)
    .map(budget => {
      const actual = actualSpending[budget.category] || 0;
      const percentage = budget.amount > 0 ? (actual / budget.amount) * 100 : 0;
      
      let status: 'under' | 'over' | 'on-track' = 'under';
      if (percentage > 100) status = 'over';
      else if (percentage >= 80) status = 'on-track';

      return {
        category: budget.category,
        budgeted: budget.amount,
        actual,
        percentage,
        status,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);
};

export const getSpendingInsights = (transactions: Transaction[], budgets: Budget[]): SpendingInsight[] => {
  const insights: SpendingInsight[] = [];
  const currentMonth = getCurrentMonth();
  const budgetComparisons = getBudgetComparisons(budgets, transactions);
  
  // Budget overspending insights
  budgetComparisons.forEach(comparison => {
    if (comparison.status === 'over') {
      const overspent = comparison.actual - comparison.budgeted;
      insights.push({
        type: 'warning',
        title: 'Budget Exceeded',
        description: `You've exceeded your ${comparison.category} budget by ${formatCurrency(overspent)} this month.`,
        category: comparison.category,
        amount: overspent,
      });
    } else if (comparison.status === 'on-track' && comparison.percentage >= 90) {
      insights.push({
        type: 'warning',
        title: 'Budget Alert',
        description: `You're close to your ${comparison.category} budget limit (${comparison.percentage.toFixed(0)}% used).`,
        category: comparison.category,
      });
    }
  });

  // Category spending insights
  const categoryExpenses = getCategoryExpenses(transactions);
  if (categoryExpenses.length > 0) {
    const topCategory = categoryExpenses[0];
    if (topCategory.percentage > 40) {
      insights.push({
        type: 'info',
        title: 'High Category Spending',
        description: `${topCategory.category} accounts for ${topCategory.percentage.toFixed(0)}% of your total expenses.`,
        category: topCategory.category,
        amount: topCategory.amount,
      });
    }
  }

  // Positive insights
  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  
  if (savingsRate > 20) {
    insights.push({
      type: 'success',
      title: 'Great Savings Rate',
      description: `You're saving ${savingsRate.toFixed(0)}% of your income. Keep up the excellent work!`,
    });
  }

  return insights.slice(0, 5); // Limit to 5 insights
};