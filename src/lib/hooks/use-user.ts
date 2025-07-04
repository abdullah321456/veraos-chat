'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserData, PasswordUpdateData, UserProfileUpdateRequest } from '../../types/user';
import { getUserData, updateUserProfile, updateUserPassword } from '../../services/userService';
import { toast } from 'sonner';

export const useUser = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState(false);

    // Get auth token from localStorage or cookies
    const getAuthToken = (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('authToken') || 
                   localStorage.getItem('token') || 
                   document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null;
        }
        return null;
    };

    // Fetch user data
    const fetchUserData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const token = getAuthToken();
            if (!token) {
                throw new Error('No authentication token found');
            }

            const data = await getUserData(token);
            console.log('Fetched user data:', data);
            
            // Transform the API response to match our UserData interface
            const transformedData: UserData = {
                _id: data._id,
                firstName: data.firstName || '',
                middleName: data.middleName || '',
                lastName: data.lastName || '',
                phoneNumber: data.phoneNumber || '',
                email: data.email || '',
                confirmEmail: data.confirmEmail || data.email || '',
                isAdmin: data.isAdmin || false,
                role: data.role || '',
                organization: data.organization,
                organizationName: data.organizationName || '',
                organizationType: data.organizationType || '',
                organizationWebsite: data.organizationWebsite || '',
                address: data.address || '',
                addressLine2: data.addressLine2 || '',
                city: data.city || '',
                state: data.state || '',
                postalCode: data.postalCode || '',
                country: data.country || '',
                jobTitle: data.jobTitle || '',
                jobId: data.jobId || '',
                intendedUse: data.intendedUse || '',
                dataAccessNeeds: data.dataAccessNeeds || [],
                documents: data.documents || [],
                createdAt: data.createdAt || '',
                updatedAt: data.updatedAt || '',
                __v: data.__v || 0,
                status: data.status || '',
                force_update_password: data.force_update_password || false,
            };
            
            setUserData(transformedData);
        } catch (err: any) {
            console.error('Error fetching user data:', err);
            setError(err.message || 'Failed to fetch user data');
            toast.error('Failed to load user data');
        } finally {
            setLoading(false);
        }
    }, []);

    // Update user profile
    const updateProfile = useCallback(async (updateData: UserProfileUpdateRequest): Promise<boolean> => {
        try {
            setUpdating(true);
            
            const token = getAuthToken();
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await updateUserProfile(token, updateData);
            console.log('Profile update response:', response);
            
            // Refresh user data after successful update
            await fetchUserData();
            
            toast.success('Profile updated successfully');
            return true;
        } catch (err: any) {
            console.error('Error updating profile:', err);
            toast.error(err.message || 'Failed to update profile');
            return false;
        } finally {
            setUpdating(false);
        }
    }, [fetchUserData]);

    // Update user password
    const updatePassword = useCallback(async (passwordData: PasswordUpdateData): Promise<boolean> => {
        try {
            setUpdating(true);
            
            const token = getAuthToken();
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await updateUserPassword(token, passwordData);
            console.log('Password update response:', response);
            
            toast.success('Password updated successfully');
            return true;
        } catch (err: any) {
            console.error('Error updating password:', err);
            toast.error(err.message || 'Failed to update password');
            return false;
        } finally {
            setUpdating(false);
        }
    }, []);

    // Load user data on mount
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return {
        userData,
        loading,
        error,
        updating,
        fetchUserData,
        updateProfile,
        updatePassword,
    };
}; 