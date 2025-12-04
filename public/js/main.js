async function loadPage(pageName) {
  try {
    const response = await fetch(`pages/${pageName}.html`);
    if (!response.ok) throw new Error("Page introuvable");

    const html = await response.text();
    document.getElementById('content-container').innerHTML = html;

    // Initialiser les fonctionnalités après chargement
    initIaChat();
    initFqaSearch();
    
    // Si on charge la page results, afficher les résultats filtrés
    if (pageName === 'results') {
      displayResults(currentFilter);
      initResultsSearch(); // ← AJOUTE CETTE LIGNE
    }

  } catch (error) {
    document.getElementById('content-container').innerHTML =
      '<div class="p-6 text-red-600">Page non trouvée</div>';
  }
}



// Chargement initial
window.addEventListener('DOMContentLoaded', function () {
  loadPage('profile');
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

    if (dropdown && tagInput) {
        if (!event.target.closest('#tagInput') && !event.target.closest('#tagSuggestions')) {
            dropdown.classList.add('hidden');
        }
    }
});


// ==========================================
// CHATBOT IA
// ==========================================
function initIaChat() {
  const toggle = document.getElementById('ia-toggle');
  const chat = document.getElementById('ia-chat');
  const close = document.getElementById('ia-close');
  const input = document.getElementById('ia-input');
  const send = document.getElementById('ia-send');
  const messages = document.getElementById('ia-messages');


  if (!toggle || !chat) return;


  // Ouvrir le chat
  toggle.onclick = function() {
    if (chat.style.display === 'none' || chat.style.display === '') {
      chat.style.display = 'flex';
      input.focus();
    } else {
      chat.style.display = 'none';
    }
  };


  // Fermer le chat
  if (close) {
    close.onclick = function() {
      chat.style.display = 'none';
    };
  }


  // Envoyer un message
  function envoyerMessage() {
    const texte = input.value.trim();
    if (!texte) return;


    // Message utilisateur
    const userDiv = document.createElement('div');
    userDiv.style.cssText = 'display: flex; gap: 8px; justify-content: flex-end;';
    userDiv.innerHTML = `
      <div style="background: #C51718; color: white; padding: 8px 12px; border-radius: 12px; max-width: 80%; font-size: 13px;">${texte}</div>
      <div style="width: 32px; height: 32px; background: #9ca3af; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; flex-shrink: 0;">U</div>
    `;
    messages.appendChild(userDiv);


    input.value = '';
    messages.scrollTop = messages.scrollHeight;


    // Réponse IA après 1 seconde
    setTimeout(function() {
      const reponse = getReponseIA(texte);
      const iaDiv = document.createElement('div');
      iaDiv.style.cssText = 'display: flex; gap: 8px;';
      iaDiv.innerHTML = `
        <div style="width: 32px; height: 32px; background: #C51718; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; flex-shrink: 0;">IA</div>
        <div style="background: white; padding: 8px 12px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 80%; font-size: 13px; color: #374151;">${reponse}</div>
      `;
      messages.appendChild(iaDiv);
      messages.scrollTop = messages.scrollHeight;
    }, 1000);
  }


  function getReponseIA(question) {
    const q = question.toLowerCase();
    if (q.includes('javafx') || q.includes('java')) return "Pour JavaFX, vérifie les modules et utilise --module-path.";
    if (q.includes('xampp') || q.includes('apache')) return "Vérifie le port 80, parfois Skype/IIS l'utilisent.";
    if (q.includes('symfony') || q.includes('bdd')) return "Vérifie DATABASE_URL dans .env puis lance migrate.";
    return "Peux-tu préciser ton problème ?";
  }


  // Bouton envoyer
  if (send) {
    send.onclick = envoyerMessage;
  }


  // Touche Entrée
  if (input) {
    input.onkeydown = function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        envoyerMessage();
      }
    };
  }
  
}


// ==========================================
// RECHERCHE FQA
// ==========================================
function initFqaSearch() {
  const searchInput = document.getElementById('fqa-search');
  if (!searchInput) return;


  searchInput.oninput = function() {
    const value = this.value.toLowerCase().trim();
    const cards = document.querySelectorAll('article');


    cards.forEach(function(card) {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
      const match = title.includes(value) || desc.includes(value);
      card.style.display = (match || value === '') ? '' : 'none';
    });
  };
}


// ==========================================
// FILTRES FQA
// ==========================================
function removeFilter(button, filterName) {
  button.remove();
  applyFilters();
}

function applyFilters() {
  const activeFilters = document.querySelectorAll('#active-filters .filter-tag');
  const cards = document.querySelectorAll('article[data-tags]');
  
  if (activeFilters.length === 0) {
    cards.forEach(card => card.style.display = '');
    return;
  }
  
  const filters = Array.from(activeFilters).map(btn => btn.dataset.filter);
  
  cards.forEach(card => {
    const cardTags = card.dataset.tags.toLowerCase();
    const match = filters.some(filter => cardTags.includes(filter));
    card.style.display = match ? '' : 'none';
  });
}

// ==========================================
// CHARGER LA PAGE RÉSULTATS AVEC FILTRE
// ==========================================
let currentFilter = null;

function loadResultsPage(filter) {
  currentFilter = filter;
  loadPage('results');
}
// ==========================================
// AFFICHER LES RÉSULTATS FILTRÉS
// ==========================================
function displayResults(filter) {
  const resultsData = {
    'javafx': {
      titre: 'Résultats pour JavaFX',
      count: 3,
      results: [
        {
          titre: 'JavaFX Application ne démarre pas après build',
          auteur: 'Hayfa Khadraoui',
          date: 'Il y a 5 jours',
          tags: ['JavaFX', 'Build'],
          votes: 15
        },
        {
          titre: 'Problème de module JavaFX introuvable',
          auteur: 'Ahmed Ben Salem',
          date: 'Il y a 2 semaines',
          tags: ['JavaFX', 'Module'],
          votes: 23
        },
        {
          titre: 'Erreur de lancement SceneBuilder',
          auteur: 'Sarah Mansour',
          date: 'Il y a 3 semaines',
          tags: ['JavaFX', 'SceneBuilder'],
          votes: 18
        }
      ]
    },
    'symfony-bdd': {
      titre: 'Résultats pour Symfony BDD',
      count: 2,
      results: [
        {
          titre: 'Connexion MySQL refusée dans Symfony',
          auteur: 'Mohamed Trabelsi',
          date: 'Il y a 1 semaine',
          tags: ['Symfony', 'MySQL'],
          votes: 31
        },
        {
          titre: 'Erreur migration Doctrine',
          auteur: 'Ines Gharbi',
          date: 'Il y a 2 jours',
          tags: ['Symfony', 'Doctrine'],
          votes: 12
        }
      ]
    },
    'xampp': {
      titre: 'Résultats pour XAMPP',
      count: 2,
      results: [
        {
          titre: 'Configuration XAMPP sur Windows 11',
          auteur: 'Yosra Ben Ali',
          date: 'Il y a 1 semaine',
          tags: ['XAMPP', 'Config'],
          votes: 31
        },
        {
          titre: 'Apache ne démarre pas sur port 80',
          auteur: 'Karim Bouaziz',
          date: 'Il y a 4 jours',
          tags: ['XAMPP', 'Apache'],
          votes: 27
        }
      ]
    },
    'erreur-500': {
      titre: 'Résultats pour Erreur 500',
      count: 2,
      results: [
        {
          titre: 'Erreur 500 après mise à jour Symfony',
          auteur: 'Mariem Jebali',
          date: 'Il y a 3 jours',
          tags: ['Symfony', 'Erreur 500'],
          votes: 19
        },
        {
          titre: 'Internal Server Error PHP',
          auteur: 'Anis Ghorbel',
          date: 'Il y a 1 semaine',
          tags: ['PHP', 'Erreur 500'],
          votes: 22
        }
      ]
    }
  };

  const data = resultsData[filter] || resultsData['javafx'];
  
  // Mettre à jour le titre
  const headerTitle = document.querySelector('header h1');
  if (headerTitle) headerTitle.textContent = data.titre;
  
  const headerSubtitle = document.querySelector('header p');
  if (headerSubtitle) headerSubtitle.textContent = `${data.count} solutions trouvées`;

  // Mettre à jour les résultats
  const resultsContainer = document.querySelector('section:last-of-type');
  if (!resultsContainer) return;

  let html = '<h2 class="text-lg font-semibold font-poppins text-brand-black mb-4">Résultats</h2>';
  
  data.results.forEach(result => {
  html += `
    <article class="bg-white rounded-2xl border p-4 flex items-start gap-4 mb-4">
      <div class="flex-1">
        <h3 class="font-semibold font-poppins text-brand-black mb-1">${result.titre}</h3>
        <div class="flex items-center gap-2 text-sm text-gray-500 font-redhat mb-2">
          <span>${result.auteur}</span>
          <span>•</span>
          <span>${result.date}</span>
        </div>
        <div class="flex gap-2">
          ${result.tags.map(tag => `
            <span class="px-3 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-redhat">${tag}</span>
          `).join('')}
        </div>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button onclick="togglePin(this)" class="text-2xl transition hover:scale-110" title="Épingler">
          📌
        </button>
        <span class="text-sm font-semibold vote-count">${result.votes}</span>
        <button onclick="toggleStar(this)" class="text-2xl transition hover:scale-110" title="Ajouter aux favoris">
          ⭐
        </button>
      </div>
    </article>
  `;
});


  resultsContainer.innerHTML = html;
}
// ==========================================
// RECHERCHE DANS LES RÉSULTATS
// ==========================================
function initResultsSearch() {
  const searchInput = document.querySelector('input[placeholder="Recherche par filtre"]');
  if (!searchInput) return;

  searchInput.oninput = function() {
    const value = this.value.toLowerCase().trim();
    const articles = document.querySelectorAll('section:last-of-type article');

    articles.forEach(function(article) {
      const titre = article.querySelector('h3')?.textContent.toLowerCase() || '';
      const auteur = article.querySelector('.text-gray-500')?.textContent.toLowerCase() || '';
      const tags = Array.from(article.querySelectorAll('.bg-red-100'))
        .map(tag => tag.textContent.toLowerCase())
        .join(' ');
      
      const match = titre.includes(value) || auteur.includes(value) || tags.includes(value);
      article.style.display = (match || value === '') ? '' : 'none';
    });
  };
}
// ==========================================
// ÉPINGLER UN POST
// ==========================================
function togglePin(button) {
  const isPinned = button.classList.contains('pinned');
  
  if (isPinned) {
    button.classList.remove('pinned');
    button.style.filter = 'grayscale(0%)';
    button.title = 'Épingler';
  } else {
    button.classList.add('pinned');
    button.style.filter = 'grayscale(0%) brightness(1.2)';
    button.title = 'Désépingler';
  }
  
  // Animation
  button.style.transform = 'scale(1.3)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 200);
}

// ==========================================
// AJOUTER AUX FAVORIS (ÉTOILE)
// ==========================================
function toggleStar(button) {
  const article = button.closest('article');
  const voteCount = article.querySelector('.vote-count');
  const isStarred = button.classList.contains('starred');
  
  if (isStarred) {
    button.classList.remove('starred');
    button.textContent = '⭐';
    button.style.filter = 'grayscale(100%)';
    button.title = 'Ajouter aux favoris';
    
    // Décrémenter le vote
    let count = parseInt(voteCount.textContent);
    voteCount.textContent = count - 1;
  } else {
    button.classList.add('starred');
    button.textContent = '⭐';
    button.style.filter = 'grayscale(0%)';
    button.title = 'Retirer des favoris';
    
    // Incrémenter le vote
    let count = parseInt(voteCount.textContent);
    voteCount.textContent = count + 1;
  }
  
  // Animation
  button.style.transform = 'scale(1.3)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 200);
}
