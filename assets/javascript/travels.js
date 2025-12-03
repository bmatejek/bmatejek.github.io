---
---

window.addEventListener('load', GeneratePostCards);

function GeneratePostCards() {
    $('#content').css('background-image', 'url(/assets/images/travels/world-background-dark.png)');
    
    // set click functionality for the spot light post card 
    $('#post-card-spotlight').click(function() {
        $('#post-card-spotlight').fadeOut('slow');
    })

    const cities = [
        {% for place in site.data.travels %}
            '{{ place.name }}'{% unless forloop.last %},{% endunless %}
        {% endfor %}
    ];

    // randomize the cities 
    const shuffled = shuffle(cities);

    // add the new picture for each postcard 
    var npostcards = 10;
    for (var iv = 0; iv < npostcards; ++iv) {
        // get the image filename
        var city = shuffled[iv];
        var filename = city.replace(/\s/g, "-");

        var postcard = '/assets/images/travels/postcards/' + filename + '.png';

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