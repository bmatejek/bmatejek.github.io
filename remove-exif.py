import os 



import numpy as np 



from PIL import Image 
from skimage import io


image_exts = ['jpeg', 'jpg', 'png']

for root, dirs, files in os.walk('.'):
    # find all image files 
    for file in files:
        ext = file.split('.')[-1]

        if not ext in image_exts: continue 

        filename = os.path.join(root, file)

        print (filename)
        im = np.array(Image.open(filename))

        io.imsave(filename, im)