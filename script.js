const valentineDays = {
    7: {
        name: "Rose Day",
        emoji: "🌹",
        message: "A rose for my beautiful Valentine\nEvery petal whispers my love for you"
    },
    8: {
        name: "Propose Day",
        emoji: "💍",
        message: "Will you make me the happiest person?\nI promise to cherish you forever"
    },
    9: {
        name: "Chocolate Day",
        emoji: "🍫",
        message: "You're sweeter than any chocolate\nMy heart melts for you"
    },
    10: {
        name: "Teddy Day",
        emoji: "🧸",
        message: "This teddy carries all my love\nHold it close when we're apart"
    },
    11: {
        name: "Promise Day",
        emoji: "🤝",
        message: "I promise to always:\n• Love you\n• Respect you\n• Support you"
    },
    12: {
        name: "Hug Day",
        emoji: "🫂",
        message: "Wish I could hug you tight\nAnd never let go"
    },
    13: {
        name: "Kiss Day",
        emoji: "💋",
        message: "Blowing kisses your way\nEach one carries my love"
    },
    14: {
        name: "Valentine's Day",
        emoji: "💝",
        message: "Happy Valentine's Day, my love\nYou're my forever and always"
    }
};

// Vercel routing helper
const fixVercelRouting = () => {
    const params = new URLSearchParams(window.location.search);
    if (window.location.host.includes('vercel.app') && params.has('sender')) {
        window.history.replaceState({}, '', `/content.html?${params.toString()}`);
    }
};

// Main content logic
const initContentPage = () => {
    try {
        fixVercelRouting();

        const params = new URLSearchParams(window.location.search);
        const sender = decodeURIComponent(params.get('sender'));
        const receiver = decodeURIComponent(params.get('receiver'));
        const status = decodeURIComponent(params.get('status'));
        const day = decodeURIComponent(params.get('day'));

        if (!sender || !receiver || !status || !day) throw new Error();

        const valentineDay = valentineDays[day] || valentineDays[14];

        // Update content
        document.getElementById('dayTitle').textContent = valentineDay.name;
        document.getElementById('graphicContainer').innerHTML = `
            <div class="day-emoji">${valentineDay.emoji}</div>
        `;
        document.getElementById('messageContent').innerHTML = `
            <span class="name-highlight">${sender}</span> wishes
            <span class="name-highlight">${receiver}</span><br>
            "${valentineDay.message}"
        `;

        // Create proposal section
        const proposalSection = document.getElementById('proposalSection');
        proposalSection.innerHTML = status === 'single' ? `
            <h3><span class="name-highlight">${receiver}</span>, will you be my Valentine? 💌</h3>
            <div class="proposal-buttons">
                <button onclick="showResponse('yes')">💖 Yes!</button>
                <button onclick="showResponse('no')">💔 Maybe Later</button>
            </div>
        ` : `
            <h3><span class="name-highlight">${receiver}</span>, will you marry me? 💍</h3>
            <div class="proposal-buttons">
                <button onclick="showResponse('yes')">💍 Yes, Forever!</button>
                <button onclick="showResponse('no')">⏳ Let's Wait</button>
            </div>
        `;

        // Create floating hearts
        setInterval(createHeart, 300);

    } catch (error) {
        document.body.innerHTML = `
            <div class="container">
                <h2>Invalid Link ❌</h2>
                <p>Please ask the sender for a valid Valentine message link</p>
                <button onclick="window.location.href = '/'">Create New</button>
            </div>
        `;
    }
};

// Initialize
if (window.location.pathname.includes('content.html')) {
    initContentPage();
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    document.getElementById('heartAnimation').appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}

function showResponse(response) {
    alert(response === 'yes'
        ? "🎉 Celebration time! Your response has been recorded!"
        : "💔 Your response has been recorded!");
}
