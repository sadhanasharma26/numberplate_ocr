'use client'

import { Upload, Zap, Shield, Smartphone } from 'lucide-react'

export default function Hero() {
  return (
    <section className="text-center py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-dark-gray mb-6 leading-tight">
          Extract Text from
          <span className="text-soft-violet block">Number Plates</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Upload an image of a vehicle number plate and get instant, accurate text extraction 
          using advanced OCR technology powered by computer vision.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-soft-violet/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-soft-violet" />
            </div>
            <h3 className="text-lg font-semibold text-dark-gray mb-2">Easy Upload</h3>
            <p className="text-gray-600 text-sm">
              Simply drag and drop or click to upload your number plate image
            </p>
          </div>

          <div className="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-soft-violet/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-soft-violet" />
            </div>
            <h3 className="text-lg font-semibold text-dark-gray mb-2">Instant Processing</h3>
            <p className="text-gray-600 text-sm">
              Advanced AI algorithms process your image in seconds
            </p>
          </div>

          <div className="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-soft-violet/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-soft-violet" />
            </div>
            <h3 className="text-lg font-semibold text-dark-gray mb-2">Secure & Private</h3>
            <p className="text-gray-600 text-sm">
              Your images are processed securely and not stored permanently
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
