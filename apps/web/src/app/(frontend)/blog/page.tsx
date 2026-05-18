import { getPayloadClient } from '@/lib/payload'
import { getBlogPosts } from '@/lib/blog'
import { BlogPostCard } from '@/components/blog/BlogPostCard'

export const metadata = {
  title: 'Blog',
  description: 'Pomysły do ogrodu, poradniki pielęgnacji i historie z warsztatu.',
}

export default async function BlogPage() {
  const payload = await getPayloadClient()
  const { items, total } = await getBlogPosts(payload, { limit: 24 })

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl mb-3">Z warsztatu</h1>
        <p className="text-[rgb(var(--gs-stone))] max-w-2xl mx-auto">
          Pomysły do ogrodu, poradniki pielęgnacji i historie ludzi, którzy tworzą rzeczy na powietrze.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-center py-20 text-[rgb(var(--gs-stone))]">
          Brak wpisów. Wróć za chwilę.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((post, i) => (
              <BlogPostCard key={post.slug} post={post} featured={i === 0 && total > 1} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
