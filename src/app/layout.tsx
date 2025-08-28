import cn from '@/lib/utils/cn';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Toaster} from 'sonner';
import GoogleAnalytics from '@/components/google-analytics';
import PageTracker from '@/components/page-tracker';
import UserTracker from '@/components/user-tracker';
import './globals.css';

export const metadata: Metadata = {
    title: 'Veraos | AI Search',
    description: 'Veraos | AI Search',
    icons: {
        icon: '/logo.png',
    },
};

const inter = Inter({subsets: ['latin']});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={cn(inter.className, 'antialiased')}>
        <GoogleAnalytics />
        <PageTracker />
        <UserTracker />
        {children}
        <Toaster
            richColors
            position="top-center"
            gap={8}
            toastOptions={{
                className: '',
                duration: 5000,
            }}
        />
        </body>
        </html>
    );
}
