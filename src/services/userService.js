import { apiService } from './apiService';
import axios from '../config/axios';

// User service functions
export const userService = {
    // Get current user profile using /users endpoint with token
    getCurrentUser: async () => {
        try {
            const response = await apiService.getData('/users');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user profile
    updateProfile: async (userData) => {
        try {
            const response = await apiService.updateData('/users', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user password
    updatePassword: async (passwordData) => {
        try {
            const response = await apiService.updateData('/users/password', passwordData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all users for organization
    getAllUsers: async () => {
        try {
            const response = await apiService.getData('/users/all');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Add new user to organization
    addUser: async (userData) => {
        try {
            const response = await apiService.postData('/users/organization/add-user', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user in organization
    updateUser: async (userId, userData) => {
        try {
            const response = await apiService.updateData(`/users/organization/update-user/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete user from organization
    deleteUser: async (userId) => {
        try {
            const response = await apiService.deleteData(`users/organization/delete-user/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get specific user by ID
    getUserById: async (userId) => {
        try {
            const response = await apiService.getData(`/users/organization/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Force logout from all devices
    forceLogoutAllDevices: async () => {
        try {
            const response = await apiService.postData('/users/force-logout', {});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

// Get user data from /users endpoint
export const getUserData = async (token) => {
    try {
        const response = await axios.get('/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('User data response:', response.data);
        
        // Return the user data directly from the response
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

// Update user profile
export const updateUserProfile = async (token, updateData) => {
    try {
        const response = await axios.put('/users/me', updateData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Profile update response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

// Update user password
export const updateUserPassword = async (token, passwordData) => {
    try {
        const response = await axios.put('/users/password', passwordData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Password update response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
}; 