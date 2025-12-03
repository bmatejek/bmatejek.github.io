---
---

window.addEventListener('load', CreateHikingSign);

function CreateHikingSign() {
    const hikes = [
        {% for hike in site.data.hiking %}
            '{{ hike.name }}',
        {% endfor %}
    ];

    const shuffled = shuffle(hikes);
    const nposts = 7;
    
    // Populate sign text and add click handlers
    for (let i = 0; i < nposts; i++) {
        const signId = `hiking-sign-rotation-0${i}`;
        const sign = $(`#${signId}`);
        sign.find(':first-child').text(shuffled[i]);
        sign.on('click', function() {
            // Remove selected class from all signs
            for (let j = 0; j < nposts; j++) {
                $(`#hiking-sign-rotation-0${j}`).removeClass('hiking-sign-selected');
            }
            // Add selected class to clicked sign
            $(`#${signId}`).addClass('hiking-sign-selected');
            PopulateHikingImages(shuffled[i]);
        });
    }

    // Select first sign and load images immediately
    $('#hiking-sign-rotation-00').addClass('hiking-sign-selected');
    PopulateHikingImages(shuffled[0], true);
}

function getTemplate(index) {
    const templates = {
        1: `{% include hiking/hiking-collage-01.html %}`,
        2: `{% include hiking/hiking-collage-02.html %}`,
        3: `{% include hiking/hiking-collage-03.html %}`,
        4: `{% include hiking/hiking-collage-04.html %}`,
        5: `{% include hiking/hiking-collage-05.html %}`,
        6: `{% include hiking/hiking-collage-06.html %}`,
        7: `{% include hiking/hiking-collage-07.html %}`
    };
    return templates[index];
}

function PopulateHikingImages(destination, isFirstLoad = false) {
    const url = destination.replace(/\s/g, "-");
    const dir = `/assets/images/hiking/images/${url}/`;
    
    const images = {
        '#hiking-forty-eight-by-twelve': '48x12.png',
        '#hiking-sixteen-by-twelve': '16x12.png',
        '#hiking-twenty-four-by-twelve': '24x12.png',
        '#hiking-eight-by-twelve': '8x12.png',
        '#hiking-thirty-two-by-twenty-four': '32x24.png',
        '#hiking-sixteen-by-twenty-four': '16x24.png'
    };

    const templateIndex = Math.floor(Math.random() * 7) + 1;
    const templateHtml = getTemplate(templateIndex);

    if (isFirstLoad) {
        // Load immediately without fade on first load
        $('#hiking-collage').html(templateHtml);
        for (const [id, filename] of Object.entries(images)) {
            $(`${id} :first-child`).css('background-image', `url(${dir}${filename})`);
        }
    } else {
        // Fade in/out for subsequent loads
        $('#hiking-collage').fadeTo('slow', 0, function() {
            $('#hiking-collage').html(templateHtml);
            
            for (const [id, filename] of Object.entries(images)) {
                $(`${id} :first-child`).css('background-image', `url(${dir}${filename})`);
            }
            
            $('#hiking-collage').fadeTo('slow', 1);
        });
    }
}