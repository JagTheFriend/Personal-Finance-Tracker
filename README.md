# Personal Finance Visualizer

A comprehensive personal finance tracking application built with Next.js, React, and modern web technologies. This application provides complete financial management capabilities including transaction tracking, categorization, budgeting, and intelligent insights with advanced data visualization.

## Features

### Stage 1 - Basic Transaction Tracking
- **Transaction Management**: Add, edit, and delete transactions with comprehensive form validation
- **Transaction List**: View all transactions with search functionality and type filtering
- **Monthly Visualization**: Interactive bar chart showing monthly income versus expenses
- **Summary Dashboard**: Real-time summary cards displaying total income, expenses, net income, and transaction count
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Local Storage**: Persistent data storage without requiring authentication

### Stage 2 - Categories
- **Predefined Categories**: Comprehensive category systems for both income and expenses
- **Category-wise Pie Chart**: Interactive pie chart showing expense breakdown by category with percentages
- **Enhanced Dashboard**: Dashboard summary featuring recent transactions and top expense categories
- **Smart Category Selection**: Transaction form automatically updates categories based on transaction type
- **Category Analytics**: Detailed analysis of spending patterns across different categories

### Stage 3 - Budgeting
- **Budget Management**: Set and manage monthly budgets for each expense category
- **Budget vs Actual Comparison**: Interactive bar chart comparing budgeted amounts to actual spending
- **Spending Insights**: Intelligent insights system providing personalized financial advice and alerts
- **Budget Tracking**: Visual progress indicators showing budget utilization percentages
- **Financial Recommendations**: Automated suggestions for budget optimization and spending improvements

## Technology Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Frontend**: React 18.2.0 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **Build**: Static export ready for deployment

## Design Architecture

- **Modern Interface**: Clean, professional design with subtle animations and micro-interactions
- **Color System**: Sophisticated palette with proper contrast ratios and accessibility compliance
- **Typography**: Inter font with proper hierarchy and spacing
- **Visual Feedback**: Real-time form validation, loading states, and interactive elements
- **Accessibility**: Proper ARIA labels, keyboard navigation support, and screen reader compatibility
- **Responsive Layout**: Optimized for all device sizes with mobile-first approach

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-finance-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage Guide

### Managing Transactions
1. **Adding Transactions**: Complete the transaction form with amount, date, description, type, and category
2. **Editing Transactions**: Click the edit icon on any transaction to modify details
3. **Deleting Transactions**: Click the trash icon to remove a transaction
4. **Search and Filter**: Use search functionality and type filters to find specific transactions

### Category Management
- **Expense Categories**: Food & Dining, Transportation, Shopping, Entertainment, Bills & Utilities, Healthcare, Education, Travel, Home & Garden, Personal Care, Gifts & Donations, Business, Other
- **Income Categories**: Salary, Freelance, Business, Investments, Rental, Gifts, Refunds, Other
- **Category Analytics**: View spending breakdown by category in the interactive pie chart

### Budget Planning
1. **Setting Budgets**: Navigate to the Budgets tab and set monthly limits for each expense category
2. **Tracking Progress**: Monitor budget utilization through the comparison chart
3. **Budget Alerts**: Receive automatic notifications when approaching or exceeding budget limits
4. **Budget Management**: Edit or delete existing budgets as needed

### Dashboard Analytics
- **Summary Cards**: Overview of total income, expenses, net income, and transaction count
- **Recent Transactions**: Quick view of the latest financial activities
- **Top Categories**: Identification of highest spending categories
- **Monthly Trends**: Visual representation of income and expense patterns over time

### Insights and Recommendations
- **Budget Alerts**: Notifications for budget overruns and approaching limits
- **Spending Patterns**: Analysis of category-wise spending behavior
- **Savings Rate**: Calculation and feedback on savings performance
- **Financial Health**: Overall assessment of financial management effectiveness

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main application page with tabbed interface
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── budget-comparison-chart.tsx    # Budget vs actual spending visualization
│   ├── budget-form.tsx               # Budget creation and editing form
│   ├── category-pie-chart.tsx        # Category-wise expense breakdown
│   ├── dashboard-summary.tsx         # Dashboard overview components
│   ├── monthly-expenses-chart.tsx    # Monthly financial overview
│   ├── spending-insights.tsx         # Intelligent financial insights
│   ├── summary-cards.tsx            # Financial summary metrics
│   ├── transaction-form.tsx         # Transaction management form
│   └── transaction-list.tsx         # Transaction history display
├── lib/
│   ├── budget-storage.ts            # Budget data persistence
│   ├── transaction-storage.ts       # Transaction data persistence
│   ├── transaction-utils.ts         # Financial calculation utilities
│   └── utils.ts                     # General utilities
├── types/
│   └── transaction.ts               # TypeScript type definitions
└── README.md
```

## Component Documentation

### TransactionForm
- Comprehensive form validation with real-time error feedback
- Dynamic category selection based on transaction type
- Support for both adding and editing transactions
- Responsive design with accessibility features

### CategoryPieChart
- Interactive Recharts-based pie chart visualization
- Custom tooltips showing amounts and percentages
- Color-coded category representation
- Responsive design with proper empty state handling

### BudgetForm
- Monthly budget setting for expense categories
- Form validation and error handling
- Month selection with future month options
- Integration with existing budget data

### BudgetComparisonChart
- Visual comparison of budgeted vs actual spending
- Color-coded status indicators (under, on-track, over)
- Interactive tooltips with detailed information
- Responsive chart layout

### SpendingInsights
- Intelligent analysis of spending patterns
- Automated budget alerts and recommendations
- Categorized insights (warning, success, info)
- Personalized financial advice

### DashboardSummary
- Recent transaction overview
- Top spending categories analysis
- Real-time data updates
- Mobile-optimized layout

## Configuration

### Tailwind CSS Configuration
- Custom color palette implementation
- Extended spacing and sizing system
- Animation and transition utilities
- Responsive breakpoint definitions

### Next.js Configuration
- Static export optimization
- TypeScript integration
- ESLint configuration
- Build optimization settings

## Development Guidelines

### Code Standards
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Consistent component structure and naming
- Comprehensive error handling implementation
- Modular architecture with clear separation of concerns

### Performance Considerations
- Optimized bundle size with tree shaking
- Efficient state management with minimal re-renders
- Lazy loading where applicable
- Optimized chart rendering with proper data handling

### Data Management
- Local storage for persistent data without authentication
- Efficient data structures for financial calculations
- Real-time updates across all components
- Data validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/feature-name`)
3. Commit changes with descriptive messages
4. Push to the feature branch
5. Submit a Pull Request with detailed description
