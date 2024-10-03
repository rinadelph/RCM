import React, { useState, useEffect } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  contactCount: number;
  lastOpened: string | null;
}

const CustomerList: React.FC = () => {
  console.log('Rendering CustomerList');

  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    console.log('CustomerList mounted');
    // Fetch customers from API here
    return () => console.log('CustomerList unmounted');
  }, []);

  const importCustomers = () => {
    console.log('Importing customers');
    // Implement customer import logic
  };

  const exportCustomers = () => {
    console.log('Exporting customers');
    // Implement customer export logic
  };

  console.log('Current customers:', customers);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Customer List</h2>
      <div className="mb-2">
        <button onClick={importCustomers} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Import</button>
        <button onClick={exportCustomers} className="bg-green-500 text-white px-2 py-1 rounded">Export</button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Count</th>
            <th>Last Opened</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.contactCount}</td>
              <td>{customer.lastOpened || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;