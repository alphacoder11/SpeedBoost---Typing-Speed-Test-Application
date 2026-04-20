const paragraphs = [
    "The rapid advancement of artificial intelligence has fundamentally transformed how we interact with technology in our daily lives. Machine learning algorithms now power everything from recommendation systems to autonomous vehicles, making decisions that were once exclusively human domains. This technological revolution brings both opportunities and challenges, requiring us to adapt our skills and understanding. As AI continues to evolve, the boundary between human and machine capabilities becomes increasingly blurred, raising important questions about the future of work, creativity, and human potential in an automated world.",
    
    "Effective communication in the digital age requires mastering multiple platforms and understanding diverse audience needs. Social media, email marketing, video content, and interactive websites each demand unique approaches to convey messages clearly and persuasively. Successful communicators must balance authenticity with professionalism while adapting to rapidly changing technological landscapes. Building genuine connections online requires consistent effort, strategic thinking, and the ability to listen and respond meaningfully to feedback across various digital channels and platforms.",
    
    "Sustainable development represents humanity's greatest challenge and opportunity in the twenty-first century. Balancing economic growth with environmental protection requires innovative solutions across energy, transportation, agriculture, and urban planning. Renewable technologies, circular economies, and green infrastructure offer pathways to reduce our carbon footprint while maintaining quality of life. Individual actions combined with systemic changes can create lasting positive impact for future generations and preserve our planet's precious resources.",
    
    "The modern workplace has undergone dramatic transformation with remote collaboration becoming the new standard. Digital tools enable teams to work seamlessly across time zones and geographical boundaries, breaking down traditional office barriers. This shift requires new approaches to productivity, team building, and work-life balance. Companies that embrace flexibility and invest in proper technology infrastructure see increased employee satisfaction and often improved performance outcomes compared to traditional office environments.",
    
    "Learning to code has become an essential skill in today's technology-driven world. Programming languages serve as the foundation for creating websites, mobile applications, artificial intelligence systems, and countless other digital innovations. Beyond technical skills, coding teaches logical thinking, problem-solving, and creativity. Beginners can start with user-friendly languages like Python or JavaScript and gradually advance to more complex frameworks and specialized areas like data science or cybersecurity.",
    
    "Financial literacy empowers individuals to make informed decisions about money management, investing, and long-term planning. Understanding concepts like compound interest, diversification, and risk management helps people build wealth and achieve financial independence. Modern digital tools make investing more accessible than ever, but fundamental knowledge remains crucial for avoiding common pitfalls and making sound financial choices that align with personal goals and risk tolerance.",
    
    "The gig economy has revolutionized how people work and earn income, offering flexibility and autonomy traditional employment often lacks. Freelancers, independent contractors, and digital nomads leverage online platforms to connect with clients globally. This shift requires strong self-discipline, business management skills, and adaptability to market demands. While offering freedom, gig work also brings challenges like income stability and benefits that traditional employment typically provides.",
    
    "Mental health awareness has become increasingly important in our fast-paced, constantly connected world. Stress, anxiety, and burnout affect millions, making self-care and professional support essential components of overall wellbeing. Mindfulness practices, regular exercise, meaningful social connections, and work-life balance contribute to psychological resilience. Reducing stigma around mental health encourages people to seek help early and develop coping strategies for life's inevitable challenges.",
    
    "Climate change represents an urgent global crisis requiring immediate action at individual, corporate, and governmental levels. Rising temperatures, extreme weather events, and ecosystem disruption threaten communities worldwide. Solutions include renewable energy adoption, sustainable agriculture, reforestation efforts, and policy changes that incentivize environmental protection. Every person can contribute through lifestyle choices, advocacy, and supporting businesses committed to sustainability and carbon reduction.",
    
    "The evolution of social media has transformed how we share information, form communities, and perceive reality. Platforms connect billions globally, enabling instant communication and content creation. However, concerns about privacy, misinformation, and mental health impacts continue to grow. Digital literacy and critical thinking skills become essential for navigating online spaces safely and productively while maintaining authentic human connections beyond the digital realm.",
    
    "Artificial intelligence and machine learning are revolutionizing healthcare through improved diagnostics, personalized treatment plans, and drug discovery. AI algorithms can analyze medical images, predict disease outbreaks, and assist surgeons with precision procedures. These technologies promise to make healthcare more accessible, accurate, and efficient while reducing costs. Ethical considerations around data privacy and algorithmic bias must be addressed as AI becomes increasingly integrated into medical practice.",
    
    "The future of transportation is being reshaped by electric vehicles, autonomous driving technology, and sustainable urban planning. Electric cars reduce emissions while self-driving technology promises safer roads and increased mobility for those unable to drive. Smart cities integrate public transit, bike sharing, and pedestrian-friendly design to create efficient, environmentally conscious transportation networks that reduce congestion and improve quality of life for urban residents.",
    
    "Cybersecurity has become critical as our lives become increasingly digital. Protecting personal information, financial data, and critical infrastructure requires constant vigilance against evolving threats. Strong passwords, two-factor authentication, and regular software updates form basic defense layers. Organizations must invest in robust security measures and employee training to prevent data breaches. As technology advances, so do the tactics of malicious actors seeking to exploit vulnerabilities.",
    
    "The education system is adapting to prepare students for an uncertain future where many jobs don't yet exist. Critical thinking, creativity, collaboration, and adaptability become more valuable than memorization. Technology integration enables personalized learning experiences and global classroom connections. Project-based learning and real-world applications help students develop practical skills while traditional academic knowledge provides essential foundation for lifelong learning and career flexibility.",
    
    "Space exploration continues to push boundaries of human achievement and scientific understanding. Private companies alongside government agencies drive innovation in rocket technology, satellite deployment, and potential Mars colonization. These advances generate spin-off technologies benefiting Earth while inspiring future generations. International cooperation in space research demonstrates humanity's capacity to work together on ambitious goals that transcend national boundaries and political differences."
];

let timer, timeElapsed = 0, isRunning = false;
let currentText = "", usernameInput;

const display = document.getElementById("text-display");
const input = document.getElementById("text-input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const accuracyPercentDisplay = document.getElementById("accuracy-percent");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

// Start button
startBtn.onclick = () => {
    usernameInput = document.getElementById("username").value.trim();
    if (!usernameInput) return alert("Enter your name first!");

    currentText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    display.textContent = currentText;
    input.value = "";
    input.disabled = false;
    input.focus();
    timeElapsed = 60; // Start with 60 seconds countdown
    timerDisplay.textContent = timeElapsed;
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0";
    accuracyPercentDisplay.textContent = "0";
    if (timer) clearInterval(timer);

    isRunning = true;
    timer = setInterval(() => {
        timeElapsed--;
        timerDisplay.textContent = timeElapsed;
        if (timeElapsed <= 0) {
            clearInterval(timer);
            isRunning = false;
            input.disabled = true;
            // Auto-submit when time runs out
            submitScore();
        }
    }, 1000);
};

// Reset button
resetBtn.onclick = () => {
    clearInterval(timer);
    input.value = "";
    input.disabled = true;
    display.textContent = "Start typing";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0";
    accuracyPercentDisplay.textContent = "0";
    timerDisplay.textContent = "60";
    isRunning = false;
};

input.addEventListener("input", () => {
    if (!isRunning) return;

    const inputText = input.value;
    let correctChars = 0;
    let formatted = "";

    for (let i = 0; i < currentText.length; i++) {
        let ch = currentText[i];
        if (inputText[i] == null) {
            formatted += `<span class="pending">${ch}</span>`;
        } else if (inputText[i] === ch) {
            formatted += `<span class="correct">${ch}</span>`;
            correctChars++;
        } else {
            formatted += `<span class="incorrect">${ch}</span>`;
        }
    }

    display.innerHTML = formatted;

    // Calculate metrics based on actual time elapsed (60 - timeElapsed)
    const actualTimeElapsed = 60 - timeElapsed;
    if (actualTimeElapsed > 0) {
        let wpm = ((inputText.length / 5) / (actualTimeElapsed / 60)).toFixed(2);
        let cpm = (inputText.length / (actualTimeElapsed / 60)).toFixed(2);
        let accuracy = inputText.length > 0 ? ((correctChars / inputText.length) * 100).toFixed(2) : 0;

        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent = cpm;
        accuracyPercentDisplay.textContent = accuracy;
    }

    // Check if user has completed the current text
    if (inputText.length === currentText.length) {
        // Load new paragraph automatically
        currentText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
        display.textContent = currentText;
        input.value = "";
    }
});

// Submit score function
function submitScore() {
    const actualTimeElapsed = 60 - timeElapsed;
    const inputText = input.value;
    let correctChars = 0;
    
    for (let i = 0; i < Math.min(inputText.length, currentText.length); i++) {
        if (inputText[i] === currentText[i]) {
            correctChars++;
        }
    }

    let wpm = actualTimeElapsed > 0 ? ((inputText.length / 5) / (actualTimeElapsed / 60)).toFixed(2) : 0;
    let accuracy = inputText.length > 0 ? ((correctChars / inputText.length) * 100).toFixed(2) : 0;

    // Send score to backend
    fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: usernameInput, wpm: parseFloat(wpm), accuracy: parseFloat(accuracy) }),
    }).then(() => loadLeaderboard());
}

// Load leaderboard
function loadLeaderboard() {
    fetch("/leaderboard")
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("leaderboard-body");
            tbody.innerHTML = "";
            data.forEach((entry, i) => {
                const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : '';
                const row = `<tr>
                    <td class="${rankClass}">${i + 1}</td>
                    <td>${entry.name}</td>
                    <td>${entry.wpm}</td>
                    <td>${entry.accuracy}%</td>
                </tr>`;
                tbody.innerHTML += row;
            });
        });
}

window.onload = loadLeaderboard;
