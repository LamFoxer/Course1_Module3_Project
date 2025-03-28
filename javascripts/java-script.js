document.addEventListener("DOMContentLoaded", function() {

    // АНИМАЦИЯ ХВАТАНИЯ ЗА КРАСНЫЙ НОС

    const nose = document.querySelector('.noseLeft');
    const nose2 = document.querySelector('.noseRight');
    const beigeCircle = document.querySelector('.beigeCircle');

    nose.addEventListener('click', function() {

        nose.style.animationPlayState = 'paused';
        nose.style.animation = 'shake 0.5s ease-in-out';
        nose.style.borderBottom = '4.8vw solid #a92724';

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

    // АНИМАЦИЯ ХВАТАНИЯ ЗА СИНИЙ НОС

    nose2.addEventListener('click', function() {
        nose2.style.borderBottom = '3.2vw solid #8895fd';

        setTimeout(function() {
            nose2.style.borderBottom = '3.2vw solid #5065FF';
        }, 500);
    });

    // АНИМАЦИЯ ДВИЖЕНИЯ ГЛАЗА ЗА МЫШКОЙ
    
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

    const letters = document.querySelectorAll('.letter');
    const counterElement = document.querySelector('.counter');
    let counter = 0;
    
    letters.forEach(function(letter) {
        letter.addEventListener('click', function() {
            if (!this.classList.contains('clicked')) {
                this.style.color = '#030B18';
                this.classList.add('clicked');
                counter++;
                counterElement.textContent = counter;

                if (counter === letters.length) {
                    document.querySelectorAll('.letter').forEach(function(l) {
                        l.style.opacity = '0%';
                        l.style.transition = 'opacity 1s ease';
                    });
                    setTimeout(function() {
                        alert('Congratulations! You have received a promo code for a 25% discount — SHADOW.');
                    }, 300);
                }
            }
        });
    });

    // ХОЛСТ

    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');

    let isDrawing = false;
    let currentTool = 'brush';
    let currentColor = '#030B18';
    let brushSize = 5;
    let markerSize = 10;
    let eraserSize = 20;
    let drawingData = [];

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
            draw(e);
        }
    }, { passive: false });

    function startDrawing(e) {
        e.preventDefault();
        isDrawing = true;
        const { x, y } = getCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    function draw(e) {
        e.preventDefault();
        if (!isDrawing) return;
    
        const { x, y } = getCoordinates(e);

        drawingData.push({
            x, y,
            tool: currentTool,
            color: currentTool === 'eraser' ? '#FFE0CB' : currentColor,
            size: currentTool === 'brush' ? brushSize : currentTool === 'marker' ? markerSize : eraserSize,
            type: 'draw'
        });

        ctx.lineTo(x, y);
        ctx.strokeStyle = currentTool === 'eraser' ? '#FFE0CB' : currentColor;
        ctx.lineWidth = currentTool === 'brush' ? brushSize : currentTool === 'marker' ? markerSize : eraserSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
        // ctx.closePath();
    }

    function updateToolButtons(activeButton) {
        const tools = [brushButton, markerButton, eraserButton];
        tools.forEach( function(tool) {
            tool.style.backgroundColor = tool === activeButton ? '#a92724' : '#EC4E4C';
        });
    }

    function updateColorButtons(activeButton) {
        colorButtons.forEach(function(button) {
            const colorCircle = button.querySelector('.circleColour');
            const circleSize = button === activeButton ? '2.3vw' : '1.25vw';
            colorCircle.style.width = circleSize;
            colorCircle.style.height = circleSize;
        });
        const defaultBlackButton = document.querySelector('.blackColour').closest('.ChoosingButton');
        if (!currentColor || currentColor === 'rgb(3, 11, 24)' || currentColor === '#030B18') {
            updateColorButtons(defaultBlackButton);
        }
    }

    function resizeCanvas() {
        const canvas = document.querySelector('.canvas');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.fillStyle = '#FFE0CB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('load', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

// 

    const saveButton = document.querySelector('.saveButtonContainer');
    const beigeSquare = document.querySelector('.s4-beigeSquare');
    const loadButton = document.querySelector('.loadButtonContainer');

    function saveDrawing() {
        const dataURL = canvas.toDataURL('image/png');
        localStorage.setItem('savedCanvas', dataURL);
        // alert('Рисунок сохранён!');
    }

    function loadDrawing() {
        const savedCanvas = localStorage.getItem('savedCanvas');
        if (savedCanvas) {
            beigeSquare.style.backgroundImage = `url(${savedCanvas})`;
            beigeSquare.style.backgroundSize = 'cover';
            beigeSquare.style.backgroundRepeat = 'no-repeat';
            beigeSquare.style.backgroundPosition = 'center';
            // alert('Рисунок загружен!');
        } else {
            alert('Нет сохранённого рисунка!');
        }
    }

    saveButton.addEventListener('click', saveDrawing);
    loadButton.addEventListener('click', loadDrawing);


    //АНИМАЦИЯ ЗА КУРСОРОМ


    const canvasContainer = document.querySelector('.canvas2');
    if (!canvasContainer) return;

    const canvas3 = document.createElement('canvas');
    canvasContainer.appendChild(canvas3);
    const ctx2 = canvas3.getContext('2d');

    function resizeCanvas2() {
        canvas3.width = canvasContainer.clientWidth;
        canvas3.height = canvasContainer.clientHeight;
    }
    resizeCanvas2();
    window.addEventListener('resize', resizeCanvas2);

    let particles = [];
    let mouseX = null;
    let mouseY = null;

    canvasContainer.addEventListener('mousemove', function(e2) {
        const rect2 = canvas3.getBoundingClientRect();
        mouseX = e2.clientX - rect2.left;
        mouseY = e2.clientY - rect2.top;

        if (mouseX >= 0 && mouseY >= 0 && mouseX <= canvas3.width && mouseY <= canvas3.height) {
            for (let i = 0; i < 3; i++) {
                particles.push({
                    x: mouseX,
                    y: mouseY,
                    size: Math.random() * 5 + 1,
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1,
                    life: 100
                });
            }
        }
    });

    canvasContainer.addEventListener('mouseleave', function() {
        mouseX = null;
        mouseY = null;
    });

    function animate() {
        ctx2.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx2.fillRect(0, 0, canvas3.width, canvas3.height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx2.fillStyle = p.color;
            ctx2.beginPath();
            ctx2.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx2.fill();

            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;

            if (p.life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
    
        currentColor = '#030B18';
        const defaultBlackButton = document.querySelector('.blackColour').closest('.ChoosingButton');
        updateColorButtons(defaultBlackButton);
});
