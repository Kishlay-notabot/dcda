import os
import cv2

def correct_image_illumination(image_path, output_path):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    se = cv2.getStructuringElement(cv2.MORPH_RECT, (8, 8))
    bg = cv2.morphologyEx(image, cv2.MORPH_DILATE, se)
    out_gray = cv2.divide(image, bg, scale=255)
    out_binary = cv2.threshold(out_gray, 0, 255, cv2.THRESH_OTSU)[1]
    cv2.imwrite(output_path + '_binary.png', out_binary)
    cv2.imwrite(output_path + '_gray.png', out_gray)

def process_images(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    image_files = [f for f in os.listdir(input_folder) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    for image_file in image_files:
        input_path = os.path.join(input_folder, image_file)
        output_path = os.path.join(output_folder, f"processed_{os.path.splitext(image_file)[0]}")
        correct_image_illumination(input_path, output_path)
        print(f"Processed image saved: {output_path}")

if __name__ == "__main__":
    input_folder = "input_images"
    output_folder = "output_images"
    process_images(input_folder, output_folder)``
