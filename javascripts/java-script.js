document.addEventListener("DOMContentLoaded", function() {

    function handleMouseMove(event){
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

    }
});
