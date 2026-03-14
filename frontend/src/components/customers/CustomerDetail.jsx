import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import LeadCard from '../leads/LeadCard';
import LeadForm from '../leads/LeadForm';
import Modal from '../common/Modal';
import { customerService } from '../../services/customerService';
import { leadService } from '../../services/leadService';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    loadCustomerData();
  }, [id]);

  const loadCustomerData = async () => {
    try {
      setLoading(true);
      const [customerData, leadsData] = await Promise.all([
        customerService.getCustomerById(id),
        leadService.getLeadsByCustomer(id),
      ]);
      setCustomer(customerData);
      setLeads(leadsData);
    } catch (error) {
      console.error('Failed to load customer data:', error);
      navigate('/customers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = async (formData) => {
    try {
      await leadService.createLead(id, formData);
      setShowModal(false);
      loadCustomerData();
    } catch (error) {
      console.error('Failed to add lead:', error);
    }
  };

  const handleEditLead = async (formData) => {
    try {
      await leadService.updateLead(editingLead.id, formData);
      setShowModal(false);
      setEditingLead(null);
      loadCustomerData();
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  const handleDeleteLead = async (lead) => {
    if (window.confirm(`Are you sure you want to delete "${lead.title}"?`)) {
      try {
        await leadService.deleteLead(lead.id);
        loadCustomerData();
      } catch (error) {
        console.error('Failed to delete lead:', error);
      }
    }
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingLead(null);
  };

  const filteredLeads = filterStatus === 'ALL'
    ? leads
    : leads.filter(lead => lead.status === filterStatus);

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
          <button
            onClick={() => navigate('/customers')}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Customers
          </button>

          <div className="card mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">{customer.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
                  <p className="text-gray-600 mt-1">{customer.email}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500 mb-1">Company</p>
                <p className="text-lg font-semibold text-gray-900">{customer.company || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="text-lg font-semibold text-gray-900">{customer.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Leads</p>
                <p className="text-lg font-semibold text-gray-900">{leads.length}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Leads</h2>
              <p className="text-gray-600 mt-1">Opportunities for {customer.name}</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <span>Add Lead</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="mb-6 flex space-x-2">
            {['ALL', 'NEW', 'CONTACTED', 'CONVERTED', 'LOST'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === status
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {filteredLeads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onEdit={openEditModal}
                  onDelete={handleDeleteLead}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 card">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-500 text-lg">No leads found</p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 btn-primary"
              >
                Add Your First Lead
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingLead ? 'Edit Lead' : 'Add New Lead'}
      >
        <LeadForm
          lead={editingLead}
          onSubmit={editingLead ? handleEditLead : handleAddLead}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};

export default CustomerDetail;
