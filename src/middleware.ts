import { NextRequest, NextResponse } from "next/server";
import { obterSessaoSeValida } from "./app/lib/session";

//regex retirada diretamente da documentação do NextJS
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

const publicRoutes = [
    '/',
    '/login',
    '/create',
]

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const sessao = await obterSessaoSeValida();

    if (publicRoutes.includes(pathname) && sessao) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    if (!sessao && !publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
}
