import os
import cv2

def process_images(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    image_files = [f for f in os.listdir(input_folder) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    for image_file in image_files:
        input_path = os.path.join(input_folder, image_file)
        output_path = os.path.join(output_folder, f"processed_{image_file}")
        image = cv2.imread(input_path)
        if image is not None:
            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            normalized_image = gray_image / 255.0
            cv2.imwrite(output_path, normalized_image)
            print(f"Processed image saved: {output_path}")
        else:
            print(f"Error reading image: {input_path}")

if __name__ == "__main__":
    input_folder = "input_images"
    output_folder = "output_images"
    process_images(input_folder, output_folder)
