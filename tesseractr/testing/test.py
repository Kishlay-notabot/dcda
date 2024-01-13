import cv2
import tkinter as tk
from tkinter import filedialog
import os

def process_images():
    file_paths = filedialog.askopenfilenames(initialdir="/", title="Select Image(s)", filetypes=(("Image Files", "*.jpg;*.jpeg;*.png"),))

    # Check if no files were selected
    if not file_paths:
        print("No files selected. Exiting.")
        return

    output_dir = "processed_images"
    os.makedirs(output_dir, exist_ok=True)

    for file_path in file_paths:
        image = cv2.imread(file_path)

        # Convert to grayscale
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Normalize pixel values to the range 0-1
        normalized_image = gray_image / 255.0

        # Save the processed image in the "processed_images" directory
        output_path = os.path.join(output_dir, f"processed_{os.path.basename(file_path)}")
        cv2.imwrite(output_path, normalized_image)

        print(f"Processed image saved: {output_path}")

root = tk.Tk()
  # Hide the main window

process_images()
