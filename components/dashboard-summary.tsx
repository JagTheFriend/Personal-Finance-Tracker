'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction, CategoryExpense } from '@/types/transaction';
import { formatCurrency, formatDate, getRecentTransactions } from '@/lib/transaction-utils';

interface DashboardSummaryProps {
  transactions: Transaction[];
  categoryExpenses: CategoryExpense[];
}

export function DashboardSummary({ transactions, categoryExpenses }: DashboardSummaryProps) {
  const recentTransactions = getRecentTransactions(transactions, 5);
  const topCategories = categoryExpenses.slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Transactions */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Clock className="w-5 h-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">No recent transactions</div>
              <p className="text-gray-500">Your recent transactions will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={transaction.type === 'income' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            transaction.type === 'income' 
                              ? 'bg-green-100 text-green-800 border-green-200' 
                              : 'bg-red-100 text-red-800 border-red-200'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(transaction.date)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <TrendingDown className="w-5 h-5" />
            Top Expense Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {topCategories.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">No expense categories</div>
              <p className="text-gray-500">Your top spending categories will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <div>
                      <p className="font-medium text-gray-800">{category.category}</p>
                      <p className="text-sm text-gray-500">
                        {category.percentage.toFixed(1)}% of total expenses
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      {formatCurrency(category.amount)}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}