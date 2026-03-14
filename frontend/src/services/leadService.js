import api from './api';

export const leadService = {
  getAllLeads: async () => {
    const response = await api.get('/leads');
    return response.data;
  },

  getLeadsByCustomer: async (customerId) => {
    const response = await api.get(`/leads/customer/${customerId}`);
    return response.data;
  },

  getLeadById: async (id) => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },

  createLead: async (customerId, data) => {
    const response = await api.post(`/leads/customer/${customerId}`, data);
    return response.data;
  },

  updateLead: async (id, data) => {
    const response = await api.put(`/leads/${id}`, data);
    return response.data;
  },

  deleteLead: async (id) => {
    await api.delete(`/leads/${id}`);
  },
};
