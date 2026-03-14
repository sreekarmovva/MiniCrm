import React from 'react';

const Stats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Customers',
      value: stats.totalCustomers || 0,
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Total Leads',
      value: stats.totalLeads || 0,
      icon: '📊',
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Converted',
      value: stats.convertedLeads || 0,
      icon: '✅',
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Total Value',
      value: `$${(stats.totalValue || 0).toLocaleString()}`,
      icon: '💰',
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <div key={index} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{item.value}</p>
            </div>
            <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
