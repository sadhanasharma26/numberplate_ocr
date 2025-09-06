'use client'

import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'
import OCRResult from '@/components/OCRResult'
import Header from '@/components/Header'
import Hero from '@/components/Hero'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [ocrResult, setOcrResult] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
    setOcrResult(null)
    setError(null)
  }

  const handleOCRComplete = (result: string) => {
    setOcrResult(result)
    setIsProcessing(false)
  }

  const handleProcessingStart = () => {
    setIsProcessing(true)
    setError(null)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setIsProcessing(false)
  }

  const resetApp = () => {
    setUploadedImage(null)
    setOcrResult(null)
    setIsProcessing(false)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-off-white via-white to-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Hero />
        
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div className="card p-8">
                <h2 className="text-2xl font-semibold text-dark-gray mb-6 text-center">
                  Upload Number Plate Image
                </h2>
                <ImageUpload
                  onImageUpload={handleImageUpload}
                  onProcessingStart={handleProcessingStart}
                  onOCRComplete={handleOCRComplete}
                  onError={handleError}
                  isProcessing={isProcessing}
                  uploadedImage={uploadedImage}
                />
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="card p-8">
                <h2 className="text-2xl font-semibold text-dark-gray mb-6 text-center">
                  Recognition Results
                </h2>
                <OCRResult
                  result={ocrResult}
                  isProcessing={isProcessing}
                  error={error}
                  uploadedImage={uploadedImage}
                  onReset={resetApp}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
