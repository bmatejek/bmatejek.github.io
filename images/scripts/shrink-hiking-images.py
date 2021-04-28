import math
import glob


import numpy as np



from PIL import Image



filename = 'hiking/stowe-pinnacle-panorama.jpg'

im = Image.open(filename)

xres, yres, depth = np.array(im).shape

print (yres, xres)

target_yres = 1600
target_xres = int(round(target_yres * xres / yres))

im = im.resize((target_yres, target_xres), resample = Image.LANCZOS)

output_filename = '{}-reduced.png'.format(filename.split('.')[0])
im.save(output_filename)
