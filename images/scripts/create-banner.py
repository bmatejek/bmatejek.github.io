from PIL import Image



import numpy as np



from numba import jit 



banner_color = (10, 26, 36)
background_color = (222, 237, 254)



@jit(nopython=True)
def MakeTransparent(banner):
    yres, xres, _ = banner.shape
    
    output_banner = np.zeros((yres, xres, 4), dtype=np.uint8)

    # go in y-scan order 
    for ix in range(xres):
        for iy in range(yres):
            luminance = 0.2126 * banner[iy,ix,0] + 0.7152 * banner[iy,ix,1] + 0.0722 * banner[iy,ix,2]
            if luminance < 254:
                output_banner[iy,ix,:] = (banner_color[0], banner_color[1], banner_color[2], 255)
            else:
                output_banner[iy,ix,:] = (background_color[0], background_color[1], background_color[2], 255)

    return output_banner



banner = np.array(Image.open('../banner.png'))

banner = MakeTransparent(banner)

# save the output image 
output_filename = '../banner-transparent.png'

im = Image.fromarray(banner)

im.save(output_filename)
