import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { generateId } from '../lib/utils';
import type { PoultryType } from '../types';

export const Purchases = () => {
  const { addPurchase, updateStock } = useStore();
  const [type, setType] = useState<PoultryType>('Broiler');
  const [numberOfBirds, setNumberOfBirds] = useState('');
  const [weight, setWeight] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const purchase = {
      id: generateId(),
      date: new Date(),
      type,
      numberOfBirds: parseInt(numberOfBirds),
      pricePerUnit: parseFloat(pricePerUnit),
      totalPrice: type === 'Broiler'
        ? parseFloat(weight) * parseFloat(pricePerUnit)
        : parseInt(numberOfBirds) * parseFloat(pricePerUnit),
      weight: type === 'Broiler' ? parseFloat(weight) : undefined,
    };

    addPurchase(purchase);
    updateStock('purchase', purchase);

    // Reset form
    setNumberOfBirds('');
    setWeight('');
    setPricePerUnit('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">New Purchase</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as PoultryType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Broiler">Broiler</option>
            <option value="Layer">Layer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Birds
          </label>
          <Input
            type="number"
            value={numberOfBirds}
            onChange={(e) => setNumberOfBirds(e.target.value)}
            required
            min="1"
          />
        </div>

        {type === 'Broiler' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              min="0.1"
              step="0.1"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {type === 'Broiler' ? 'Price per kg' : 'Price per Bird'}
          </label>
          <Input
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <Button type="submit" className="w-full">
          Add Purchase
        </Button>
      </form>

      {/* Purchase History */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-700">Purchase History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Birds
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Purchase history rows will be rendered here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};