(() => {
    const gridContainer = document.querySelector('.grid');
    let mouseDown = false;

    function renderGrid(containerElement, gridSize = 16) {
        containerElement.innerHTML = ''; // for re-render

        for (let i = 0; i < gridSize ** 2; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid__element');
            containerElement.append(cell);
        }
        gridContainer.dataset.size = gridSize.toString();
        gridContainer.style.fontSize = `${16 / gridSize}rem`
    }

    function draw(event) {
        if (!mouseDown || !event.target.classList.contains('grid__element')) return;
        event.target.style.backgroundColor = `rgb(0 0 0)`;
    }

    gridContainer.addEventListener('mousemove', draw);
    gridContainer.addEventListener('mousedown', ()=> mouseDown = true);
    gridContainer.addEventListener('mouseup', ()=> mouseDown = false);
    gridContainer.addEventListener('mouseleave', ()=> mouseDown = false);

    renderGrid(gridContainer);
})();