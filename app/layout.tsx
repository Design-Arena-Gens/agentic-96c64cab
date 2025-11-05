import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '9kg IWF Washing Machine Price Finder',
  description: 'Find the cheapest 9kg Inverter Fully Automatic washing machines in India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
