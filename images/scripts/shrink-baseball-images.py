import math
import glob


import numpy as np



from PIL import Image



filenames = sorted(glob.glob('baseball/photos/*jpg'))

for filename in filenames:
    im = Image.open(filename)

    yres, xres, depth = np.array(im).shape

    npixels = yres * xres
    target_npixels = 240000

    reduction = int(round(math.sqrt(npixels // target_npixels)))

    downsample_size = (xres // reduction, yres // reduction)
    im = im.resize(downsample_size, resample = Image.LANCZOS)

    output_filename = '{}-reduced.png'.format(filename.split('.')[0])
    im.save(output_filename)
