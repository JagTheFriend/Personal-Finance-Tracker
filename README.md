# Personal Finance Visualizer

A comprehensive personal finance tracking application built with Next.js, React, and modern web technologies. This application provides transaction management capabilities with data visualization and comprehensive financial insights.

## Features

- **Transaction Management**: Add, edit, and delete transactions with comprehensive form validation
- **Transaction List**: View all transactions with search functionality and type filtering
- **Monthly Visualization**: Interactive bar chart showing monthly income versus expenses
- **Summary Dashboard**: Real-time summary cards displaying total income, expenses, net income, and transaction count
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Local Storage**: Persistent data storage without requiring authentication

## Technology Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Frontend**: React 18.2.0 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **Build**: Static export ready for deployment

## Design Architecture

- **Modern Interface**: Clean, professional design with subtle animations
- **Color System**: Sophisticated palette with proper contrast ratios
- **Typography**: Inter font with proper hierarchy and spacing
- **Micro-interactions**: Smooth hover effects and transitions
- **Visual Feedback**: Real-time form validation and loading states
- **Accessibility**: Proper ARIA labels and keyboard navigation support

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

### Adding Transactions
1. Complete the transaction form with amount, date, description, and type
2. Click "Add Transaction" to save the entry
3. View the transaction in the list below

### Managing Transactions
- **Edit**: Click the edit icon on any transaction to modify details
- **Delete**: Click the trash icon to remove a transaction
- **Search**: Use the search functionality to find specific transactions
- **Filter**: Filter transactions by type (All, Income, Expenses)

### Viewing Analytics
- **Summary Cards**: Overview of financial status displayed at the top
- **Monthly Chart**: Visual representation of income versus expenses by month
- **Transaction History**: Complete transaction list with sorting and filtering capabilities

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main application page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── monthly-expenses-chart.tsx
│   ├── summary-cards.tsx
│   ├── transaction-form.tsx
│   └── transaction-list.tsx
├── lib/
│   ├── transaction-storage.ts    # Local storage utilities
│   ├── transaction-utils.ts      # Helper functions
│   └── utils.ts                  # General utilities
├── types/
│   └── transaction.ts            # TypeScript type definitions
└── README.md
```

## Component Documentation

### TransactionForm
- Comprehensive form validation with real-time error feedback
- Support for both adding and editing transactions
- Responsive design with accessibility features
- Input sanitization and data validation

### TransactionList
- Advanced search and filtering capabilities
- Smooth animations and interactive elements
- Mobile-optimized responsive layout
- Efficient rendering for large datasets

### MonthlyExpensesChart
- Interactive Recharts-based visualization
- Custom tooltips and professional styling
- Responsive chart sizing and layout
- Proper handling of empty states

### SummaryCards
- Real-time financial metrics calculation
- Color-coded visual indicators
- Responsive grid layout
- Performance-optimized updates

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
- Consistent component structure
- Proper error handling implementation

### Performance Considerations
- Optimized bundle size
- Efficient state management
- Lazy loading where applicable
- Minimal re-renders
