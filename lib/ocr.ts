import Tesseract from 'tesseract.js'

export interface OCRResult {
  success: boolean
  text?: string
  confidence?: number
  error?: string
}

export async function performOCR(imageData: string): Promise<OCRResult> {
  const worker = await Tesseract.createWorker('eng')
  try {
    await worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
    })

    const { data } = await worker.recognize(imageData)

    // Clean up the extracted text
    const cleanedText = data.text
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase()

    // Filter out very short or invalid results
    if (cleanedText.length < 2) {
      return {
        success: false,
        error: 'No valid text detected in the image'
      }
    }

    return {
      success: true,
      text: cleanedText,
      confidence: data.confidence / 100 // Convert to 0-1 scale
    }

  } catch (error) {
    console.error('OCR Error:', error)
    return {
      success: false,
      error: 'Failed to process image with OCR'
    }
  } finally {
    await worker.terminate()
  }
}

export async function performAdvancedOCR(imageData: string): Promise<OCRResult> {
  // First attempt with default settings
  const result = await performOCR(imageData)

  if (result.success && result.text && result.text.length >= 4) {
    return result
  }

  // If first attempt failed or result is too short, try with different settings
  const worker = await Tesseract.createWorker('eng')
  try {
    await worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT,
      tessedit_ocr_engine_mode: Tesseract.OEM.LSTM_ONLY,
    })

    const { data } = await worker.recognize(imageData)

    const cleanedText = data.text
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase()

    if (cleanedText.length >= 2) {
      return {
        success: true,
        text: cleanedText,
        confidence: data.confidence / 100
      }
    }

    return {
      success: false,
      error: 'No valid number plate text detected'
    }

  } catch (error) {
    console.error('Advanced OCR Error:', error)
    return {
      success: false,
      error: 'Failed to process image with advanced OCR'
    }
  } finally {
    await worker.terminate()
  }
}
