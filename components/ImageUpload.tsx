'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { performOCR } from '@/lib/ocr'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  onProcessingStart: () => void
  onOCRComplete: (result: string) => void
  onError: (error: string) => void
  isProcessing: boolean
  uploadedImage: string | null
}

export default function ImageUpload({
  onImageUpload,
  onProcessingStart,
  onOCRComplete,
  onError,
  isProcessing,
  uploadedImage
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setPreview(result)
        onImageUpload(result)
      }
      reader.readAsDataURL(file)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handleOCR = async () => {
    if (!preview) return

    try {
      onProcessingStart()
      
      // Use client-side OCR with Tesseract.js
      const result = await performOCR(preview)

      if (result.success && result.text) {
        onOCRComplete(result.text)
      } else {
        onError(result.error || 'Failed to extract text from image')
      }
    } catch (error) {
      console.error('OCR Error:', error)
      onError('Failed to process image. Please try again.')
    }
  }

  const clearImage = () => {
    setPreview(null)
    onImageUpload('')
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!preview && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
            ${isDragActive 
              ? 'border-soft-violet bg-soft-violet/5 scale-105' 
              : 'border-gray-300 hover:border-soft-violet hover:bg-gray-50'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="w-16 h-16 bg-soft-violet/10 rounded-2xl flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-soft-violet" />
            </div>
            <div>
              <p className="text-lg font-medium text-dark-gray mb-2">
                {isDragActive ? 'Drop your image here' : 'Upload Number Plate Image'}
              </p>
              <p className="text-gray-600 text-sm">
                Drag and drop or click to browse
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Supports: JPG, PNG, GIF, BMP, WebP (Max 10MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {preview && (
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={preview}
              alt="Uploaded number plate"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={clearImage}
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Image uploaded successfully! Click the button below to extract text.
            </p>
            
            <button
              onClick={handleOCR}
              disabled={isProcessing}
              className={`
                w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 transform
                ${isProcessing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'btn-primary hover:scale-105 active:scale-95'
                }
              `}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing<span className="loading-dots"></span></span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <ImageIcon className="w-5 h-5" />
                  <span>Extract Text</span>
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Tips for better results:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure the number plate is clearly visible and well-lit</li>
          <li>• Avoid blurry or heavily angled images</li>
          <li>• Higher resolution images generally work better</li>
          <li>• Make sure the plate text is not obscured by shadows or reflections</li>
        </ul>
      </div>
    </div>
  )
}
