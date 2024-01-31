import os
import cv2

def convert_to_grayscale(input_path, output_path):
    image = cv2.imread(input_path, cv2.IMREAD_GRAYSCALE)
    cv2.imwrite(output_path, image)

def apply_binarization(input_path, output_path):
    image = cv2.imread(input_path, cv2.IMREAD_GRAYSCALE)

    # Binarization
    se = cv2.getStructuringElement(cv2.MORPH_RECT, (8, 8))
    bg = cv2.morphologyEx(image, cv2.MORPH_DILATE, se)
    out_binary = cv2.divide(image, bg, scale=255)
    out_binary = cv2.threshold(out_binary, 0, 255, cv2.THRESH_OTSU)[1]

    cv2.imwrite(output_path, out_binary)

def process_images(input_folder, output_folder_gray, output_folder_binarized):
    os.makedirs(output_folder_gray, exist_ok=True)
    os.makedirs(output_folder_binarized, exist_ok=True)

    image_files = [f for f in os.listdir(input_folder) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    total_images = len(image_files)

    for idx, image_file in enumerate(image_files, start=1):
        input_path = os.path.join(input_folder, image_file)
        
        # Convert to grayscale and save
        output_path_gray = os.path.join(output_folder_gray, f"{os.path.splitext(image_file)[0]}_gray.png")
        convert_to_grayscale(input_path, output_path_gray)
        print(f"Processed image {idx}/{total_images} (Grayscale): {output_path_gray}")

        # Apply binarization and save
        output_path_binarized = os.path.join(output_folder_binarized, f"{os.path.splitext(image_file)[0]}_binarized.png")
        apply_binarization(output_path_gray, output_path_binarized)
        print(f"Processed image {idx}/{total_images} (Binarized): {output_path_binarized}")

if __name__ == "__main__":
    input_folder = "input_images"
    output_folder_gray = "output_images/output_images_gray"
    output_folder_binarized = "output_images/output_images_binarized"

    process_images(input_folder, output_folder_gray, output_folder_binarized)
