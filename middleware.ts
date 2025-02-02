import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('token')?.value
	const { pathname } = req.nextUrl

	if (!token && pathname !== '/auth') {
		return NextResponse.redirect(new URL('/auth', req.url))
	}

	if (token && pathname === '/auth') {
		return NextResponse.redirect(new URL('/dashboard', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth', '/dashboard/:path*', '/profile', '/create_test', '/test/:id']
}
