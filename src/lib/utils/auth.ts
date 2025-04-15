'use client';

import { ROUTES } from '@/config/routes';
import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';

export const authUtils = {
    // Save token to cookies
    setToken: (token: string) => {
        Cookies.set(TOKEN_KEY, token, {
            expires: 1, // 1 day
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            path: '/',
        });
    },

    // Get token from cookies
    getToken: () => {
        return Cookies.get(TOKEN_KEY) || null;
    },

    // Remove token from cookies
    removeToken: () => {
        Cookies.remove(TOKEN_KEY, { path: '/' });
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!Cookies.get(TOKEN_KEY);
    },

    // Handle unauthorized access
    handleUnauthorized: () => {
        Cookies.remove(TOKEN_KEY, { path: '/' });
        window.location.href = ROUTES.AUTH.LOGIN;
    },

    // Logout user
    logout: () => {
        Cookies.remove(TOKEN_KEY, { path: '/' });
        window.location.href = ROUTES.AUTH.LOGIN;
    },
};
