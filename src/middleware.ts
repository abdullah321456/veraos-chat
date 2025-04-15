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
    ];

    const path = request.nextUrl.pathname;

    const isPublic = publicPaths.some((publicPath) => path === publicPath);
    const isProtected = !isPublic;

    if (isProtected && !token) {
        return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match everything except static files and API
        '/((?!_next/static|_next/image|favicon.ico|api).*)',
    ],
};
