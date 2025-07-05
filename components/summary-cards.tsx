'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { Transaction } from '@/types/transaction';
import { formatCurrency, getTotalExpenses, getTotalIncome } from '@/lib/transaction-utils';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const netIncome = totalIncome - totalExpenses;
  const transactionCount = transactions.length;

  const cards = [
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    {
      title: 'Net Income',
      value: formatCurrency(netIncome),
      icon: DollarSign,
      color: netIncome >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: netIncome >= 0 ? 'bg-green-50' : 'bg-red-50',
      borderColor: netIncome >= 0 ? 'border-green-200' : 'border-red-200',
    },
    {
      title: 'Total Transactions',
      value: transactionCount.toString(),
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <Card key={card.title} className={`border-2 ${card.borderColor} ${card.bgColor} hover:shadow-lg transition-all duration-200 transform hover:scale-105`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className={`text-2xl font-bold ${card.color}`}>
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} opacity-80`}>
                <card.icon className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}