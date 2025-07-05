'use client';

import { useState, useEffect } from 'react';
import { TransactionForm } from '@/components/transaction-form';
import { TransactionList } from '@/components/transaction-list';
import { MonthlyExpensesChart } from '@/components/monthly-expenses-chart';
import { SummaryCards } from '@/components/summary-cards';
import { Transaction, TransactionFormData } from '@/types/transaction';
import { transactionStorage } from '@/lib/transaction-storage';
import { getMonthlyExpenses } from '@/lib/transaction-utils';
import { Button } from '@/components/ui/button';
import { PiggyBank } from 'lucide-react';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = () => {
      const savedTransactions = transactionStorage.getAll();
      setTransactions(savedTransactions);
      setIsLoading(false);
    };

    loadTransactions();
  }, []);

  const handleAddTransaction = (formData: TransactionFormData) => {
    const newTransaction = transactionStorage.add({
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description,
      type: formData.type,
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

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  const monthlyExpenses = getMonthlyExpenses(transactions);

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
            Take control of your finances with beautiful insights and tracking
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Transaction Form */}
          <div>
            <TransactionForm
              onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
              initialData={editingTransaction || undefined}
              onCancel={editingTransaction ? handleCancelEdit : undefined}
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

        {/* Development Actions */}
        {transactions.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => {
                transactionStorage.clear();
                setTransactions([]);
                setEditingTransaction(null);
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear All Data
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}