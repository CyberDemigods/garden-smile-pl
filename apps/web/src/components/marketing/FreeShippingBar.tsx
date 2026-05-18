'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@demicommerce/module-cart/use-cart'

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount)

export function FreeShippingBar({ threshold }: { threshold: number }) {
  const { totalAmount } = useCart()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  // Pre-hydration: show the static "free shipping over £X" message so it ships
  // in the SSR HTML and avoids layout flicker.
  const remaining = Math.max(0, threshold - totalAmount)
  const unlocked = hydrated && totalAmount >= threshold

  let message: string
  if (!hydrated || totalAmount === 0) {
    message = `Darmowa dostawa od ${formatPrice(threshold)}`
  } else if (unlocked) {
    message = `🎉 Masz darmową dostawę!`
  } else {
    message = `Darmowa dostawa od ${formatPrice(threshold)} — zostało ${formatPrice(remaining)}!`
  }

  return (
    <div
      className={`text-center text-xs font-medium px-4 py-2 ${
        unlocked
          ? 'bg-[rgb(var(--gs-leaf))] text-white'
          : 'bg-[rgb(var(--gs-leaf-deep))] text-[rgb(var(--gs-cream))]'
      }`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  )
}
