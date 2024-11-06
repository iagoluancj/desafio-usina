import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(req: NextRequest) { // Middleware para validação geral das rotas, em especial da /auth/
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    const response = await fetch(`http://localhost:3001/validar-token?token=${token}`);
    const data = await response.json();

    if (data.error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/auth/:path*',
};
