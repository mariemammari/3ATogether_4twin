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

























































// ==========================================
// CHATBOT IA
// ==========================================
function initIaChat() {
}


// ==========================================
// RECHERCHE FQA
// ==========================================
function initFqaSearch() {
}


// ==========================================
// FILTRES FQA
// ==========================================
function removeFilter(button, filterName) {
  button.remove();
  applyFilters();
}

function applyFilters() {
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
    button.style.filter = 'grayscale(50%)';
    button.title = 'Épingler';
  } else {
    button.classList.add('pinned');
    button.style.filter = 'grayscale(0%) brightness(1.5) drop-shadow(0 0 8px rgba(197, 23, 24, 0.5))';
    button.title = 'Désépingler';
  }
  
  // Animation
  button.style.transform = 'scale(1.3) rotate(15deg)';
  setTimeout(() => {
    button.style.transform = 'scale(1) rotate(0deg)';
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

// ==========================================
// INITIALISER LA MODAL VIDÉO
// ==========================================
function initVideoModal() {
  // Créer la modal si elle n'existe pas
  if (!document.getElementById('video-modal')) {
    const modalHTML = `
      <div id="video-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 99999; align-items: center; justify-content: center;">
        <div style="position: relative; width: 90%; max-width: 900px;">
          <button onclick="closeVideo()" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 32px; cursor: pointer;">✕</button>
          <iframe id="video-iframe" width="100%" height="500" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
}

// ==========================================
// LIRE UNE VIDÉO
// ==========================================
function playVideo(url) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  
  if (modal && iframe) {
    iframe.src = url + '?autoplay=1';
    modal.style.display = 'flex';
  }
}

function closeVideo() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  
  if (modal && iframe) {
    iframe.src = '';
    modal.style.display = 'none';
  }
}


// ==========================================
// AFFICHER LES STATISTIQUES SYMFONY
// ==========================================
function showSymfonyStats() {
  const statsHTML = `
    <div id="stats-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 99999; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; border-radius: 16px; max-width: 600px; width: 90%; padding: 32px; position: relative;">
        <button onclick="closeStats()" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280;">&times;</button>
        
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px; color: #111827;">Statistiques des problèmes Symfony</h2>
        
        <div style="space-y: 16px;">
          <!-- Erreur BDD -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px; font-weight: 500;">Erreur connexion BDD</span>
              <span style="font-size: 14px; font-weight: 600; color: #C51718;">35%</span>
            </div>
            <div style="width: 100%; background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="width: 35%; background: #C51718; height: 100%;"></div>
            </div>
          </div>
          
          <!-- Erreur 500 -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px; font-weight: 500;">Erreur 500 serveur</span>
              <span style="font-size: 14px; font-weight: 600; color: #C51718;">28%</span>
            </div>
            <div style="width: 100%; background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="width: 28%; background: #C51718; height: 100%;"></div>
            </div>
          </div>
          
          <!-- Migration Doctrine -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px; font-weight: 500;">Problème migration Doctrine</span>
              <span style="font-size: 14px; font-weight: 600; color: #C51718;">22%</span>
            </div>
            <div style="width: 100%; background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="width: 22%; background: #C51718; height: 100%;"></div>
            </div>
          </div>
          
          <!-- Routing -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px; font-weight: 500;">Erreur routing</span>
              <span style="font-size: 14px; font-weight: 600; color: #C51718;">15%</span>
            </div>
            <div style="width: 100%; background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="width: 15%; background: #C51718; height: 100%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', statsHTML);
}

function closeStats() {
  const modal = document.getElementById('stats-modal');
  if (modal) modal.remove();
}

// ==========================================
// GÉRER L'UPLOAD DE FICHIERS
// ==========================================
function handleFileUpload(event) {
  const files = event.target.files;
  const fileList = document.getElementById('file-list');
  
  if (!fileList) return;
  
  fileList.innerHTML = '';
  
  Array.from(files).forEach(file => {
    const fileItem = document.createElement('div');
    fileItem.className = 'flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg';
    fileItem.innerHTML = `
      <span class="text-sm font-redhat">${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
      <button onclick="this.parentElement.remove()" class="text-red-600 hover:text-red-700">✕</button>
    `;
    fileList.appendChild(fileItem);
  });
}

// ==========================================
// OUVRIR LE FORMULAIRE DE QUESTION
// ==========================================
function openQuestionForm() {
  alert('Formulaire de question à développer : titre, description, fichiers attachés');
}
function showJavafxStats() {
  const statsHTML = `
    <div id="stats-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 99999; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; border-radius: 16px; max-width: 600px; width: 90%; padding: 32px; position: relative;">
        <button onclick="closeStats()" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280;">&times;</button>
        
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px; color: #111827;">Statistiques des problèmes JavaFX</h2>
        
        <div style="space-y: 16px;">
          <!-- Erreurs FXML / contrôleur -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px; font-weight: 500;">Erreur FXML / contrôleur</span>
              <span style="font-size: 14px; font-weight: 600; color: #C51718;">38%</span>
            </div>
            <div style="width: 100%; background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="width: 38%; background: #C51718; height: 100%;"></div>
            </div>
          </div>
          
          <!-- Problèmes de modules -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px; font-weight: 500;">module-info / modules manquants</span>
              <span style="font-size: 14px; font-weight: 600; color: #C51718;">27%</span>
            </div>
            <div style="width: 100%; background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="width: 27%; background: #C51718; height: 100%;"></div>
            </div>
          </div>
          
          <!-- Lancement / JVM -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px; font-weight: 500;">Paramètres JVM / lancement</span>
              <span style="font-size: 14px; font-weight: 600; color: #C51718;">22%</span>
            </div>
            <div style="width: 100%; background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="width: 22%; background: #C51718; height: 100%;"></div>
            </div>
          </div>
          
          <!-- Connexion BDD -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px; font-weight: 500;">Connexion BDD (JDBC)</span>
              <span style="font-size: 14px; font-weight: 600; color: #C51718;">13%</span>
            </div>
            <div style="width: 100%; background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="width: 13%; background: #C51718; height: 100%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', statsHTML);
}