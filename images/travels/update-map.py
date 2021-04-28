import numpy as np 



from PIL import Image 



im = np.array(Image.open('world-map-black-and-white.jpg'))



yres, xres, depth = im.shape 

output_image = np.zeros((yres, xres, 4), dtype=np.uint8)

for iy in range(yres):
	for ix in range(xres):
		color = sum(im[iy,ix,:])
		
		if color < 245 * 3: output_image[iy,ix,:] = (10, 26, 36, 255)
		else: output_image[iy,ix,:] = (222, 237, 254, 192)
		
		
im = Image.fromarray(output_image)
im.save('world-map.png')
