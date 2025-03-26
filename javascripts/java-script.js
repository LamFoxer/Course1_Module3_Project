document.addEventListener("DOMContentLoaded", function() {

    // Анимация красного носа
    const nose = document.querySelector('.noseLeft');
    const nose2 = document.querySelector('.noseRight');
    const beigeCircle = document.querySelector('.beigeCircle');

    nose.addEventListener('click', function() {

        nose.style.animationPlayState = 'paused';
        nose.style.animation = 'shake 0.5s ease-in-out';
        nose.style.borderBottom = '4.8vw solid #a92724';

        // Анимация бежевого круга
        beigeCircle.style.animation = 'shake 0.5s ease-in-out';
        beigeCircle.style.backgroundColor = '#EC4E4C';

        setTimeout(function() {
            nose.style.animation = '';
            nose.style.borderBottom = '4.8vw solid #EC4E4C';

            beigeCircle.style.animation = '';
            beigeCircle.style.backgroundColor = '';
        }, 500);

        setTimeout(function() {
            nose.style.animationPlayState = 'running';
        }, 3000);
    });

    // Анимация синего носа
    nose2.addEventListener('click', function() {
        nose2.style.borderBottom = '3.2vw solid #8895fd';

        setTimeout(function() {
            nose2.style.borderBottom = '3.2vw solid #5065FF';
        }, 500);
    });

    // Анимация глаз
    let eye = document.querySelectorAll(".eyeLeft");
    
    window.addEventListener("mousemove", function(e) {
        eye.forEach(function(eye) {
            let rect = eye.getBoundingClientRect();
            let x = (e.pageX - rect.left) / 50 + "px";
            let y = (e.pageY - rect.top) / 50 + "px";
            eye.style.transform = "translate3d(" + x + "," + y + ", 0px)";
        });
    });
    
// АНИМАЦИЯ БУКВ

    // const letter = document.querySelectorAll('.letter');
    // const counterElement = document.querySelector('.counter');
    // let counter = 0;

    // letter.forEach(function(i) {
    //     i.addEventListener('click', function() {
    //         if (counter < 6 && !i.classList.contains('clicked')) {
    //             counter++;
    //             counterElement.textContent = counter;
    //             i.classList.add('clicked');
    //         }
    //     });
    // });

    

    // letters.forEach(function(i) {
    //     i.addEventListener('click', function() {
    //         findedLettersCounter++;
    //         counter.textContent = findedLettersCounter;
    //     });
    // });

    /*let letterS = document.querySelector("letterS");
    let letterH = document.querySelector(".letterH");
    let letterA = document.querySelector(".letterA");
    let letterD = document.querySelector(".letterD");
    let letterO = document.querySelector(".letterO");
    let letterW = document.querySelector(".letterW");*/

   
    

//СЧЁТЧИК

//Перетаскивания

    let dragableFigure = document.querySelectorAll(".flyingSquare, .flyingSquare2, .flyingTriangle, .flyingTriangle2, .flyingTriangle3, .flyingTriangle4, .flyingStar1, .flyingStar2");

    dragableFigure.forEach(function (dragable) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        dragable.addEventListener("mousedown", function (event) {
            isDragging = true;

            startX = event.clientX;
            startY = event.clientY;

            let transform = window.getComputedStyle(dragable).transform;

            if (transform !== "none") {
                let matrix = new DOMMatrix(transform);
                currentX = matrix.m41;
                currentY = matrix.m42;
            }

            function onMouseMove(event) {
                if (isDragging) {
                    offsetX = event.clientX - startX;
                    offsetY = event.clientY - startY;

                    dragable.style.transform = `translate(${currentX + offsetX}px, ${currentY + offsetY}px)`;
                }
            }

            function onMouseUp() {
                isDragging = false;

                currentX += offsetX;
                currentY += offsetY;

                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    });


    // ПОЛОТНО


    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#FFE0CB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;
    let currentTool = 'brush';
    let currentColor = '#030B18';
    let brushSize = 5;
    let markerSize = 10;
    let eraserSize = 20;

    const resetButton = document.querySelector('.resetButtonContainer');
    const brushButton = document.querySelector('.brush');
    const markerButton = document.querySelector('.marker');
    const eraserButton = document.querySelector('.eraser');
    const colorButtons = document.querySelectorAll('.ChoosingButton');

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    brushButton.addEventListener('click', function() {
        currentTool = 'brush';
        updateToolButtons(brushButton);
    });

    markerButton.addEventListener('click', function() {
        currentTool = 'marker';
        updateToolButtons(markerButton);
    });

    eraserButton.addEventListener('click', function() {
        currentTool = 'eraser';
        updateToolButtons(eraserButton);
    });

    colorButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const colorCircle = button.querySelector('.circleColour');
            currentColor = window.getComputedStyle(colorCircle).backgroundColor;
            updateColorButtons(button);
        });
    });

    resetButton.addEventListener('click', function() {
        ctx.fillStyle = '#FFE0CB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });


    function getCoordinates(e) {
        if (e.offsetX !== undefined && e.offsetY !== undefined) {
            return { x: e.offsetX, y: e.offsetY };
        }
        if (e.touches && e.touches[0]) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        return { x: 0, y: 0 };
    }
    
    canvas.addEventListener('touchmove', function(e) {
        if (isDrawing) {
            e.preventDefault();
        }
    }, { passive: false });

    function startDrawing(e) {
        e.preventDefault();
        isDrawing = true;
        const { x, y } = getCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    function draw(e) {
        e.preventDefault();
        if (!isDrawing) return;

        const { x, y } = getCoordinates(e);
        ctx.lineTo(x, y);
        // ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = currentTool === 'eraser' ? '#FFE0CB' : currentColor;
        ctx.lineWidth = currentTool === 'brush' ? brushSize : currentTool === 'marker' ? markerSize : eraserSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.closePath();
    }

    function updateToolButtons(activeButton) {
        const tools = [brushButton, markerButton, eraserButton];
        tools.forEach( function(tool) {
            tool.style.backgroundColor = tool === activeButton ? '#a92724' : '#EC4E4C';
        });
    }

    function updateColorButtons(activeButton) {
        colorButtons.forEach( function(button) {
            const colorCircle = button.querySelector('.circleColour');
            const circleSize = button === activeButton ? '1.6vw' : '1.25vw';
            colorCircle.style.width = circleSize;
            colorCircle.style.height = circleSize;
        });
    }

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
