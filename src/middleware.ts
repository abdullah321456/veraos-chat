import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/config/routes.ts'; // adjust path to your file

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    // Public routes
    const publicPaths = [
        ROUTES.AUTH.LOGIN,
        ROUTES.AUTH.SIGNUP,
        ROUTES.AUTH.FORGOT_PASSWORD,
        ROUTES.AUTH.JOIN_WITH_INVITE_CODE,
        ROUTES.HOME,
        ROUTES.FAQ.INDEX,
        ROUTES.FAQ.HELP_CENTER,
        ROUTES.FAQ.TERMS_OF_USE,
    ];

    const path = request.nextUrl.pathname;

    // Skip middleware for static files and API routes
    if (
        path.startsWith('/_next') || // Next.js static files
        path.startsWith('/api') || // API routes
        path.startsWith('/static') || // Static files
        path.includes('.') // Files with extensions (e.g., .png, .jpg)
    ) {
        return NextResponse.next();
    }

    const isPublic = publicPaths.some((publicPath) => path === publicPath);
    const isProtected = !isPublic;

    if (isProtected && !token) {
        return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except those that start with /_next, /api, /static, or contain a file extension
        '/((?!_next/static|_next/image|favicon.ico|api|static|.*\\..*).*)',
    ],
};
