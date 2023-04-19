(() => {
    const gridContainer = document.querySelector('.grid');

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

    renderGrid(gridContainer);
})();