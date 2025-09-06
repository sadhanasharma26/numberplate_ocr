import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Number Plate OCR - AI-Powered License Plate Recognition',
  description: 'Upload an image of a vehicle number plate and extract text instantly using advanced OCR technology.',
  keywords: 'OCR, number plate, license plate, text recognition, AI, computer vision',
  authors: [{ name: 'Number Plate OCR Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="ibm-plex-sans antialiased">
        {children}
      </body>
    </html>
  )
}
