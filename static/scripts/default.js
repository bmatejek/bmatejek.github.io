function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

/* 
 * Javascript for home
 */

window.home_cube_rotation = 0;

function CreateHomeCube() {
    var home_cube_images = [
        '/static/images/home/profile-picture-01.png',
        '/static/images/home/profile-picture-02.png',
        '/static/images/home/profile-picture-03.png',
        '/static/images/home/profile-picture-04.png',
    ];

    home_cube_images = shuffle(home_cube_images);

    var home_cube_face_one = document.getElementById('home-cube-face-one');
    home_cube_face_one.src = home_cube_images[0];
    var home_cube_face_two = document.getElementById('home-cube-face-two');
    home_cube_face_two.src = home_cube_images[1];
    var home_cube_face_three = document.getElementById('home-cube-face-three');
    home_cube_face_three.src = home_cube_images[2];
    var home_cube_face_four = document.getElementById('home-cube-face-four');
    home_cube_face_four.src = home_cube_images[3];

    var home_cube = document.getElementById('home-cube');
    home_cube.onclick = function() {
        window.home_cube_rotation += 90;

        var home_cube_container = document.getElementById('home-cube-container');

        var t_str = 'rotateY(' + window.home_cube_rotation + 'deg)';

        home_cube.classList.add('spin');

        home_cube.style.transform = t_str;
        home_cube.style.mozTransform = t_str;

        home_cube_container.classList.add('blur');

        setTimeout(function() {
            home_cube_container.classList.remove('blur');
        }, 250);
    }
}



/*
 * Javascript for research
 */

function toggleBibtex(id)
{
	$(id).slideToggle(600);
}

/*
 * Javascript for hiking 
 */

function CreateHikingSign() {
    /* all of the possible hiking locations */
    var hikes = [
        'Cat Mountain',
        'Crater Lake',
        'Grand Canyon',
        'Grand Tetons',
        'Lonesome Lake',
        'Mount Mansfield',
        'Mount Moosilauke',
        'Sedona',
        'Sterling Pond', 
        'Stowe Pinnacle',
        'Yellowstone',
        'Zion', 
    ]

    /* number of signs on the hiking post */
    nsigns = 7;

    /* shuffle the hikes */
    hikes = shuffle(hikes);

    for (var iv = 0; iv < nsigns; ++iv) {
        var sign_id = '#hiking-sign-rotation-0' + iv;
        $(sign_id + ' :first-child').text(hikes[iv]);

        $(sign_id).click({hike: hikes[iv]}, function(event) {
            PopulateHikingImages(event.data.hike, false);
        });
    }

    PopulateHikingImages(hikes[0], true);
};

function PopulateHikingImages(destination, first_load) {
    var URL = destination.replace(/\s/g , "-");
    var directory = '/static/images/hiking/images/' + URL + '/';

    var fade_out_opacity = 0;
    var fade_in_opacity = 1;
    var delay_time = 250;

    var filenames = {
        '#hiking-forty-eight-by-twelve': directory + '48x12.png',
        '#hiking-sixteen-by-twelve': directory + '16x12.png',
        '#hiking-twenty-four-by-twelve': directory + '24x12.png',
        '#hiking-eight-by-twelve': directory + '8x12.png',
        '#hiking-thirty-two-by-twenty-four': directory + '32x24.png',
        '#hiking-sixteen-by-twenty-four': directory + '16x24.png',
    }

    var ntemplates = 7;

    if (first_load) {
        var template_index = Math.floor(Math.random() * ntemplates) + 1;
        console.log(template_index);
        var template_filename = 'templates/collage/hiking-collage-0' + template_index + '.html';

        $('#hiking-collage').load(template_filename, function() {
            for (const [div, filename] of Object.entries(filenames)) {
                $(div + ' :first-child').css('background-image', 'url(' + filename + ')');
            }
        });
    }
    else {
        $('#hiking-collage').fadeTo('slow', fade_out_opacity, function() {
            var template_index = Math.floor(Math.random() * ntemplates) + 1;
            console.log(template_index);
            var template_filename = 'templates/collage/hiking-collage-0' + template_index + '.html';

            $('#hiking-collage').load(template_filename, function() {
                for (const [div, filename] of Object.entries(filenames)) {
                    $(div + ' :first-child').css('background-image', 'url(' + filename + ')');
                }
            });
        }).delay(delay_time).fadeTo('slow', fade_in_opacity);
    }
}

function UpdateContent(page) {
    // the second function is the call back 
    $('#content').load(page, function() {
        // if loading the hiking page, update the signs 
        if (page == 'templates/home.html') {
            $('#content').css('background-image', 'url(/static/images/connectome-background.png)');
            
            CreateHomeCube();
        }
        if (page == 'templates/research.html') {
            $('#content').css('background-image', 'url(/static/images/connectome-background.png)');
            
        }
        if (page == 'templates/baseball.html') {
            $('#content').css('background-image', 'url()');
            
            GenerateBaseballImages();
        }
        if (page === 'templates/hiking.html') {
            $('#content').css('background-image', 'url()');

            CreateHikingSign();
        }
        if (page == 'templates/travels.html') {
            $('#content').css('background-image', 'url(/static/images/icons/world-background-dark.png)');

            GeneratePostCards();
        }
        if (page == 'templates/contact.html') {
            $('#content').css('background-image', 'url(/static/images/connectome-background.png)');
        }
    });    
};

$(function() {
    $('#header-content').load('templates/header.html');

    UpdateContent('templates/home.html');
});

/*
 * Javascript for baseball 
 */

var baseball_photos = [
    '/static/images/baseball/photos/ATL-1-reduced.png',
    '/static/images/baseball/photos/BOS-1-reduced.png',
    '/static/images/baseball/photos/BOS-2-reduced.png',
    '/static/images/baseball/photos/BOS-3-reduced.png',
    '/static/images/baseball/photos/BOS-4-reduced.png',
    '/static/images/baseball/photos/BOS-5-reduced.png',
    '/static/images/baseball/photos/CHI-1-reduced.png',
    '/static/images/baseball/photos/CHI-2-reduced.png',
    '/static/images/baseball/photos/CLE-1-reduced.png',
    '/static/images/baseball/photos/CLE-2-reduced.png',
    '/static/images/baseball/photos/DET-1-reduced.png',
    '/static/images/baseball/photos/DET-2-reduced.png',
    '/static/images/baseball/photos/DET-3-reduced.png',
    '/static/images/baseball/photos/DET-4-reduced.png',
    '/static/images/baseball/photos/MIA-1-reduced.png',
    '/static/images/baseball/photos/MIL-1-reduced.png',
    '/static/images/baseball/photos/MIL-2-reduced.png',
    '/static/images/baseball/photos/MTL-1-reduced.png',
    '/static/images/baseball/photos/MTL-2-reduced.png',
    '/static/images/baseball/photos/NYM-1-reduced.png',
    '/static/images/baseball/photos/PIT-1-reduced.png',
    '/static/images/baseball/photos/SF-1-reduced.png',
    '/static/images/baseball/photos/SF-2-reduced.png',
    '/static/images/baseball/photos/STL-1-reduced.png',
    '/static/images/baseball/photos/STL-2-reduced.png',
    '/static/images/baseball/photos/TB-1-reduced.png',
    '/static/images/baseball/photos/TOR-1-reduced.png',
]
var baseball_photo_index = 0;

function GenerateBaseballImages() {
    // function called each time the baseball page is loaded 

    // shuffle the array and reset the photo index 
    baseball_photos = shuffle(baseball_photos);
    baseball_photo_index = 0;

    // update the baseball photo 
    UpdateBaseballPhoto(true);
}

function BaseballPhotoClick() {
    // keep the photo index within the constraints of the array 
    baseball_photo_index = (baseball_photo_index + 1) % baseball_photos.length;

    // update the photo
    UpdateBaseballPhoto(false);
}


function ResizeBaseballPhoto() {
    // get the width of the baseball discussion in pixels 
    var discussion_width = $('#baseball-discussion').innerWidth();
    // the width is 37.75 rem
    var rem_to_pixel = discussion_width / 37.75;
    var pixel_to_rem = 1 / rem_to_pixel;

    // set a margin for wider images 
    var margin_left_in_rem = 1;
    var margin_top_in_rem = 1;

    // the maximum width guarantees no overflow from content 
    // provide 1rem of buffer on the left 
    var max_photo_width = $('#content').width() - discussion_width - margin_left_in_rem * rem_to_pixel;
    // height should not be greater than the discussion
    var max_photo_height = $('#baseball-discussion').innerHeight();

    var aspect_ratio = max_photo_width / max_photo_height;
    
    image_height = $('#baseball-photo').prop('naturalHeight');
    image_width = $('#baseball-photo').prop('naturalWidth');

    var photo_aspect_ratio = image_width / image_height;

    // if the photo is relatively wider, constrain its width
    if (photo_aspect_ratio > aspect_ratio) {
        $('#baseball-photo').width(max_photo_width);
        $('#baseball-photo').height('auto');
        $('#baseball-photo').css('margin-left', '1rem');

        // get the difference between the actual height and full height 
        var height_difference = max_photo_height - $('#baseball-photo').height();
    
        // ge the additional margin 
        var additional_margin_top = height_difference / 2;
    
        // get the new margin 
        var margin_top = margin_top_in_rem * rem_to_pixel + additional_margin_top;
    
        // convert the margin to rem 
        var margin_top_rem = margin_top * pixel_to_rem;
        $('#baseball-photo').css('margin-top', margin_top_rem + 'rem');
    }
    else {
        $('#baseball-photo').height(max_photo_height);
        $('#baseball-photo').width('auto');
        $('#baseball-photo').css('margin-top', '1rem');

        // get the difference between the actual width and full width
        var width_difference = max_photo_width - $('#baseball-photo').width();
        
        // get the additional margin
        var additional_margin_left = width_difference / 2;

        // get the new margin
        var margin_left = margin_left_in_rem * rem_to_pixel + additional_margin_left;
        
        // convert the margin to rem
        var margin_left_rem = margin_left * pixel_to_rem;
        $('#baseball-photo').css('margin-left', margin_left_rem + 'rem');
    }

    // force heights to be the same (fixes odd "off-by-three" error)
    $('.baseball-photo-frame').height($('.baseball-discussion-frame').height());
}


function UpdateBaseballPhoto(first_load) {
    
    if (first_load) {
        $('#baseball-photo').attr('src', baseball_photos[baseball_photo_index]).on('load', function() {
            ResizeBaseballPhoto();
        });
    }
    else {
        $('#baseball-photo').fadeOut('fast', function() {
            $('#baseball-photo').attr('src', baseball_photos[baseball_photo_index]).on('load', function() {
                ResizeBaseballPhoto();
                
                $(this).fadeIn('slow');
    
                // need to remove this event handler
                $(this).off();
            });
        });
    }
}

/*
 * Javascript for travels 
 */

function GeneratePostCards() {
    // set click functionality for the spot light post card 
    $('#post-card-spotlight').click(function() {
        $('#post-card-spotlight').fadeOut('slow');
    })

    var cities = [
        'Amsterdam',
        'Berlin',
        'Boston',
        'Israel',
        'Las Vegas',
        'Los Angeles',
        'Miami',
        'New York City',
        'Palestine',
        'Portland',
        'Quebec-City',
        'San Francisco',
        'Shenzhen',
        'Tokyo',
        'Vancouver',
    ]

    // randomize the cities 
    cities = shuffle(cities);

    // add the new picture for each postcard 
    var npostcards = 10;
    for (var iv = 0; iv < npostcards; ++iv) {
        // get the image filename
        var city = cities[iv];
        var filename = city.replace(/\s/g, "-");

        var postcard = '/static/images/travels/postcards/' + filename + '.png';

        // get the class name
        var class_name = '.post-card-' + (iv + 1).toString().padStart(3, '0');

        $(class_name).css('background-image', 'url(' + postcard + ')');
      
        $(class_name).click(function() {
            var background_image = $(this).css('background-image');

            // function depends on if the spotlight is visible
            // if the spotlight does not exist 
            if ($('#post-card-spotlight').is(':hidden')) {

                $(this).fadeOut('slow', function() {
                    // change the background and then fade in 
                    $('#post-card-spotlight').css('background-image', background_image);

                    $('#post-card-spotlight').fadeIn('slow');
                });
            }
            // if the spotlight does exist 
            else {
                $(this).fadeOut('slow');

                // fade to opacity 0, change the background, and then fade in
                $('#post-card-spotlight').fadeTo('slow', 0, function() {
                    $('#post-card-spotlight').css('background-image', background_image);
                }).fadeTo('slow', 1);
            } 
        });
    }
}