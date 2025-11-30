// Page loading functions
async function loadPage(pageName) {
    try {
        const response = await fetch(`pages/${pageName}.html`);
        const html = await response.text();
        document.getElementById('content-container').innerHTML = html;
    } catch (error) {
        document.getElementById('content-container').innerHTML = '<div class="p-6 text-red-600">Page non trouvée</div>';
    }
}

// Load home page when website starts
window.addEventListener('DOMContentLoaded', function () {
    loadPage('home');
});

// Sidebar dropdown functions
function toggleDropdown(name) {
    const dropdown = document.getElementById(name + '-dropdown');
    const arrow = document.getElementById(name + '-arrow');
    if (dropdown && arrow) {
        dropdown.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    }
}

// Search functionality
const tags = ['JavaFX', 'XAMPP', 'Symfony', 'Git'];

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const tagInput = document.getElementById('tagInput');
    const searchTerm = searchInput.value.trim();
    const tagTerm = tagInput.value.trim();

    if (searchTerm || tagTerm) {
        let message = '';

        if (searchTerm && tagTerm) {
            message = `Recherche combinée: Post "${searchTerm}" avec tag "${tagTerm}"`;
        } else if (searchTerm) {
            message = `Recherche de post: "${searchTerm}"`;
        } else if (tagTerm) {
            message = `Recherche par tag: "${tagTerm}"`;
        }

        console.log(message);
        alert(message);
    }

    document.getElementById('tagSuggestions').classList.add('hidden');
}

function showTagSuggestions() {
    const dropdown = document.getElementById('tagSuggestions');
    dropdown.classList.remove('hidden');
    filterTagSuggestions();
}

function filterTagSuggestions() {
    const input = document.getElementById('tagInput').value.toLowerCase();
    const tagList = document.getElementById('tagList');

    if (!input) {
        // Show all tags
        tagList.innerHTML = tags.map(tag => `
            <div onclick="selectTag('${tag}')"
                class="px-4 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between group">
                <span>${tag}</span>
                <span class="text-xs text-gray-400 group-hover:text-gray-600">${getTagCount(tag)} posts</span>
            </div>
        `).join('');
    } else {
        // Filter tags
        const filtered = tags.filter(tag => tag.toLowerCase().includes(input));
        if (filtered.length > 0) {
            tagList.innerHTML = filtered.map(tag => `
                <div onclick="selectTag('${tag}')"
                    class="px-4 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between group">
                    <span>${tag}</span>
                    <span class="text-xs text-gray-400 group-hover:text-gray-600">${getTagCount(tag)} posts</span>
                </div>
            `).join('');
        } else {
            tagList.innerHTML = '<div class="px-4 py-2 text-sm text-gray-500">Aucun tag trouvé</div>';
        }
    }
}

function getTagCount(tag) {
    const counts = {
        'JavaFX': 156,
        'XAMPP': 89,
        'Symfony': 124,
        'Git': 145,
    };
    return counts[tag] || Math.floor(Math.random() * 200) + 50;
}

function selectTag(tag) {
    const input = document.getElementById('tagInput');
    input.value = tag;
    document.getElementById('tagSuggestions').classList.add('hidden');
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('tagSuggestions');
    const tagInput = document.getElementById('tagInput');

    if (!event.target.closest('#tagInput') && !event.target.closest('#tagSuggestions')) {
        dropdown.classList.add('hidden');
    }
});