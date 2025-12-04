// AI Summary Page Interactions

// Static AI responses pool
const aiResponses = [
    "Excellente question! Pour ce problème, je vous recommande de vérifier d'abord votre configuration.",
    "Je comprends votre préoccupation. Avez-vous essayé de redémarrer le serveur MySQL?",
    "C'est un problème courant. Assurez-vous que votre driver JDBC est à jour.",
    "Intéressant! Cette erreur est souvent liée aux permissions de la base de données.",
    "Bon point! N'oubliez pas de vérifier le port 3306 dans votre pare-feu.",
    "Je vois. Avez-vous vérifié que l'URL de connexion est correcte?",
    "C'est une bonne observation. Le timeout peut être causé par plusieurs facteurs.",
    "Merci de partager cela. Avez-vous testé la connexion avec un client SQL?",
    "Ah oui, ce problème nécessite de vérifier les logs MySQL pour plus de détails.",
    "Bonne approche! Assurez-vous aussi que le nom d'utilisateur et le mot de passe sont corrects."
];

let responseIndex = 0;
let messageCount = 1; // Start with 1 for the initial message
let chatExpanded = false; // Track if chat is expanded

// Feedback buttons
function handleFeedback(isPositive) {
    const message = isPositive 
        ? 'Merci pour votre retour positif! 👍' 
        : 'Nous sommes désolés que cela n\'ait pas fonctionné. Voulez-vous discuter avec l\'IA pour plus d\'aide? 💬';
    
    // Show feedback message
    alert(message);
    
    // Log for analytics
    console.log('Feedback:', isPositive ? 'positive' : 'negative');
    
    // If negative feedback, scroll to chat
    if (!isPositive) {
        document.getElementById('chatInput')?.scrollIntoView({ behavior: 'smooth' });
    }
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Clear input
    input.value = '';
    messageCount++;
    
    // Simulate AI response after a short delay
    setTimeout(() => {
        const aiResponse = getAIResponse();
        addMessageToChat(aiResponse, 'ai');
        messageCount++;
    }, 800);
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    
    if (sender === 'user') {
        messageDiv.className = 'inline-block bg-brand-red text-white rounded-2xl p-3 ml-8 max-w-[70%] break-words';
        messageDiv.innerHTML = `<p class="text-sm break-words">${escapeHtml(message)}</p>`;
    } else {
        messageDiv.className = 'inline-block bg-gray-100 rounded-2xl p-3 mr-8 max-w-[70%] break-words';
        messageDiv.innerHTML = `<p class="text-sm text-gray-700 break-words">${escapeHtml(message)}</p>`;
    }
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse() {
    // Get response from static pool and cycle through them
    const response = aiResponses[responseIndex];
    responseIndex = (responseIndex + 1) % aiResponses.length;
    return response;
}

function expandChat() {
    if (chatExpanded) return; // Already expanded
    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.style.height = '240px'; // 2x the original 120px
    chatExpanded = true;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Handle "Voir Plus" button for links
document.addEventListener('click', function(e) {
    if (e.target.textContent === 'Voir Plus') {
        e.preventDefault();
        console.log('Show more links');
        alert('Fonctionnalité "Voir Plus" - à implémenter avec plus de liens');
    }
});

function showSavePopup() {
    const popup = document.getElementById('savePopup');
    popup.classList.remove('hidden');
    popup.style.display = 'flex'; // Force flex to center it
}

function closeSavePopup() {
    const popup = document.getElementById('savePopup');
    popup.classList.add('hidden');
    popup.style.display = 'none';
}