'use client';

import { useState, useEffect } from 'react';
import { TransactionForm } from '@/components/transaction-form';
import { TransactionList } from '@/components/transaction-list';
import { MonthlyExpensesChart } from '@/components/monthly-expenses-chart';
import { CategoryPieChart } from '@/components/category-pie-chart';
import { BudgetForm } from '@/components/budget-form';
import { BudgetComparisonChart } from '@/components/budget-comparison-chart';
import { SpendingInsights } from '@/components/spending-insights';
import { DashboardSummary } from '@/components/dashboard-summary';
import { SummaryCards } from '@/components/summary-cards';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Transaction, TransactionFormData, Budget, BudgetFormData } from '@/types/transaction';
import { transactionStorage } from '@/lib/transaction-storage';
import { budgetStorage } from '@/lib/budget-storage';
import { 
  getMonthlyExpenses, 
  getCategoryExpenses, 
  getBudgetComparisons, 
  getSpendingInsights 
} from '@/lib/transaction-utils';
import { PiggyBank, BarChart3, Target, Lightbulb } from 'lucide-react';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const savedTransactions = transactionStorage.getAll();
      const savedBudgets = budgetStorage.getAll();
      setTransactions(savedTransactions);
      setBudgets(savedBudgets);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleAddTransaction = (formData: TransactionFormData) => {
    const newTransaction = transactionStorage.add({
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description,
      type: formData.type,
      category: formData.category,
    });

    setTransactions(prev => [...prev, newTransaction]);
  };

  const handleEditTransaction = (formData: TransactionFormData) => {
    if (!editingTransaction) return;

    const updatedTransaction = transactionStorage.update(editingTransaction.id, {
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description,
      type: formData.type,
      category: formData.category,
    });

    if (updatedTransaction) {
      setTransactions(prev => 
        prev.map(t => t.id === editingTransaction.id ? updatedTransaction : t)
      );
      setEditingTransaction(null);
    }
  };

  const handleDeleteTransaction = (id: string) => {
    const success = transactionStorage.delete(id);
    if (success) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleCancelEditTransaction = () => {
    setEditingTransaction(null);
  };

  const handleAddBudget = (formData: BudgetFormData) => {
    const newBudget = budgetStorage.add({
      category: formData.category,
      amount: parseFloat(formData.amount),
      month: formData.month,
    });

    setBudgets(prev => {
      const filtered = prev.filter(
        b => !(b.category === newBudget.category && b.month === newBudget.month)
      );
      return [...filtered, newBudget];
    });
  };

  const handleEditBudget = (formData: BudgetFormData) => {
    if (!editingBudget) return;

    const updatedBudget = budgetStorage.update(editingBudget.id, {
      category: formData.category,
      amount: parseFloat(formData.amount),
      month: formData.month,
    });

    if (updatedBudget) {
      setBudgets(prev => 
        prev.map(b => b.id === editingBudget.id ? updatedBudget : b)
      );
      setEditingBudget(null);
    }
  };

  const handleDeleteBudget = (id: string) => {
    const success = budgetStorage.delete(id);
    if (success) {
      setBudgets(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleCancelEditBudget = () => {
    setEditingBudget(null);
  };

  const monthlyExpenses = getMonthlyExpenses(transactions);
  const categoryExpenses = getCategoryExpenses(transactions);
  const budgetComparisons = getBudgetComparisons(budgets, transactions);
  const spendingInsights = getSpendingInsights(transactions, budgets);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your finances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PiggyBank className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Personal Finance Tracker</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Take control of your finances with comprehensive insights and budgeting
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <PiggyBank className="w-4 h-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Budgets
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Dashboard Summary */}
            <DashboardSummary 
              transactions={transactions} 
              categoryExpenses={categoryExpenses} 
            />

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MonthlyExpensesChart data={monthlyExpenses} />
              <CategoryPieChart data={categoryExpenses} />
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Transaction Form */}
              <div>
                <TransactionForm
                  onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
                  initialData={editingTransaction || undefined}
                  onCancel={editingTransaction ? handleCancelEditTransaction : undefined}
                  isEditing={!!editingTransaction}
                />
              </div>

              {/* Monthly Chart */}
              <div>
                <MonthlyExpensesChart data={monthlyExpenses} />
              </div>
            </div>

            {/* Transaction List */}
            <TransactionList
              transactions={transactions}
              onEdit={setEditingTransaction}
              onDelete={handleDeleteTransaction}
            />
          </TabsContent>

          <TabsContent value="budgets" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Budget Form */}
              <div>
                <BudgetForm
                  onSubmit={editingBudget ? handleEditBudget : handleAddBudget}
                  initialData={editingBudget || undefined}
                  onCancel={editingBudget ? handleCancelEditBudget : undefined}
                  isEditing={!!editingBudget}
                />
              </div>

              {/* Budget Comparison Chart */}
              <div>
                <BudgetComparisonChart data={budgetComparisons} />
              </div>
            </div>

            {/* Budget List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Budgets</h3>
              {budgets.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-lg mb-2">No budgets set</div>
                  <p className="text-gray-500">Set your first budget above to start tracking your spending goals</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {budgets.map((budget) => (
                    <div key={budget.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800">{budget.category}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBudget(budget.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{budget.month}</p>
                      <p className="text-lg font-semibold text-green-600">
                        ${budget.amount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-8">
            <SpendingInsights insights={spendingInsights} />
            
            {budgetComparisons.length > 0 && (
              <BudgetComparisonChart data={budgetComparisons} />
            )}
          </TabsContent>
        </Tabs>

        {/* Development Actions */}
        {(transactions.length > 0 || budgets.length > 0) && (
          <div className="mt-8 text-center space-x-4">
            {transactions.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  transactionStorage.clear();
                  setTransactions([]);
                  setEditingTransaction(null);
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear All Transactions
              </Button>
            )}
            {budgets.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  budgetStorage.clear();
                  setBudgets([]);
                  setEditingBudget(null);
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear All Budgets
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}