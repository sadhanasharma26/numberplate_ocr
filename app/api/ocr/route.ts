import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      )
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // For now, we'll use a simple mock response
    // In production, you would call your Python OCR service here
    const mockResult = await processImageWithOCR(dataUrl)
    
    return NextResponse.json(mockResult)
    
  } catch (error) {
    console.error('OCR API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function processImageWithOCR(imageData: string): Promise<{success: boolean, text?: string, error?: string}> {
  try {
    // This is a mock implementation
    // In production, you would:
    // 1. Send the image to your Python OCR service
    // 2. Or use a client-side OCR library like Tesseract.js
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock successful result
    return {
      success: true,
      text: 'ABC 1234' // Mock extracted text
    }
    
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process image'
    }
  }
}
