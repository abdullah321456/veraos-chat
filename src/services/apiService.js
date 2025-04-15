import axiosInstance from '../config/axios';

// API service functions
export const apiService = {
    // GET request example
    getData: async (endpoint) => {
        try {
            const response = await axiosInstance.get(endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // POST request example
    postData: async (endpoint, data) => {
        try {
            const response = await axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // POST request with multipart form data
    postMultipartData: async (endpoint, formData) => {
        try {
            const response = await axiosInstance.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // PUT request example
    updateData: async (endpoint, data) => {
        try {
            const response = await axiosInstance.put(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // DELETE request example
    deleteData: async (endpoint) => {
        try {
            const response = await axiosInstance.delete(endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 