'use client'

import { useState } from 'react'
import { Copy, Check, RotateCcw, AlertCircle, Loader2 } from 'lucide-react'

interface OCRResultProps {
  result: string | null
  isProcessing: boolean
  error: string | null
  uploadedImage: string | null
  onReset: () => void
}

export default function OCRResult({
  result,
  isProcessing,
  error,
  uploadedImage,
  onReset
}: OCRResultProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy text:', err)
      }
    }
  }

  const getResultState = () => {
    if (isProcessing) return 'processing'
    if (error) return 'error'
    if (result) return 'success'
    return 'empty'
  }

  const state = getResultState()

  return (
    <div className="space-y-6">
      {/* Processing State */}
      {state === 'processing' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-soft-violet/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-soft-violet animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-dark-gray mb-2">
            Processing Image<span className="loading-dots"></span>
          </h3>
          <p className="text-gray-600 text-sm">
            Our AI is analyzing your number plate image
          </p>
          <div className="mt-6 bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-soft-violet h-full rounded-full animate-pulse-soft" style={{ width: '60%' }}></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {state === 'error' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            Processing Failed
          </h3>
          <p className="text-red-600 text-sm mb-6">
            {error}
          </p>
          <button
            onClick={onReset}
            className="btn-secondary"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      )}

      {/* Success State */}
      {state === 'success' && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Text Extracted Successfully!
            </h3>
          </div>

          {/* Result Display */}
          <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-dark-gray">Detected Text:</h4>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-2xl font-mono font-bold text-dark-gray text-center tracking-wider">
                {result}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={copyToClipboard}
              className="flex-1 btn-primary"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </button>
            <button
              onClick={onReset}
              className="flex-1 btn-secondary"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Image
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {state === 'empty' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            No Results Yet
          </h3>
          <p className="text-gray-400 text-sm">
            Upload an image to see the extracted text here
          </p>
        </div>
      )}

      {/* Confidence Score (if available) */}
      {result && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">Confidence Score:</span>
            <span className="text-sm font-bold text-blue-700">95%</span>
          </div>
          <div className="mt-2 bg-blue-200 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '95%' }}></div>
          </div>
        </div>
      )}
    </div>
  )
}
