import os
from collections import Counter

def calculate_image_statistics(folder_path):
    image_info_list = []

    for entry in os.scandir(folder_path):
        if entry.is_file() and entry.name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            file_path = entry.path
            file_size = entry.stat().st_size

            with open(file_path, 'rb') as f:
                f.seek(163)
                a = f.read(2)
                height = (a[0] << 8) + a[1]
                a = f.read(2)
                width = (a[0] << 8) + a[1]

            image_info_list.append({
                'filename': entry.name,
                'file_size': file_size,
                'width': width,
                'height': height,
            })

    if not image_info_list:
        print("No images found in the folder.")
        return

    total_file_size = sum(image_info['file_size'] for image_info in image_info_list)
    average_file_size = total_file_size / len(image_info_list)

    aspect_ratios = [image_info['width'] / image_info['height'] for image_info in image_info_list]
    most_common_resolution = Counter((image_info['width'], image_info['height']) for image_info in image_info_list).most_common(1)[0][0]

    print(f"Number of Images: {len(image_info_list)}")
    print(f"Average File Size: {average_file_size:.2f} bytes")
    print(f"Largest File: {max(image_info_list, key=lambda x: x['file_size'])['filename']} - {max(image_info_list, key=lambda x: x['file_size'])['file_size']} bytes")
    print(f"Smallest File: {min(image_info_list, key=lambda x: x['file_size'])['filename']} - {min(image_info_list, key=lambda x: x['file_size'])['file_size']} bytes")
    print(f"Average Width: {sum(image_info['width'] for image_info in image_info_list) / len(image_info_list):.2f}")
    print(f"Average Height: {sum(image_info['height'] for image_info in image_info_list) / len(image_info_list):.2f}")
    print(f"Aspect Ratio Distribution: {aspect_ratios}")
    print(f"Most Common Resolution: {most_common_resolution[0]} x {most_common_resolution[1]}")

folder_path = 'output_images'
calculate_image_statistics(folder_path)
