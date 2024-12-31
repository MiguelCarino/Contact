async function loadProfile() {
    const response = await fetch('assets/json/profile.json');
    const profile = await response.json();

    document.querySelector('h1').textContent = profile.name;
    document.querySelector('h2').textContent = profile.description;
    document.querySelector('.photo').src = profile.photo;

    const contactList = document.querySelector('.contact-info');
    contactList.innerHTML = '';

    const icons = {
        whatsapp: '<i class="fab fa-whatsapp"></i>',
        linkedin: '<i class="fab fa-linkedin"></i>',
        steam: '<i class="fab fa-steam"></i>',
        gog: '<i class="fas fa-gamepad"></i>',
        mastodon: '<i class="fab fa-mastodon"></i>',
        mail: '<i class="fas fa-envelope"></i>',
    };
    

    Object.entries(profile.contacts).forEach(([key, value]) => {
        if (value) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = value;
            a.target = '_blank';
            a.innerHTML = `${icons[key] || ''} ${key.charAt(0).toUpperCase() + key.slice(1)}`;
            li.appendChild(a);
            contactList.appendChild(li);
        }
    });
    
}

// Define available themes
const themes = ['colorful', 'cyberpunk', 'retro', 'japanese', 'rhel', 'fedora', 'suse', 'xmas', 'simplew', 'simpleb', 'ubuntu', 'apple', 'microsoft'];

// Function to get a random theme
function getRandomTheme() {
    const randomIndex = Math.floor(Math.random() * themes.length);
    return themes[randomIndex];
}

// Change themes based on the URL hash
window.addEventListener('hashchange', () => {
    let theme = location.hash.replace('#', '');
    
    // If the hash is #random, pick a random theme
    if (theme === 'random') {
        theme = getRandomTheme();
        location.hash = theme; // Update the hash to the selected theme
    }
    
    const themeLink = document.getElementById('theme');
    themeLink.href = `assets/css/${theme}.css`;
});

// Initialize theme on load
window.addEventListener('load', () => {
    let theme = location.hash.replace('#', '') || 'colorful';
    
    // If the hash is #random, pick a random theme
    if (theme === 'random') {
        theme = getRandomTheme();
        location.hash = theme; // Update the hash to the selected theme
    }
    
    const themeLink = document.getElementById('theme');
    themeLink.href = `assets/css/${theme}.css`;
    loadProfile();
});


