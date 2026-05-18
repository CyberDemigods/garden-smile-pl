import { getPayloadClient } from '@/lib/payload'
import { getPageBySlug } from '@/lib/cms'
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer'

export const metadata = { title: 'Regulamin' }

export default async function TermsPage() {
  const payload = await getPayloadClient()
  const page = await getPageBySlug(payload, 'terms')
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <CmsPageRenderer
        page={page}
        fallback="Regulamin jest w przygotowaniu. Wpisz treść w admin → Pages → terms."
      />
    </section>
  )
}
