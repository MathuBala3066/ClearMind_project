// =====================
// Motivational Quotes
// =====================
const motivationalQuotes = [
    "🌟 This too shall pass.",
    "💪 One step at a time is enough.",
    "🌱 Focus on what you can control today.",
    "✨ Every small step counts.",
    "🌊 Let go of what you cannot change.",
    "🧘 Take a deep breath and start again.",
    "☀️ Difficulties are temporary, keep going.",
    "💡 Clarity comes when you pause and reflect."
];

// =====================
// Dark Mode Toggle
// =====================
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});

// =====================
// Smooth Content Change
// =====================
function changeCardContent(newHTML) {
    const app = document.getElementById("app");
    app.classList.add("fade-out");

    setTimeout(() => {
        app.innerHTML = newHTML;
        app.classList.remove("fade-out");
    }, 500);
}

// =====================
// Start Flow
// =====================
function startFlow() {
    const worry = document.getElementById("worryInput").value.trim();

    if (worry === "") {
        alert("Please tell me what's worrying you 💭");
        return;
    }

    localStorage.setItem("currentWorry", worry);

    const newHTML = `
        <h2>You’re worried about:</h2>
        <p><strong>${worry}</strong></p>
        <h3>Can you do something about this right now?</h3>
        <button onclick="handleControl(true)">Yes ✅</button>
        <button onclick="handleControl(false)">No ❌</button>
    `;

    changeCardContent(newHTML);
}

// =====================
// Handle YES / NO
// =====================
function handleControl(canControl) {
    let newHTML = "";

    if (canControl) {
        newHTML = `
            <h2>That’s great 💪</h2>
            <p>Small actions reduce big stress.</p>
            <h3>What is ONE small step you can take today?</h3>
            <input type="text" id="actionStep" placeholder="Example: Revise chapter 1">
            <button onclick="saveAction()">Save My Step</button>
        `;
    } else {
        // Pick random motivational quote
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

        newHTML = `
            <h2>It’s okay 🌊</h2>
            <p>If you can't control it now, worrying won't help.</p>
            <p style="font-style:italic; color:#555;">${randomQuote}</p>
            <ul style="text-align:left;">
                <li>Take 5 slow breaths</li>
                <li>Drink some water</li>
                <li>Focus on one small task today</li>
            </ul>
            <button onclick="restart()">Start Again</button>
        `;

        saveToHistory("Let go & relax");
    }

    changeCardContent(newHTML);
}

// =====================
// Save Action (YES path)
// =====================
function saveAction() {
    const action = document.getElementById("actionStep").value.trim();

    if (action === "") {
        alert("Enter a small step 🙂");
        return;
    }

    const worry = localStorage.getItem("currentWorry");

    const newHTML = `
        <h2>Great choice ✨</h2>
        <p><strong>Today's small step:</strong> ${action}</p>
        <p>You’ve turned worry into action. That’s powerful 💚</p>
        <button onclick="restart()">Help With Another Thought</button>
    `;

    changeCardContent(newHTML);
    saveToHistory(action);
}

// =====================
// Save History
// =====================
function saveToHistory(result) {
    const worry = localStorage.getItem("currentWorry");

    let history = JSON.parse(localStorage.getItem("worryHistory")) || [];
    history.push({ worry, result });

    localStorage.setItem("worryHistory", JSON.stringify(history));
    displayHistory();
}

// =====================
// Display History
// =====================
function displayHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("worryHistory")) || [];

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.worry} → ${item.result}`;
        historyList.appendChild(li);
    });
}

// =====================
// Restart App
// =====================
function restart() {
    location.reload();
}

// =====================
// Initialize History
// =====================
displayHistory();
