import { getPayloadClient } from '@/lib/payload'
import { getPageBySlug } from '@/lib/cms'
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer'

export const metadata = { title: 'Kontakt' }

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const page = await getPageBySlug(payload, 'contact')
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <CmsPageRenderer
        page={page}
        fallback="Strona Kontakt jest w przygotowaniu. Wpisz treść w admin → Pages → contact."
      />
    </section>
  )
}
