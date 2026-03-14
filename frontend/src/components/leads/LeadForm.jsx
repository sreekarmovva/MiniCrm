import React, { useState, useEffect } from 'react';

const LeadForm = ({ lead, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'NEW',
    value: '',
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        title: lead.title || '',
        description: lead.description || '',
        status: lead.status || 'NEW',
        value: lead.value || '',
      });
    }
  }, [lead]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      value: formData.value ? parseFloat(formData.value) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
        <input
          type="text"
          required
          className="input-field"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          className="input-field"
          rows="3"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
        <select
          className="input-field"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CONVERTED">Converted</option>
          <option value="LOST">Lost</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Value ($)</label>
        <input
          type="number"
          step="0.01"
          className="input-field"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button type="submit" className="flex-1 btn-primary">
          {lead ? 'Update Lead' : 'Add Lead'}
        </button>
        <button type="button" onClick={onCancel} className="flex-1 btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
