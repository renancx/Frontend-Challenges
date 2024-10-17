function selectRatingNumber(numberId) {
    clearSelection();

    var selectedNumber = document.getElementById(numberId);

    selectedNumber.classList.add('selected');
}

function clearSelection() {
    document.querySelectorAll('.rating-select').forEach(e => {
        e.classList.remove('selected');
    });
}