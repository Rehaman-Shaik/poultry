import React from 'react';
import { useStore } from '../store/useStore';

export const Stock = () => {
  const { stock } = useStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Broiler Stock */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Broiler Stock</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Total Birds</span>
              <span className="font-semibold">{stock.broiler.birds}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Total Weight</span>
              <span className="font-semibold">{stock.broiler.weight} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Weight per Bird</span>
              <span className="font-semibold">
                {stock.broiler.birds > 0
                  ? (stock.broiler.weight / stock.broiler.birds).toFixed(2)
                  : '0'} kg
              </span>
            </div>
          </div>
        </div>

        {/* Layer Stock */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Layer Stock</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Total Birds</span>
              <span className="font-semibold">{stock.layer.birds}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stock History Graph Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Stock History</h2>
        <div className="h-64 flex items-center justify-center border rounded">
          <p className="text-gray-500">Stock history graph will be implemented here</p>
        </div>
      </div>
    </div>
  );
};