import numpy as np 



from PIL import Image



im = np.array(Image.open('static/images/travels/postcard-edge-original.png'))

yres, xres, _ = im.shape

output_im = np.zeros((yres, xres, 4), dtype=np.uint8)

for iy in range(yres):
	print (iy)
	for ix in range(xres):
		if np.sum(im[iy,ix,0:3]) > 128:
			output_im[iy,ix,:] = 255

output_filename = 'static/images/travels/postcard-edge.png'

im = Image.fromarray(output_im)
im.save(output_filename)
