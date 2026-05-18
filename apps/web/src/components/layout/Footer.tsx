import Image from 'next/image'
import Link from 'next/link'

const columns = [
  {
    heading: 'Sklep',
    links: [
      { href: '/shop', label: 'Wszystkie produkty' },
      { href: '/shop?category=wiatraki', label: 'Wiatraki' },
      { href: '/shop?category=donice', label: 'Donice' },
      { href: '/shop?category=studnie', label: 'Studnie' },
      { href: '/shop?category=spinnery', label: 'Spinnery wiatrowe' },
    ],
  },
  {
    heading: 'Pomoc',
    links: [
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Kontakt' },
      { href: '/shipping', label: 'Dostawa' },
      { href: '/returns', label: 'Zwroty' },
    ],
  },
  {
    heading: 'Firma',
    links: [
      { href: '/about', label: 'O nas' },
      { href: '/blog', label: 'Blog' },
      { href: '/privacy', label: 'Polityka prywatności' },
      { href: '/terms', label: 'Regulamin' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[rgb(var(--gs-leaf-deep))] text-[rgb(var(--gs-cream))] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-4">
          <Image
            src="/logo.svg"
            alt="Garden Smile"
            width={156}
            height={52}
            className="brightness-0 invert"
          />
          <p className="text-sm text-[rgb(var(--gs-cream)/0.75)] max-w-xs leading-relaxed">
            Solidne wyroby z drewna i metalu, by Twój ogród uśmiechał się przez cały rok.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h4 className="font-serif text-lg mb-4 text-[rgb(var(--gs-cream))]">{col.heading}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[rgb(var(--gs-cream)/0.7)] hover:text-[rgb(var(--gs-leaf-light))] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[rgb(var(--gs-cream)/0.12)]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs">
          <span className="text-[rgb(var(--gs-cream)/0.55)]">
            © {new Date().getFullYear()} Garden Smile. Wszystkie prawa zastrzeżone.
          </span>
          <span className="uppercase tracking-widest text-[rgb(var(--gs-cream)/0.45)]">
            Forged by{' '}
            <a
              href="https://cyberdemigods.com"
              target="_blank"
              rel="noopener"
              className="hover:text-[rgb(var(--gs-leaf-light))] transition-colors"
            >
              CyberDemigods
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
