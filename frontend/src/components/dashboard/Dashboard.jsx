import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../layout/Navbar';
import Stats from './Stats';
import { customerService } from '../../services/customerService';
import { leadService } from '../../services/leadService';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [leadsByStatus, setLeadsByStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [customersData, leadsData] = await Promise.all([
        customerService.getCustomers(0, 5),
        leadService.getAllLeads(),
      ]);

      setRecentCustomers(customersData.content || []);

      const statusCount = {};
      let totalValue = 0;
      let convertedCount = 0;

      leadsData.forEach((lead) => {
        statusCount[lead.status] = (statusCount[lead.status] || 0) + 1;
        if (lead.value) totalValue += lead.value;
        if (lead.status === 'CONVERTED') convertedCount++;
      });

      const statusData = Object.keys(statusCount).map((status) => ({
        name: status,
        value: statusCount[status],
      }));

      setLeadsByStatus(statusData);
      setStats({
        totalCustomers: customersData.totalElements || 0,
        totalLeads: leadsData.length,
        convertedLeads: convertedCount,
        totalValue: totalValue,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your CRM.</p>
          </div>

          <Stats stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Leads by Status</h2>
              {leadsByStatus.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadsByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leadsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-12">No leads data available</p>
              )}
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Customers</h2>
                <Link to="/customers" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View all →
                </Link>
              </div>
              {recentCustomers.length > 0 ? (
                <div className="space-y-4">
                  {recentCustomers.map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div>
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">{customer.company || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{customer.leadCount} leads</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-12">No customers yet</p>
              )}
            </div>
          </div>

          <div className="mt-6 card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/customers?action=add"
                className="flex items-center justify-center p-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">➕</div>
                  <p className="font-semibold">Add Customer</p>
                </div>
              </Link>
              <Link
                to="/customers"
                className="flex items-center justify-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <p className="font-semibold">View Customers</p>
                </div>
              </Link>
              <div className="flex items-center justify-center p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white">
                <div className="text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <p className="font-semibold">Total Leads: {stats.totalLeads}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
