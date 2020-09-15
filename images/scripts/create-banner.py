from PIL import Image



import numpy as np



from numba import jit 



color = (10, 26, 36)



@jit(nopython=True)
def MakeTransparent(banner):
    yres, xres, _ = banner.shape
    
    output_banner = np.zeros((yres, xres, 4), dtype=np.uint8)

    # go in y-scan order 
    for ix in range(xres):
        for iy in range(yres):
            luminance = 0.2126 * banner[iy,ix,0] + 0.7152 * banner[iy,ix,1] + 0.0722 * banner[iy,ix,2]
            if luminance < 254:
                output_banner[iy,ix,:] = (color[0], color[1], color[2], 255)
            else:
                output_banner[iy,ix,:] = (0, 0, 0, 0)

    return output_banner



banner = np.array(Image.open('../banner.png'))

banner = MakeTransparent(banner)

# save the output image 
output_filename = '../banner-transparent.png'

im = Image.fromarray(banner)

im.save(output_filename)
