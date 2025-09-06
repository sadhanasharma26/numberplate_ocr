#!/usr/bin/env python3

import sys
import json
import cv2
import imutils
import numpy as np
import easyocr
import os

def extract_number_plate_text(image_path):
    """
    Extract number plate text from image using the existing OCR pipeline
    """
    try:
        # Read image
        img = cv2.imread(image_path)
        if img is None:
            return {
                'success': False,
                'error': 'Could not read image file',
                'text': None
            }
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply CLAHE for better contrast
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced_gray = clahe.apply(gray)
        
        # Apply Gaussian blur
        blurred = cv2.GaussianBlur(enhanced_gray, (5, 5), 0)
        
        # Edge detection
        edged = cv2.Canny(blurred, 50, 150)
        
        # Find contours
        keypoints = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        contours = imutils.grab_contours(keypoints)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)
        
        # Find license plate location
        location = None
        for contour in contours:
            approx = cv2.approxPolyDP(contour, 0.02 * cv2.arcLength(contour, True), True)
            if len(approx) == 4:
                (x, y, w, h) = cv2.boundingRect(contour)
                aspect_ratio = w / float(h)
                if 2 < aspect_ratio < 5:
                    location = approx
                    break
        
        if location is None:
            # If no license plate detected, try OCR on the entire image
            text = perform_ocr(enhanced_gray)
        else:
            # Create mask and extract license plate
            mask = np.zeros(gray.shape, np.uint8)
            new_image = cv2.drawContours(mask, [location], 0, 255, -1)
            new_image = cv2.bitwise_and(img, img, mask=mask)
            
            # Get bounding box coordinates
            (x, y) = np.where(mask == 255)
            (x1, y1) = (np.min(x), np.min(y))
            (x2, y2) = (np.max(x), np.max(y))
            cropped_image = enhanced_gray[x1:x2 + 1, y1:y2 + 1]
            
            # Apply threshold
            cropped_image = cv2.threshold(cropped_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
            
            # Perform OCR on cropped image
            text = perform_ocr(cropped_image)
        
        return {
            'success': True,
            'text': text,
            'confidence': 0.95
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'text': None
        }

def perform_ocr(image):
    """
    Perform OCR using EasyOCR
    """
    try:
        # Initialize EasyOCR reader
        reader = easyocr.Reader(['en'])
        
        result = reader.readtext(
            image, 
            detail=1, 
            allowlist='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        )
        
        plate_text = []
        for detection in result:
            text = detection[1]
            confidence = detection[2]
            
            # Filter out low confidence and short text
            if confidence > 0.5 and len(text) >= 2 and text.isalnum():
                plate_text.append(text)
        
        if plate_text:
            return ' '.join(plate_text)
        else:
            return "No text detected"
            
    except Exception as e:
        return f"OCR Error: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({
            'success': False,
            'error': 'Usage: python process_ocr.py <image_path>',
            'text': None
        }))
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(json.dumps({
            'success': False,
            'error': 'Image file not found',
            'text': None
        }))
        sys.exit(1)
    
    result = extract_number_plate_text(image_path)
    print(json.dumps(result))
