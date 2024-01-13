import cv2
import tkinter as tk
from tkinter import filedialog
from tkinter import Scale
from PIL import Image, ImageTk
import os

def process_and_update_preview():
    global file_paths
    # Check if no files were selected
    if not file_paths:
        print("No files selected. Exiting.")
        return

    # Get the current slider values
    brightness_value = brightness_slider.get()
    contrast_value = contrast_slider.get()

    for file_path in file_paths:
        image = cv2.imread(file_path)

        # Adjust brightness and contrast
        adjusted_image = cv2.convertScaleAbs(image, alpha=brightness_value, beta=contrast_value)

        # Convert OpenCV image to PIL format
        adjusted_image_pil = Image.fromarray(cv2.cvtColor(adjusted_image, cv2.COLOR_BGR2RGB))

        # Resize the image while maintaining the original aspect ratio
        width, height = adjusted_image_pil.size
        new_width = int(width * 0.5)
        new_height = int(height * (new_width / width))
        adjusted_image_pil = adjusted_image_pil.resize((new_width, new_height), Image.ANTIALIAS)

        # Convert PIL image to Tkinter PhotoImage
        adjusted_image_tk = ImageTk.PhotoImage(adjusted_image_pil)

        # Update the preview label
        preview_label.config(image=adjusted_image_tk)
        preview_label.image = adjusted_image_tk

def select_files():
    global file_paths
    file_paths = filedialog.askopenfilenames(initialdir="/", title="Select Image(s)", filetypes=(("Image Files", "*.jpg;*.jpeg;*.png"),))
    process_and_update_preview()

def update_values():
    process_and_update_preview()

root = tk.Tk()
root.title("Image Processing")

file_paths = []

# File Selection Button
file_button = tk.Button(root, text="Select Image(s)", command=select_files)
file_button.pack(pady=10)

# Brightness Slider
brightness_slider = Scale(root, label="Brightness", from_=0.5, to=2.0, resolution=0.1, orient="horizontal", command=update_values)
brightness_slider.set(1.0)
brightness_slider.pack(pady=10)

# Contrast Slider
contrast_slider = Scale(root, label="Contrast", from_=0.5, to=2.0, resolution=0.1, orient="horizontal", command=update_values)
contrast_slider.set(1.0)
contrast_slider.pack(pady=10)

# Preview Label
preview_label = tk.Label(root)
preview_label.pack(pady=10)

root.mainloop()
