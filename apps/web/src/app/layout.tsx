import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter, Fraunces } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
})
const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

export const metadata: Metadata = {
  title: {
    default: 'Garden Smile — ozdoby ogrodowe z duszą',
    template: '%s | Garden Smile',
  },
  description:
    'Karmniki, donice, wiatraki i pergole. Solidne wyroby z drewna i metalu, by Twój ogród uśmiechał się przez cały rok.',
  openGraph: {
    type: 'website',
    siteName: 'Garden Smile',
    locale: 'pl_PL',
  },
}

// Conditional document shell: Payload's `RootLayout` (in (payload)/layout.tsx)
// renders its own <html><body> for the admin panel, so we must not wrap admin
// routes — that would produce nested-html hydration errors. The storefront
// owns the document at the root layout level.
//
// `x-pathname` is set by middleware.ts (Next does not expose pathname to
// server layouts directly).
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers()
  const pathname = h.get('x-pathname') ?? ''

  if (pathname.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <html lang="pl" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  )
}
