'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage on client side (user preference has priority)
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('darkMode');
        
        // Handle different formats: string 'true'/'false', JSON boolean, or null
        let isDark = false;
        if (saved !== null && saved !== undefined) {
          // User has a saved preference - use it (priority 1)
          try {
            const parsed = JSON.parse(saved);
            isDark = parsed === true;
          } catch {
            // If not JSON, check as string (case-insensitive)
            isDark = saved === 'true' || saved.toLowerCase().trim() === 'true';
          }
        } else {
          // No saved preference - check system preference (priority 2)
          // Don't save system preference to localStorage - only save when user manually toggles
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          isDark = prefersDark;
        }
        
        // Debug log to help diagnose issues
        console.log('DarkModeProvider - Reading:', { saved, isDark, hasUserPreference: saved !== null && saved !== undefined });
        
        // Immediately set document class on initialization
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        return isDark;
      } catch (error) {
        console.error('Error reading darkMode from localStorage:', error);
        // Fallback to system preference if localStorage fails
        try {
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          return prefersDark;
        } catch {
          return false;
        }
      }
    }
    return false;
  });

  // Initialize document class on mount and listen to system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Set initial document class based on current state
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Listen to system preference changes (only if user hasn't manually set a preference)
      const saved = localStorage.getItem('darkMode');
      const hasUserPreference = saved !== null && saved !== undefined;

      if (!hasUserPreference && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleSystemPreferenceChange = (e: MediaQueryListEvent | MediaQueryList) => {
          // Only update if user hasn't set a manual preference
          const currentSaved = localStorage.getItem('darkMode');
          if (currentSaved !== null && currentSaved !== undefined) {
            // User has set a preference, stop listening to system changes
            return;
          }
          
          const matches = 'matches' in e ? e.matches : (e as MediaQueryList).matches;
          const newDarkMode = matches;
          setIsDarkMode(newDarkMode);
          // Don't save system preference to localStorage - only save when user manually toggles
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        };

        // Modern browsers
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', handleSystemPreferenceChange);
          return () => {
            mediaQuery.removeEventListener('change', handleSystemPreferenceChange);
          };
        } 
        // Fallback for older browsers
        else if (mediaQuery.addListener) {
          mediaQuery.addListener(handleSystemPreferenceChange);
          return () => {
            mediaQuery.removeListener(handleSystemPreferenceChange);
          };
        }
      }
    } catch (error) {
      console.error('Error setting initial dark mode class:', error);
    }
  }, []); // Run only on mount

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Save to localStorage whenever dark mode changes
      localStorage.setItem('darkMode', String(isDarkMode));
      
      // Update document class for dark mode styling
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error saving darkMode to localStorage:', error);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      // Immediately save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('darkMode', String(newValue));
          // Update document class immediately
          if (newValue) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (error) {
          console.error('Error saving darkMode to localStorage:', error);
        }
      }
      return newValue;
    });
  };

  const setDarkMode = (value: boolean) => {
    setIsDarkMode(value);
    // Immediately save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('darkMode', String(value));
        // Update document class immediately
        if (value) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.error('Error saving darkMode to localStorage:', error);
      }
    }
  };

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        setDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    // Return default values if not in provider (for pages outside ai-search-layout)
    return {
      isDarkMode: false,
      toggleDarkMode: () => {},
      setDarkMode: () => {},
    };
  }
  return context;
}

