def ConvertColor(hex):
	r = int(hex[0:2], 16)
	g = int(hex[2:4], 16)
	b = int(hex[4:6], 16)

	return [r, g, b]


# get the light and dark colors for the web design 
def ReadWebsiteColors():
    variables_filename = 'static/css/abstracts/_variables.scss'
    with open(variables_filename, 'r') as fd:
        for variable in fd.readlines():
            variable, color = variable.strip('$;').split(': #')

            if variable == 'color-dark':
                color_dark = ConvertColor(color)
            elif variable == 'color-light':
                color_light = ConvertColor(color)

    return color_dark, color_light