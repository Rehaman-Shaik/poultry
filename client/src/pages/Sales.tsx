import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { generateId, formatCurrency } from '../lib/utils';
import type { PoultryType } from '../types';

export const Sales = () => {
  const { addSale, updateStock, stock } = useStore();
  const [type, setType] = useState<PoultryType>('Broiler');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [numberOfBirds, setNumberOfBirds] = useState('');
  const [weight, setWeight] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sale = {
      id: generateId(),
      date: new Date(),
      customerName,
      address,
      mobileNumber,
      type,
      numberOfBirds: parseInt(numberOfBirds),
      pricePerUnit: parseFloat(pricePerUnit),
      totalAmount: type === 'Broiler'
        ? parseFloat(weight) * parseFloat(pricePerUnit)
        : parseInt(numberOfBirds) * parseFloat(pricePerUnit),
      weight: type === 'Broiler' ? parseFloat(weight) : undefined,
    };

    addSale(sale);
    updateStock('sale', sale);

    // Reset form
    setCustomerName('');
    setAddress('');
    setMobileNumber('');
    setNumberOfBirds('');
    setWeight('');
    setPricePerUnit('');

    // Print receipt
    await printReceipt(sale);
  };

  const printReceipt = async (sale: any) => {
    // TODO: Implement thermal printer integration
    console.log('Printing receipt:', sale);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">New Sale</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <Input
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

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
            max={type === 'Broiler' ? stock.broiler.birds : stock.layer.birds}
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
              max={stock.broiler.weight}
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
          Complete Sale & Print Receipt
        </Button>
      </form>

      {/* Sales History */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-700">Sales History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Birds
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Sales history rows will be rendered here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};