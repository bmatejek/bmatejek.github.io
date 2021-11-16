import os
import glob 



import numpy as np



from PIL import Image



from scripts.utilities import ReadWebsiteColors



# get the directory with all of the icons
directory = 'static/images/icons'



color_dark, color_light = ReadWebsiteColors()




image_filenames = glob.glob('{}/raw/*png'.format(directory))
for image_filename in image_filenames:
	prefix = image_filename.split('/')[-1].split('.')[0]
	
	# check the xor to make sure the image is either black or white 
	assert ('black' in prefix or 'white' in prefix)
	assert (not 'black' in prefix or not 'white' in prefix)

	im = np.array(Image.open(image_filename))

	yres, xres, depth = im.shape 
	assert (depth == 4)

	output_im = np.zeros((yres, xres, depth), dtype=np.uint8)
	
	if 'background' in image_filename:
		opacity = 65
	else:
		opacity = 255

	for iy in range(yres):
		for ix in range(xres):
			if im[iy,ix,3] == 0: continue 

			if 'black' in prefix:
				output_im[iy,ix,0:3] = color_dark 
				output_im[iy,ix,3] = opacity
			else:
				output_im[iy,ix,0:3] = color_light
				output_im[iy,ix,3] = opacity

	im = Image.fromarray(output_im)

	if 'black' in prefix:
		output_filename = '{}/{}dark.png'.format(directory, prefix.rstrip('black'))
	else:
		output_filename = '{}/{}light.png'.format(directory, prefix.rstrip('white'))

	im.save(output_filename)
