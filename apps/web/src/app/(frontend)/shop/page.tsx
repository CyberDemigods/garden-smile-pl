import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { getCategories, getProducts } from '@/lib/queries'
import { ProductCard } from '@/components/shop/ProductCard'

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>
}

export const metadata = {
  title: 'Sklep',
  description:
    'Przeglądaj pełną kolekcję Garden Smile — wiatraki, donice, studnie i nie tylko.',
}

const productLabel = (n: number) => {
  if (n === 1) return 'produkt'
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'produkty'
  return 'produktów'
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams
  const payload = await getPayloadClient()
  const [categories, products] = await Promise.all([
    getCategories(payload),
    getProducts(payload, { categorySlug: category }),
  ])

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="font-serif text-4xl sm:text-5xl text-[rgb(var(--gs-leaf-deep))] mb-3">
          {category
            ? categories.find((c) => c.slug === category)?.name ?? 'Sklep'
            : 'Wszystko do ogrodu'}
        </h1>
        <p className="text-[rgb(var(--gs-stone))] max-w-2xl">
          {products.total} {productLabel(products.total)}. Solidne wyroby z drewna i metalu,
          wykonane z myślą o każdej porze roku.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2 mb-10" aria-label="Filtruj według kategorii">
        <Link
          href="/shop"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !category
              ? 'bg-[rgb(var(--gs-leaf))] text-white'
              : 'bg-white/70 text-[rgb(var(--gs-stone))] hover:bg-[rgb(var(--gs-leaf-light)/0.18)]'
          }`}
        >
          Wszystko
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop?category=${cat.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat.slug
                ? 'bg-[rgb(var(--gs-leaf))] text-white'
                : 'bg-white/70 text-[rgb(var(--gs-stone))] hover:bg-[rgb(var(--gs-leaf-light)/0.18)]'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </nav>

      {products.items.length === 0 ? (
        <p className="text-center py-20 text-[rgb(var(--gs-stone))]">
          Brak produktów w tej kategorii.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}
