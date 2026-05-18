import { getPayloadClient } from '@/lib/payload'
import { getPageBySlug } from '@/lib/cms'
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer'

export const metadata = { title: 'Polityka prywatności' }

export default async function PrivacyPage() {
  const payload = await getPayloadClient()
  const page = await getPageBySlug(payload, 'privacy')
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <CmsPageRenderer
        page={page}
        fallback="Polityka prywatności jest w przygotowaniu. Wpisz treść w admin → Pages → privacy."
      />
    </section>
  )
}
