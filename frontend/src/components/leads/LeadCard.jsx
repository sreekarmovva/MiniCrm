import React from 'react';

const LeadCard = ({ lead, onEdit, onDelete }) => {
  const statusColors = {
    NEW: 'bg-blue-100 text-blue-800',
    CONTACTED: 'bg-yellow-100 text-yellow-800',
    CONVERTED: 'bg-green-100 text-green-800',
    LOST: 'bg-red-100 text-red-800',
  };

  const statusIcons = {
    NEW: '🆕',
    CONTACTED: '📞',
    CONVERTED: '✅',
    LOST: '❌',
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{lead.title}</h3>
          <p className="text-sm text-gray-600">{lead.description || 'No description'}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(lead)}
            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(lead)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${statusColors[lead.status]}`}>
          <span>{statusIcons[lead.status]}</span>
          <span>{lead.status}</span>
        </span>
        {lead.value && (
          <span className="text-lg font-bold text-gray-900">
            ${lead.value.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default LeadCard;
