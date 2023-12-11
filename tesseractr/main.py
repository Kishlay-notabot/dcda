from PIL import Image
import pytesseract
  
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Read the image
print(pytesseract.image_to_string(Image.open('image.png')))

# Extract the lines
boxes = pytesseract.image_to_boxes('image.png')
lines = []
for b in boxes.splitlines():
    # Extract the coordinates of the bounding box
    x, y, w, h = [int(v) for v in b.split()]
    # Create a dictionary to store the line information
    line_info = {"bounding_box": (x, y, w, h)}
    lines.append(line_info)

# Process the lines further
# (optional: perform OCR on each line, save line information, etc.)

# Print the extracted lines
for line in lines:
    print(f"Line: {line['bounding_box']}")
