# Number Plate OCR Web Application

A modern, responsive web application for extracting text from vehicle number plates using advanced OCR technology.

## Features

- 🖼️ **Drag & Drop Upload**: Easy image upload with preview
- 🤖 **AI-Powered OCR**: Client-side text extraction using Tesseract.js
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🎨 **Modern UI**: Clean, minimalist interface with smooth animations
- ⚡ **Real-time Processing**: Instant text extraction with progress indicators
- 📋 **Copy to Clipboard**: One-click text copying functionality
- 🔒 **Privacy-Focused**: All processing happens client-side

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Tesseract.js** - Client-side OCR engine
- **React Dropzone** - File upload component
- **Lucide React** - Beautiful icons

### Backend (Optional)
- **Node.js + Express** - API server
- **Python + OpenCV + EasyOCR** - Advanced OCR processing
- **Multer** - File upload handling

## Design System

### Color Palette
- **Dark Gray**: `#50514F` - Primary text and UI elements
- **Soft Violet**: `#B4ADEA` - Accent color for buttons and highlights
- **Off White**: `#FDFFF7` - Background color

### Typography
- **Font**: IBM Plex Sans
- **Weights**: 100-700 (variable font)

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Python 3.8+ (for backend OCR service)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Optional: Backend OCR Service

For more accurate results, you can run the Python-based OCR service:

1. **Install Python dependencies**:
   ```bash
   pip install opencv-python easyocr imutils numpy pillow
   ```

2. **Start the backend server**:
   ```bash
   npm run server
   ```

The backend will run on [http://localhost:3001](http://localhost:3001)

## Project Structure

```
numberplate_ocr/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Landing section
│   ├── ImageUpload.tsx    # File upload component
│   └── OCRResult.tsx      # Results display
├── lib/                   # Utility libraries
│   └── ocr.ts            # OCR processing logic
├── server/               # Backend services
│   ├── index.js          # Express server
│   ├── ocr_service.py    # Python OCR service
│   └── process_ocr.py    # Standalone OCR script
├── codes/                # Original Python OCR code
├── dataset/              # Sample images
└── package.json          # Dependencies and scripts
```

## Usage

1. **Upload Image**: Drag and drop or click to upload a number plate image
2. **Process**: Click "Extract Text" to start OCR processing
3. **View Results**: See the extracted text with confidence score
4. **Copy Text**: Click the copy button to copy text to clipboard
5. **New Image**: Click "New Image" to process another image

## API Endpoints

### Frontend API (Next.js)
- `POST /api/ocr` - Process image with OCR

### Backend API (Express)
- `GET /health` - Health check
- `POST /api/ocr` - Advanced OCR processing

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

- **Client-side OCR**: No server round-trips for basic processing
- **Lazy Loading**: Components load only when needed
- **Image Optimization**: Automatic image compression and optimization
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Tesseract.js** for client-side OCR capabilities
- **EasyOCR** for advanced text recognition
- **OpenCV** for image processing
- **Tailwind CSS** for the design system
- **Lucide** for beautiful icons
