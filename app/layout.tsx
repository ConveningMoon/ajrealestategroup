import type { Metadata } from 'next'
import { montserrat, ebGaramond, dmSerif } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://lm.ajrealestateva.com'),
  title:        'A&J Real Estate Group',
  description:  'Recursos para compradores y vendedores hispanos en Hampton Roads.',
  robots:       { index: true, follow: true },
  icons:        { icon: '/Favicon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${ebGaramond.variable} ${dmSerif.variable}`}>
      <body className="font-body bg-base text-navy antialiased">
        {children}
      </body>
    </html>
  )
}
