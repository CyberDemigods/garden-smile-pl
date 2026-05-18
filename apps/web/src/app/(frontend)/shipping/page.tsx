import { getPayloadClient } from '@/lib/payload'
import { getPageBySlug } from '@/lib/cms'
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer'

export const metadata = { title: 'Dostawa' }

export default async function ShippingPage() {
  const payload = await getPayloadClient()
  const page = await getPageBySlug(payload, 'shipping')
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <CmsPageRenderer
        page={page}
        fallback="Informacje o dostawie są w przygotowaniu. Wpisz treść w admin → Pages → shipping."
      />
    </section>
  )
}
