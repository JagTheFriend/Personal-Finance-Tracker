'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info, Lightbulb } from 'lucide-react';
import { SpendingInsight } from '@/types/transaction';
import { formatCurrency } from '@/lib/transaction-utils';

interface SpendingInsightsProps {
  insights: SpendingInsight[];
}

export function SpendingInsights({ insights }: SpendingInsightsProps) {
  const getInsightIcon = (type: SpendingInsight['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  const getInsightBadgeColor = (type: SpendingInsight['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Lightbulb className="w-5 h-5" />
          Spending Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {insights.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No insights available</div>
            <p className="text-gray-500">
              Add more transactions and budgets to get personalized insights
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex-shrink-0 mt-1">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                    <Badge className={getInsightBadgeColor(insight.type)}>
                      {insight.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {insight.description}
                  </p>
                  {insight.category && (
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {insight.category}
                      </Badge>
                      {insight.amount && (
                        <span className="text-xs text-gray-500">
                          {formatCurrency(insight.amount)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}