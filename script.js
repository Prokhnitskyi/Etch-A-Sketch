(() => {
    const gridContainer = document.querySelector('.grid');
    const modalButton = document.querySelector('.controls__show-modal');
    const modal = document.querySelector('.size-modal');
    const sizeForm = document.querySelector('.size-form');
    const darkenCheckbox = document.getElementById('darken');
    const randomCheckbox = document.getElementById('random-color');
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
        const newBrightnessValue = parseFloat(cell.dataset.brightness) - 0.1;

        if (!mouseDown || !cell.classList.contains('grid__element')) return;

        if (darkenCheckbox.checked) {
            cell.style.filter = `brightness(${newBrightnessValue})`;
            cell.dataset.brightness = newBrightnessValue.toFixed(2);
        }

        if (randomCheckbox.checked) {
            cell.style.backgroundColor = getRandomColor();
        } else {
            cell.style.backgroundColor = `rgb(0 0 0)`;
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

    gridContainer.addEventListener('mousemove', draw);
    gridContainer.addEventListener('mousedown', ()=> mouseDown = true);
    gridContainer.addEventListener('mouseup', ()=> mouseDown = false);
    gridContainer.addEventListener('mouseleave', ()=> mouseDown = false);
    modalButton.addEventListener('click', () => modal.showModal());
    sizeForm.addEventListener('submit', resizeGrid);

    renderGrid(gridContainer);
})();