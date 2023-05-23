import django
from django.shortcuts import render

import cv2
from django.http import JsonResponse
from PIL import Image
import numpy as np

# Trash-Snap API
# credits to https://github.com/rabibasukala01/turtlehacks
yellow = [0, 255, 255]  # yellow in BGR
blue = [255, 0, 0]  # blue in BGR
silver = [120, 120, 120]  # grey in BGR
green = [0, 255, 0]  # green in BGR
text_g = "Organic"
text_b = "Recycle"
text_s = "Garbage"

def detect_objects(image_path):
    frame = cv2.imread(image_path)

    hsvImage = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    lowerLimit_b, upperLimit_b = get_limits(color=blue)
    lowerLimit_g, upperLimit_g = get_limits(color=green)
    s = np.uint8([[silver]])
    hsvS = cv2.cvtColor(s, cv2.COLOR_BGR2HSV)
    hue_lower = hsvS[0][0][0] - 150
    hue_upper = hsvS[0][0][0] + 150
    if hue_lower < 0:
        hue_lower = 0
    if hue_upper > 179:
        hue_upper = 179
    gray_lower = hue_upper, 0, 0
    gray_upper = hue_upper, 255, 255
    lowerLimit_s = np.array(gray_lower, dtype=np.uint8)
    upperLimit_s = np.array(gray_upper, dtype=np.uint8)

    mask_b = cv2.inRange(hsvImage, lowerLimit_b, upperLimit_b)
    mask_g = cv2.inRange(hsvImage, lowerLimit_g, upperLimit_g)
    mask_s = cv2.inRange(hsvImage, lowerLimit_s, upperLimit_s)

    mask__b = Image.fromarray(mask_b)
    mask__g = Image.fromarray(mask_g)
    mask__s = Image.fromarray(mask_s)

    bbox_b = mask__b.getbbox()
    bbox_g = mask__g.getbbox()
    bbox_s = mask__s.getbbox()

    objects_detected = []

    if bbox_b is not None:
        objects_detected.append(text_b)

    if bbox_g is not None:
        objects_detected.append(text_g)

    if bbox_s is not None:
        objects_detected.append(text_s)

    return objects_detected

# process image function
def process_image(request):
    print("hi")
    if request.method == 'POST' and 'image' in request.FILES:
        print("1")
        image = request.FILES['image']

        # OpenCV operations
        with open('temp.jpg', 'wb') as f:
            f.write(image.read())
        detected = detect_objects('temp.jpg')

        return JsonResponse({'object': detected})
    else:
        print("2")
        return JsonResponse({'error': 'Invalid image'})
