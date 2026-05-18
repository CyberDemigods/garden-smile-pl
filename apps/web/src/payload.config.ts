import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { assembleShop } from '@demicommerce/core'
import { mediaModule } from '@demicommerce/module-media'
import { usersModule } from '@demicommerce/module-users'
import { productsModule } from '@demicommerce/module-products'
import { shopSettingsModule } from '@demicommerce/module-shop-settings'
import { ordersModule } from '@demicommerce/module-orders'
import { cartModule } from '@demicommerce/module-cart'
import { wishlistModule } from '@demicommerce/module-wishlist'
import { checkoutModule } from '@demicommerce/module-checkout'
import { paymentsModule, hotpayProvider } from '@demicommerce/module-payments'
import { cmsModule } from '@demicommerce/module-cms'
import { faqModule } from '@demicommerce/module-faq'
import { blogModule } from '@demicommerce/module-blog'
import { themesModule } from '@demicommerce/module-themes'
import { seasonsModule } from '@demicommerce/module-seasons'
import { analyticsModule } from '@demicommerce/module-analytics'
import { receiptsModule } from '@demicommerce/module-receipts'
import { marketingModule } from '@demicommerce/module-marketing'
import { reviewsModule } from '@demicommerce/module-reviews'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' | Garden Smile PL' },
  },
  collections: [],
  globals: [],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    push: true,
  }),
  sharp,
  plugins: [
    assembleShop({
      modules: [
        // --- Core ---
        mediaModule(),
        usersModule({
          // Storefront has no signup/login. Admins are created manually for the panel.
          roles: [{ label: 'Admin', value: 'admin' }],
          defaultRole: 'admin',
        }),

        // --- Catalog ---
        productsModule({ enablePriceHistory: true, enableDimensions: true }),

        // --- Shop config: PL non-VAT (działalność nierejestrowana) ---
        shopSettingsModule({
          defaultCurrency: 'PLN',
          currencies: [{ label: 'PLN (zł)', value: 'PLN' }],
        }),
        ordersModule({
          // No customer accounts yet — every order is a guest order.
          onCreated: [
            async (data) => {
              console.log(`[garden-smile-pl] Nowe zamowienie: ${data.orderNumber}`)
            },
          ],
        }),
        cartModule(),
        wishlistModule(),

        // --- Payments: HotPay only (działalność nierejestrowana = przelewy) ---
        paymentsModule({
          providers: [
            hotpayProvider({
              secret: process.env.HOTPAY_SECRET ?? '',
              notificationPassword: process.env.HOTPAY_NOTIFICATION_PASSWORD ?? '',
            }),
          ],
        }),
        checkoutModule(),

        // --- Content ---
        cmsModule(),
        faqModule(),
        blogModule(),

        // --- Theming + seasonal collections (Wiosna/Lato/Jesien/Zima) ---
        themesModule(),
        seasonsModule(),

        // --- Analytics: monitor monthly turnover vs nierejestrowana threshold ---
        // 75% płacy minimalnej / mies. for 2026 ~ 3225 zł — alert close to it.
        analyticsModule({
          taxThresholds: [
            { label: 'Limit działalności nierejestrowanej (mies.)', limit: 3225 },
          ],
        }),

        // --- Receipts: PL paragony auto-issued on paid orders ---
        receiptsModule({ defaultTemplate: 'pl-paragon' }),

        // --- Marketing tracking (GTM/GA4/Google Ads/Meta Pixel) ---
        marketingModule(),

        // --- Opinie klientów (manual import z Allegro/eBay + native) ---
        reviewsModule({ defaultStatus: 'approved', allowGuestReviews: true }),
      ],
    }),
  ],
})
