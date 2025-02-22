import cv2
import imutils
import numpy as np
import matplotlib.pyplot as plt
import easyocr

img = cv2.imread('/content/5.jpeg')
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title('Original Image')
plt.show()

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
enhanced_gray = clahe.apply(gray)
blurred = cv2.GaussianBlur(enhanced_gray, (5, 5), 0)
edged = cv2.Canny(blurred, 50, 150)
plt.imshow(cv2.cvtColor(edged, cv2.COLOR_BGR2RGB))
plt.title('Edge Detection')
plt.show()

keypoints = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(keypoints)
contours = sorted(contours, key=cv2.contourArea, reverse=True)

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
    print("License plate not detected!")
else:
    mask = np.zeros(gray.shape, np.uint8)
    new_image = cv2.drawContours(mask, [location], 0, 255, -1)
    new_image = cv2.bitwise_and(img, img, mask=mask)

    (x, y) = np.where(mask == 255)
    (x1, y1) = (np.min(x), np.min(y))
    (x2, y2) = (np.max(x), np.max(y))
    cropped_image = enhanced_gray[x1:x2 + 1, y1:y2 + 1]

    cropped_image = cv2.threshold(cropped_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    plt.imshow(cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB))
    plt.title('Cropped License Plate')
    plt.show()

    reader = easyocr.Reader(['en'])
    result = reader.readtext(cropped_image, detail=1, allowlist='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

    plate_text = []
    for detection in result:
        text = detection[1]
        if len(text) > 4 and text.isalnum():
            plate_text.append(text)

    if plate_text:
        text = ' '.join(plate_text)
        font = cv2.FONT_HERSHEY_SIMPLEX
        res = cv2.putText(img, text=text, org=(approx[0][0][0], approx[1][0][1] + 60),
                          fontFace=font, fontScale=1, color=(0, 255, 0),
                          thickness=2, lineType=cv2.LINE_AA)
        res = cv2.rectangle(img, tuple(approx[0][0]), tuple(approx[2][0]), (0, 255, 0), 3)

        plt.imshow(cv2.cvtColor(res, cv2.COLOR_BGR2RGB))
        plt.title('Final Image with License Plate Text')
        plt.show()
        print("Detected License Plate Text:", text)
    else:
        print("No valid text detected on license plate!")
