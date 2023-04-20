(() => {
    const gridContainer = document.querySelector('.grid');
    const modalButton = document.querySelector('.controls__show-modal');
    const modal = document.querySelector('.size-modal');
    const sizeForm = document.querySelector('.size-form');
    const colorPicker = document.getElementById('color');
    const darkenCheckbox = document.getElementById('darken');
    const randomCheckbox = document.getElementById('random-color');
    let color = colorPicker.value;
    let mouseDown = false;

    function renderGrid(containerElement, gridSize = 16) {
        containerElement.innerHTML = ''; // for re-render

        for (let i = 0; i < gridSize ** 2; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid__element');
            cell.dataset.brightness = '1';
            containerElement.append(cell);
        }
        gridContainer.dataset.size = gridSize.toString();
        gridContainer.style.fontSize = `${ 16 / gridSize }rem`
    }

    function resizeGrid(event) {
        if (event.submitter.getAttribute('formmethod')) return;

        const size = parseInt(this.size.value) || 16;
        renderGrid(gridContainer, size);
    }

    function draw(event) {
        const cell = event.target;

        if (!mouseDown || !cell.classList.contains('grid__element')) return;

        changeBrightness(cell);
        drawWithColor(cell);
    }

    function changeBrightness(element) {
        const newBrightnessValue = parseFloat(element.dataset.brightness) - 0.1;

        if (darkenCheckbox.checked) {
            element.style.filter = `brightness(${newBrightnessValue})`;
            element.dataset.brightness = newBrightnessValue.toFixed(2);
        } else {
            element.style.filter = `brightness(1)`;
            element.dataset.brightness = '1';
        }
    }

    function drawWithColor(element) {
        if (randomCheckbox.checked) {
            element.style.backgroundColor = getRandomColor();
        } else {
            element.style.backgroundColor = color;
        }
    }

    function getRandomColor() {
        const rgbOptions = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255
        };
        return `rgb(${rgbOptions.r} ${rgbOptions.g} ${rgbOptions.b})`;
    }

    function changeDrawColor() {
        color = this.value;
    }

    gridContainer.addEventListener('mousemove', draw);
    gridContainer.addEventListener('mousedown', ()=> mouseDown = true);
    gridContainer.addEventListener('mouseup', ()=> mouseDown = false);
    gridContainer.addEventListener('mouseleave', ()=> mouseDown = false);
    modalButton.addEventListener('click', () => modal.showModal());
    sizeForm.addEventListener('submit', resizeGrid);
    colorPicker.addEventListener('change', changeDrawColor);

    renderGrid(gridContainer);
})();