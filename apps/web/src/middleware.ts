import { NextResponse, type NextRequest } from 'next/server'

// Forward the request pathname to server components via a request header.
// Used by app/layout.tsx to decide whether to render its own <html><body>
// (storefront) or pass children straight through (admin renders its own).
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-pathname', request.nextUrl.pathname)
  return NextResponse.next({ request: { headers } })
}

export const config = {
  // Skip Next internals; everything else flows through (incl. /admin and /api).
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
