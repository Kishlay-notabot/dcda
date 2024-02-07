import os

def calculate_image_statistics(folder_path):
    print(folder_path)
    image_info_list = []

    for entry in os.scandir(folder_path):
        if entry.is_file() and entry.name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            file_path = entry.path
            file_size = entry.stat().st_size / 1024

            image_info_list.append({
                'filename': entry.name,
                'file_size': file_size,
            })

    if not image_info_list:
        print("No images found in the folder.")
        return

    total_file_size = sum(image_info['file_size'] for image_info in image_info_list)
    average_file_size = total_file_size / len(image_info_list)

    print(f"Number of Images: {len(image_info_list)}")
    print(f"Average File Size: {average_file_size:.2f} KBs")
    print(f"Largest File: {max(image_info_list, key=lambda x: x['file_size'])['filename']} - {max(image_info_list, key=lambda x: x['file_size'])['file_size']} KBs")
    print(f"Smallest File: {min(image_info_list, key=lambda x: x['file_size'])['filename']} - {min(image_info_list, key=lambda x: x['file_size'])['file_size']} KBs")

folder_path = 'output_images/cropped_words'
calculate_image_statistics(folder_path)
