import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google' 
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'] 
})

export const metadata: Metadata = {
  title: 'Artify - Style Transfer', 
  description: 'Paint yourself in the style of any painting, right in the browser.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 4. Apply the new font, make text crisp (antialiased), and enforce your new theme variables */}
      <body className={`${dmSans.className} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}