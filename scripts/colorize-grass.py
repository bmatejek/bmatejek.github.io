import numpy as np
import skimage.measure


from PIL import Image, ImageFilter



from scripts.utilities import ReadWebsiteColors




color_dark, color_light = ReadWebsiteColors()



directory = 'static/images/hiking/post'


# read the grass image 
im = np.array(Image.open('{}/hiking-grass.png'.format(directory)))

yres, xres, _ = im.shape

# create a binary numpy array 
for iy in range(yres):
    for ix in range(xres):
        if sum(im[iy,ix,:]) / 3 < 225:
            im[iy,ix,:] = 0
        else:
            im[iy,ix,:] = 255

labels = skimage.measure.label(im)

output_im = np.ones((yres, xres, 4), dtype=np.uint8) * 255

for iy in range(yres):
    for ix in range(xres):
        # the grass is zero and the outside background is 1
        # all grass inside is any other number
        if labels[iy,ix,0] == 0:
            output_im[iy,ix,0:3] = color_dark
        elif labels[iy,ix,0] == 1:
            output_im[iy,ix,:] = 0
        else:
            output_im[iy,ix,0:3] = color_light

output_filename = '{}/hiking-grass-colorized.png'.format(directory)

# save the output file
im = Image.fromarray(output_im)

im.save(output_filename)