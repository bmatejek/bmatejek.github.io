// run GenerateBaseballImages once
window.addEventListener('load', CreateHomeCube);

window.home_cube_rotation = 0;

function CreateHomeCube() {
    var home_cube_images = [
        '/assets/images/home/profile-picture-01.png',
        '/assets/images/home/profile-picture-02.png',
        '/assets/images/home/profile-picture-03.png',
        '/assets/images/home/profile-picture-04.png',
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