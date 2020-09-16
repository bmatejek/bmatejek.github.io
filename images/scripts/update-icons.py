from PIL import Image



import numpy as np



twitter = np.array(Image.open('../contact/translucent-twitter.png'))

yres, xres, _ = twitter.shape

for iy in range(yres):
    for ix in range(xres):
        if sum(twitter[iy,ix,0:3]) == 255 * 3:
            twitter[iy,ix,:] = 255
        else:
            twitter[iy,ix,:] = 0

# save the output image 
output_filename = '../contact/white-twitter.png'

im = Image.fromarray(twitter)

im.save(output_filename)


email = np.array(Image.open('../contact/black-email.png'))

yres, xres, _ = email.shape

for iy in range(yres):
    for ix in range(xres):
        if email[iy,ix,3]:
            email[iy,ix,:] = 255

# save the output image 
output_filename = '../contact/white-email.png'

im = Image.fromarray(email)

im.save(output_filename)


linkedin = np.array(Image.open('../contact/blue-linkedin.png'))

yres, xres, _ = linkedin.shape 

for iy in range(yres):
    for ix in range(xres):
        if linkedin[iy,ix,3]:
            linkedin[iy,ix,:] = 255

# save the output image 
output_filename = '../contact/white-linkedin.png'

im = Image.fromarray(linkedin)

im.save(output_filename)



google = np.array(Image.open('../contact/black-google.png'))

yres, xres, _ = google.shape 

for iy in range(yres):
    for ix in range(xres):
        if google[iy,ix,3]:
            google[iy,ix,:] = 255

# save the output image 
output_filename = '../contact/white-google.png'

im = Image.fromarray(google)

im.save(output_filename)