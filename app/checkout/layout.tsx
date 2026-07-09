import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout - FluencyPro',
  description: 'Finalize sua compra e comece sua jornada de aprendizado de inglês.',
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
