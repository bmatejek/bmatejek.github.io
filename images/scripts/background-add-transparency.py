import math

import numpy as np 
import scipy.spatial

from PIL import Image



# read the input image and make sure parameters have not changed
image = np.array(Image.open('../background-full-rotated.png'))
yres, xres, _ = image.shape 
assert (yres == 2500)
assert (xres == 1689)

# narrow the image to 1016 (63.5rem) by 1400
xstart = 250
ystart = 0
image = image[ystart:ystart+1400,xstart:xstart+1016]
yres, xres, _ = image.shape 
assert (yres == 1400)
assert (xres == 1016)

# inclusion ellipse radius
inclusion_cx = (xres - 1) / 2
inclusion_cy = 0
inclusion_ra = xres // 8
inclusion_rb = yres // 4

# exclusion ellipse radii
exclusion_cx = (xres - 1) / 2
exclusion_cy = 0
exclusion_ra = (xres - 1) / 2
exclusion_rb = (yres - 1) 

max_transparency = 127
temp_value = 5

# include and exclude points based on the ellipses
for iy in range(yres):
    for ix in range(xres):
        # where does the point fall relative to the inclusions and exclusion radii
        if (ix - inclusion_cx) ** 2 / inclusion_ra ** 2 + (iy - inclusion_cy) ** 2 / inclusion_rb ** 2 < 1: image[iy,ix,3] = max_transparency
        elif (ix - exclusion_cx) ** 2 / exclusion_ra ** 2 + (iy - exclusion_cy) ** 2 / exclusion_rb ** 2 > 1: image[iy,ix,3] = 0
        else: image[iy,ix,3] = temp_value

# get a list of the border points to the exclusion zone and to the inclusion zone 
exclusion_boundary = []
inclusion_boundary = []
for iy in range(yres):
    included = False 
    excluded = True 

    # scan over x values 
    for ix in range(xres):
        if excluded and not image[iy,ix,3] == 0:
            exclusion_boundary.append((iy, ix))
            excluded = False 
        if not excluded and image[iy,ix,3] == 0:
            exclusion_boundary.append((iy, ix))
            excluded = True

        if not included and image[iy,ix,3] == max_transparency:
            inclusion_boundary.append((iy, ix))
            included = True 
        if included and not image[iy,ix,3] == max_transparency:
            inclusion_boundary.append((iy, ix))
            included = False

# create numpy arrays for the inclusion, exclusion boundaries 
np_inclusion_points = np.zeros((len(inclusion_boundary), 2), dtype=np.int32)
np_exclusion_points = np.zeros((len(exclusion_boundary), 2), dtype=np.int32)

for iv, (iy, ix) in enumerate(inclusion_boundary):
    np_inclusion_points[iv,:] = (iy, ix)
for iv, (iy, ix) in enumerate(exclusion_boundary):
    np_exclusion_points[iv,:] = (iy,ix)

# iterate over points in the middle ground to find distance between the inclusion and exclusion ellipses
for iy in range(yres):
    for ix in range(xres):
        # only consider the inbetween points 
        if not image[iy,ix,3] == temp_value: continue

        point = np.zeros((1, 2), dtype=np.int32)
        point[0,:] = (iy, ix)

        # get the distance from inclusion and exclusion 
        distance_from_inclusion = scipy.spatial.distance.cdist(np_inclusion_points, point).min()
        distance_from_exclusion = scipy.spatial.distance.cdist(np_exclusion_points, point).min()

        relative_position = distance_from_exclusion / (distance_from_inclusion + distance_from_exclusion)

        image[iy,ix,3] = relative_position * max_transparency

# save the output image 
output_filename = '../background-full-rotated-added-transparency.png'

im = Image.fromarray(image)

im.save(output_filename)
