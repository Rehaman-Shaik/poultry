import React from 'react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../lib/utils';

export const Dashboard = () => {
  const { purchases, sales, stock } = useStore();

  // Calculate total purchases and sales
  const totalPurchases = purchases.reduce((sum, p) => sum + p.totalPrice, 0);
  const totalSales = sales.reduce((sum, s) => sum + s.totalAmount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Purchases</h2>
          <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalPurchases)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(totalSales)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Profit</h2>
          <p className="text-3xl font-bold text-purple-600">{formatCurrency(totalSales - totalPurchases)}</p>
        </div>
      </div>

      {/* Stock Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Current Stock</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-2">Broiler</h3>
            <div className="space-y-2">
              <p>Birds: {stock.broiler.birds}</p>
              <p>Weight: {stock.broiler.weight} kg</p>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-2">Layer</h3>
            <p>Birds: {stock.layer.birds}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[...sales].reverse().slice(0, 5).map((sale) => (
            <div key={sale.id} className="border-b pb-2">
              <p className="font-medium">Sale to {sale.customerName}</p>
              <p className="text-sm text-gray-500">
                {sale.type} - {sale.numberOfBirds} birds - {formatCurrency(sale.totalAmount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};