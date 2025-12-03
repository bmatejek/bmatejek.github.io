---
---

// run GenerateBaseballImages once
window.addEventListener('load', GenerateBaseballImages);

var baseball_photo_index = 0;

let baseball_photos = [
    {% for file in site.static_files %}
        {% if file.path contains '/assets/images/baseball/photos/' and file.name contains 'reduced' and file.extname == '.png' %}
            "{{ file.path | relative_url }}",
        {% endif %}
    {% endfor %}
]

function GenerateBaseballImages() {
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
    var discussion_width = $('#baseball-discussion-frame').innerWidth();
    
    // the width is 26.75 rem
    var rem_to_pixel = discussion_width / 26.75;
    var pixel_to_rem = 1 / rem_to_pixel;
    // padding of the discussion in rem
    var discussion_padding = 1;

    // set a margin for wider images 
    var margin_top_in_rem = 1;

    // the maximum width guarantees no overflow from content 
    // provide 1rem of buffer on the left 
    var max_photo_width = $('#content').width() - discussion_width;
    // height should not be greater than the discussion
    // add a small 0.25rem padding (split as margin on top and bottom) so that 
    // resizes don't cause a flicker in the rest of the page
    var max_photo_height = $('#baseball-discussion').innerHeight() - 0.25 * rem_to_pixel;

    var aspect_ratio = max_photo_width / max_photo_height;
    
    image_height = $('#baseball-photo').prop('naturalHeight');
    image_width = $('#baseball-photo').prop('naturalWidth');
    
    var photo_aspect_ratio = image_width / image_height;

    // if the photo is relatively wider, constrain its width
    if (photo_aspect_ratio > aspect_ratio) {
        $('#baseball-photo').width(max_photo_width);
        $('#baseball-photo').height('auto');
        // reset margin-left from previous iterations
        $('#baseball-photo').css('margin-left', '0rem');

        // get the difference between the actual height and full height 
        var height_difference = max_photo_height - $('#baseball-photo').height();
    
        // ge the additional margin 
        var additional_margin_top = height_difference / 2;
    
        // get the new margin (include the margin to match the discussion)
        var margin_top = margin_top_in_rem * rem_to_pixel + additional_margin_top;
    
        // convert the margin to rem 
        var margin_top_rem = margin_top * pixel_to_rem + 0.125;
        $('#baseball-photo').css('margin-top', margin_top_rem + 'rem');
    }
    else {
        $('#baseball-photo').height(max_photo_height);
        $('#baseball-photo').width('auto');
        // reset margin-top from previous iterations
        $('#baseball-photo').css('margin-top', '1.125rem');

        // get the difference between the actual width and full width
        var width_difference = max_photo_width - $('#baseball-photo').width();

        // get the additional margin
        var additional_margin_left = width_difference / 2;

        // get the new margin
        var margin_left = additional_margin_left;
        
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