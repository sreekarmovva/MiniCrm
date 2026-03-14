import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerCard = ({ customer, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="card hover:shadow-lg cursor-pointer" onClick={() => navigate(`/customers/${customer.id}`)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{customer.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
              <p className="text-sm text-gray-600">{customer.email}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEdit(customer)}
            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(customer)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Company</p>
            <p className="text-sm font-medium text-gray-900">{customer.company || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Phone</p>
            <p className="text-sm font-medium text-gray-900">{customer.phone || 'N/A'}</p>
          </div>
        </div>
        <div className="mt-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            {customer.leadCount} {customer.leadCount === 1 ? 'Lead' : 'Leads'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
