// Use event delegation for dynamically loaded content
document.addEventListener('click', function (event) {
    // Sort button
    if (event.target.closest('#sortButton')) {
        event.preventDefault();
        const dropdown = document.getElementById('sortDropdown');
        if (dropdown) dropdown.classList.toggle('hidden');
    }

    // Sort options
    if (event.target.closest('.sort-option')) {
        const option = event.target.closest('.sort-option');
        const value = option.getAttribute('data-value');
        document.getElementById('sortText').textContent = value;
        document.getElementById('sortDropdown').classList.add('hidden');
        console.log('Selected sort:', value);
    }

    // Type button
    if (event.target.closest('#typeButton')) {
        event.preventDefault();
        const dropdown = document.getElementById('typeDropdown');
        if (dropdown) dropdown.classList.toggle('hidden');
    }

    // Type options
    if (event.target.closest('.type-option')) {
        const option = event.target.closest('.type-option');
        const value = option.getAttribute('data-value');
        document.getElementById('typeText').textContent = value;
        document.getElementById('typeDropdown').classList.add('hidden');
        console.log('Selected type:', value);
    }
});

// Close dropdowns when clicking outside
document.addEventListener('click', function (event) {
    if (!event.target.closest('#sortButton') && !event.target.closest('#sortDropdown')) {
        const sortDropdown = document.getElementById('sortDropdown');
        if (sortDropdown) sortDropdown.classList.add('hidden');
    }

    if (!event.target.closest('#typeButton') && !event.target.closest('#typeDropdown')) {
        const typeDropdown = document.getElementById('typeDropdown');
        if (typeDropdown) typeDropdown.classList.add('hidden');
    }
});