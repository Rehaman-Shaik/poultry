import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Bird } from 'lucide-react';

export const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  // Store user data to localStorage when currentUser is updated
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // API call to authenticate user
    try {
      const response = await fetch(`https://poultry.rehamanshaikofficial.xyz/api/user/find`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      });

      const result = await response.json();
      if (result.user) {
        setCurrentUser({
          id: result.user.id,
          name: result.user.name,
          role: 'admin', // Adjust based on the response from your API
        });
      } else {
        console.log("User not found.");
      }
    } catch (error) {
      console.log(error);
    }

    // Demo login logic for testing purposes
    if (name === 'admin' && password === 'admin') {
      setCurrentUser({
        id: '1',
        name: 'Admin User',
        role: 'admin',
      });
    } else if (name === 'driver' && password === 'driver') {
      setCurrentUser({
        id: '2',
        name: 'Driver User',
        role: 'driver',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Bird className="h-12 w-12 text-blue-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-900">Poultry Manager</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo Credentials:</p>
          <p>Admin: admin / admin</p>
          <p>Driver: driver / driver</p>
        </div>
      </div>
    </div>
  );
};
