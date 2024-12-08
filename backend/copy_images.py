import os
import shutil
from pathlib import Path

def copy_images():
    # Source directory (frontend images)
    frontend_images_dir = Path('../frontend/images')
    
    # Destination directory (backend images)
    backend_images_dir = Path('./images')
    
    # Create backend images directory if it doesn't exist
    backend_images_dir.mkdir(exist_ok=True)
    
    # Copy all images from frontend to backend
    if frontend_images_dir.exists():
        for image_file in frontend_images_dir.glob('*.jpg'):
            shutil.copy2(image_file, backend_images_dir / image_file.name)
        for image_file in frontend_images_dir.glob('*.png'):
            shutil.copy2(image_file, backend_images_dir / image_file.name)
        print("Images copied successfully!")
    else:
        print("Frontend images directory not found!")

if __name__ == "__main__":
    copy_images()
