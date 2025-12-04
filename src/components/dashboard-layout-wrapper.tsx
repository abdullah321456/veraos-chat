'use client';

import { useDarkMode } from '@/lib/contexts/dark-mode-context';
import { ReactNode, useState, useEffect } from 'react';

export function DashboardLayoutWrapper({ children }: { children: ReactNode }) {
  const { isDarkMode } = useDarkMode();
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsSmallDevice(window.innerWidth < 640);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const backgroundStyle = isDarkMode 
    ? isSmallDevice
      ? { background: '#0F141E', height: '100vh', overflow: 'hidden' }
      : { backgroundColor: '#0F141E', height: '100vh', overflow: 'hidden' }
    : { background: '#F6F6F9', height: '100vh', overflow: 'hidden' };


  console.log("DashboardLayoutWrapper = ",isDarkMode)

  return (
    <div className="pt-20" style={backgroundStyle}>
      {children}
    </div>
  );
}

