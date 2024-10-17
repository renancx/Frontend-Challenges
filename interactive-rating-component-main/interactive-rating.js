function selectRatingNumber(numberId) {
    clearSelection();
    document.getElementById(numberId).classList.add('selected');
}

function clearSelection() {
    document.querySelectorAll('.rating-select').forEach(e => e.classList.remove('selected'));
}

function submitValue() {
    const selectedElement = document.querySelector('.selected');

    if (selectedElement) {
        const spanValue = selectedElement.querySelector('span').textContent;
        document.getElementById('rating-element').style.display = 'none';
        document.getElementById('after-element').style.display = 'flex';
        document.getElementById('selected-element').textContent = spanValue;
    } else {
        alert("Nenhum rating foi selecionado.");
    }
}

function getBack() {
    document.getElementById('rating-element').style.display = 'block'
    document.getElementById('after-element').style.display = 'none';
}