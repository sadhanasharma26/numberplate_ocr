'use client'

import { Car } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-soft-violet rounded-xl">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-gray">
                Number Plate OCR
              </h1>
              <p className="text-sm text-gray-600">
                AI-Powered License Plate Recognition
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-dark-gray hover:text-soft-violet transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-dark-gray hover:text-soft-violet transition-colors">
              How it Works
            </a>
            <a href="#about" className="text-dark-gray hover:text-soft-violet transition-colors">
              About
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
