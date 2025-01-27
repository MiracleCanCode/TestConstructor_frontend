import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	const token = req.cookies.get('token')
	if (token && (req.nextUrl.pathname === '/auth' || req.nextUrl.pathname === '/registration')) {
		return NextResponse.redirect(new URL('/dashboard', req.url))
	}

	if (!token && req.nextUrl.pathname !== '/auth' && req.nextUrl.pathname !== '/registration') {
		return NextResponse.redirect(new URL('/auth', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/test/:id', '/dashboard', '/user/:login', '/create_test', '/auth', '/registration']
}
