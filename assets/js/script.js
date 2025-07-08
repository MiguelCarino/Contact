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
        telegram: '<i class="fab fa-telegram"></i>',
        linkedin: '<i class="fab fa-linkedin"></i>',
        steam: '<i class="fab fa-steam"></i>',
        mastodon: '<i class="fab fa-mastodon"></i>',
        mail: '<i class="fas fa-envelope"></i>',
        instragram: '<i class="fa fa-instagram"></i>',
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
const themes = ['colorful', 'cyberpunk', 'retro', 'rhel', 'fedora', 'suse', 'simplew', 'simpleb', 'ubuntu', 'apple', 'microsoft'];

function getRandomTheme() {
    const shuffledThemes = themes
        .map(theme => ({ theme, randomKey: Math.random() }))
        .sort((a, b) => a.randomKey - b.randomKey)
        .map(obj => obj.theme);

    const randomIndex = Math.floor(Math.random() * shuffledThemes.length);

    return shuffledThemes[randomIndex] || "default-theme";
}

// Function to dynamically load a JavaScript file
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Change themes based on the URL hash
window.addEventListener('hashchange', () => {
    let theme = location.hash.replace('#', '');

    if (theme === 'random') {
        theme = getRandomTheme();
        location.hash = theme;
    }

    const themeLink = document.getElementById('theme');
    themeLink.href = `assets/css/${theme}.css`;
});

window.addEventListener('load', async () => {
    try {
        let theme = location.hash.replace('#', '') || 'simpleb';

        if (theme === 'random') {
            theme = getRandomTheme();
            location.hash = theme;
        }

        const themeLink = document.getElementById('theme');
        themeLink.href = `assets/css/${theme}.css`;

        // Load the profile data
        loadProfile();
    } catch (error) {
        console.error('Error loading script.js:', error);
    }
});
