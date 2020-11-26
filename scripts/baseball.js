var photos = [
    'images/baseball/photos/ATL-1-reduced.png',
    'images/baseball/photos/BOS-1-reduced.png',
    'images/baseball/photos/BOS-2-reduced.png',
    'images/baseball/photos/BOS-3-reduced.png',
    'images/baseball/photos/BOS-4-reduced.png',
    'images/baseball/photos/BOS-5-reduced.png',
    'images/baseball/photos/CHI-1-reduced.png',
    'images/baseball/photos/CHI-2-reduced.png',
    'images/baseball/photos/CLE-1-reduced.png',
    'images/baseball/photos/CLE-2-reduced.png',
    'images/baseball/photos/DET-1-reduced.png',
    'images/baseball/photos/DET-2-reduced.png',
    'images/baseball/photos/DET-3-reduced.png',
    'images/baseball/photos/DET-4-reduced.png',
    'images/baseball/photos/MIA-1-reduced.png',
    'images/baseball/photos/MIL-1-reduced.png',
    'images/baseball/photos/MIL-2-reduced.png',
    'images/baseball/photos/MTL-1-reduced.png',
    'images/baseball/photos/MTL-2-reduced.png',
    'images/baseball/photos/NYM-1-reduced.png',
    'images/baseball/photos/PIT-1-reduced.png',
    'images/baseball/photos/SF-1-reduced.png',
    'images/baseball/photos/SF-2-reduced.png',
    'images/baseball/photos/STL-1-reduced.png',
    'images/baseball/photos/STL-2-reduced.png',
    'images/baseball/photos/TB-1-reduced.png',
    'images/baseball/photos/TOR-1-reduced.png',
]

// can shuffle through images by clicking
var photo_index = 0;

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function update_photo() {
    $('#baseball-photo').fadeOut('fast', function() {
        $('#baseball-photo').attr('src', photos[photo_index]).on('load', function() {
            var height = $('#baseball-photo').height();
            var width  = $('#baseball-photo').width();

            // get mapping from rem to pixels and vice versa
            var rem_to_pixel = $('#baseball-discussion').width() / 35.75;
            var pixel_to_rem = 1 / rem_to_pixel;

            // state parameters for max photo dimensions in pixels
            var max_photo_width = 24.875 * rem_to_pixel;
            var max_photo_height = $('#baseball-discussion').height();

            // get the aspect ratio between the width and the height
            var aspect_ratio = max_photo_width / max_photo_height;

            image_height = $('#baseball-photo').prop('naturalHeight');
            image_width = $('#baseball-photo').prop('naturalWidth');

            var photo_aspect_ratio = image_width / image_height;

            // if the photo is relatively wider, constrain its width
            if (photo_aspect_ratio > aspect_ratio) {
                $('#baseball-photo').width('24.875rem');
                $('#baseball-photo').height('auto');
                $('#baseball-photo').css('margin-left', '0.875rem');
            }
            else {
                $('#baseball-photo').height(max_photo_height);
                $('#baseball-photo').width('auto');

                // get the difference between the actual width and full width
                var width_difference = max_photo_width - $('#baseball-photo').width();
                // get the additional margin
                var additional_margin_left = width_difference / 2;
                // get the new margin
                var margin_left = 0.875 * rem_to_pixel + additional_margin_left;
                // convert the margin to rem
                var margin_left_rem = margin_left * pixel_to_rem;
                $('#baseball-photo').css('margin-left', margin_left_rem + 'rem');
            }

            $(this).fadeIn('slow');

            // need to remove this event handler
            $(this).off();
        });
    });
}

window.onload = function() {
    // randomize the array
    shuffleArray(photos);

    // update the photo
    update_photo();
};

function photo_div_click ()
{
    // keep the photo index with the constraints of the array
    photo_index = (photo_index + 1) % photos.length;

    // update the photo
    update_photo();
}
