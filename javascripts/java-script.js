document.addEventListener("DOMContentLoaded", function() {

    const nose = document.querySelector('.noseLeft');
    const nose2 = document.querySelector('.noseRight');
    const beigeCircle = document.querySelector('.beigeCircle');

    nose.addEventListener('click', () => {
        // Анимация красного носа
        nose.style.animationPlayState = 'paused';
        nose.style.animation = 'shake 0.5s ease-in-out';
        nose.style.borderBottom = '4.8vw solid #a92724';

        setTimeout(() => {
            nose.style.animation = '';
            nose.style.borderBottom = '4.8vw solid #EC4E4C';
        }, 500);

        setTimeout(() => {
            nose.style.animationPlayState = 'running';
        }, 3000);

        // Анимация бежевого круга
        beigeCircle.style.animation = 'shake 0.5s ease-in-out';
        beigeCircle.style.backgroundColor = '#EC4E4C';

        setTimeout(() => {
            beigeCircle.style.animation = '';
            beigeCircle.style.backgroundColor = '';
        }, 500);
    });

    nose2.addEventListener('click', function() {
        // Анимация синего носа
        nose2.style.borderBottom = '3.2vw solid #8895fd';

        setTimeout(() => {
            nose2.style.borderBottom = '3.2vw solid #5065FF';
        }, 500);
    });

// АНИМАЦИЯ ГЛАЗ

    let eye = document.querySelectorAll(".eyeLeft");
    
    window.addEventListener("mousemove", (e) => {
        eye.forEach(function(eye) {
            let rect = eye.getBoundingClientRect();
            let x = (e.pageX - rect.left) / 50 + "px";
            let y = (e.pageY - rect.top) / 50 + "px";
            eye.style.transform = "translate3d(" + x + "," + y + ", 0px)";
        });
    });
    
// АНИМАЦИЯ БУКВ

    let letterS = document.querySelector(".letterS");

    /*function handleMouseMove(event){
        let eyes = document.querySelectorAll(".eye");
        eyes.forEach(function(eye){
            let rect = eye.getBoundingClientRect();
            //getBoundingClientRect - определяет размер элемента левый верхний х и y и правыйнижний
            let eyeX = rect.left + eye.clientWidth / 2;
            let eyeY = rect.top + eye.clientHeight / 2;
            // вычисляем угол между курсором и центром
            let radian = Math.atan2(event.clientX - eyeX, event.clientY - eyeY);
            let rotation = ( radian * (180 / Math.PI) * -1) + 180;
            //поворачиваем глаз в направлении курсора
            eye.style.transform = `rotate(${rotation}deg)`;
        });
    };

    let moveArea = document.querySelector(".move-area");
    moveArea.addEventListener("mousemove", handleMouseMove);

    function cursorColor(event){
        let cursor = document.querySelector(".cursor");
        cursor.style.left = `${event.clientX - 10}px`;
        cursor.style.top = `${event.clientX - 10}px`;

        document.addEventListener("mousemove", cursorColor);

    }*/
});
