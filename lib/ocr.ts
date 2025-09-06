import Tesseract from 'tesseract.js'

export interface OCRResult {
  success: boolean
  text?: string
  confidence?: number
  error?: string
}

export async function performOCR(imageData: string): Promise<OCRResult> {
  try {
    const { data } = await Tesseract.recognize(
      imageData,
      'eng',
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`Progress: ${Math.round(m.progress * 100)}%`)
          }
        },
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      }
    )

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
  }
}

export async function performAdvancedOCR(imageData: string): Promise<OCRResult> {
  try {
    // First attempt with default settings
    let result = await performOCR(imageData)
    
    if (result.success && result.text && result.text.length >= 4) {
      return result
    }

    // If first attempt failed or result is too short, try with different settings
    const { data } = await Tesseract.recognize(
      imageData,
      'eng',
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`Advanced OCR Progress: ${Math.round(m.progress * 100)}%`)
          }
        },
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT,
        tessedit_ocr_engine_mode: Tesseract.OEM.LSTM_ONLY,
      }
    )

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
  }
}
