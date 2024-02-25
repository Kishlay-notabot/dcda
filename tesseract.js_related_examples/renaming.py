import os
import random
import string

def generate_random_string(length=4):
    """Generate a random 4-letter string."""
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for _ in range(length))

def rename_images(directory_path): 
    files = os.listdir(directory_path) 
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    image_files = [file for file in files if any(file.lower().endswith(ext) for ext in image_extensions)]
 
    image_files.sort() 
    for image_file in image_files:
        random_string = generate_random_string()
        new_name = f"{random_string}" + os.path.splitext(image_file)[1]
        old_path = os.path.join(directory_path, image_file)
        new_path = os.path.join(directory_path, new_name)
 
        os.rename(old_path, new_path)
        print(f"Renamed: {image_file} -> {new_name}")
 
script_directory = os.path.dirname(__file__) 
rename_images(script_directory)
