import { themeToggle } from "./modules/theme.js";
import { historicData } from "./modules/history.js";
import { analysis } from "./modules/analytics.js";
import { future } from "./modules/future.js";

themeToggle();

const intro = document.getElementById("intro");
const button = document.getElementById("button");
const dashboard = document.getElementById("dashboard");
const reset = document.getElementById("reset-btn");
const birth = document.getElementById("birth");

birth.max = new Date().toISOString().split("T")[0];

let clockTick;

button.addEventListener("click", () => {
    if (birth.value === "") {
        alert("Please select a Valid DOB!");
        return;
    }

    populateDashboard(birth.value);

    intro.classList.remove("home-screen");
    intro.classList.add("dashboard-screen");

    setTimeout(() => {
        intro.style.display = "none";
        dashboard.style.display = "flex";
        
        setTimeout(() => {
            dashboard.classList.remove("dashboard-screen");
            dashboard.classList.add("home-screen");
        }, 50);
    }, 600);
});

reset.addEventListener("click", () => {
    clearInterval(clockTick);
    
    dashboard.classList.remove("home-screen");
    dashboard.classList.add("dashboard-screen");
    
    setTimeout(() => {
        dashboard.style.display = "none";
        intro.style.display = "flex";
        
        setTimeout(() => {
            intro.classList.remove("dashboard-screen");
            intro.classList.add("home-screen");
            birth.value = "";
        }, 50);
    }, 600);
});

function number(n, x, y, time) {
    const a = document.getElementById(n);

    if (!a) {
        return;
    }

    let x_time = null;

    const step = (ts) => {
        if (!x_time) {
            x_time = ts;
        }

        const progress = Math.min((ts - x_time) / time, 1);
        const smooth = 1 - Math.pow(1 - progress, 4);
        const curr = Math.floor(smooth * (y - x) + x);

        a.innerHTML = curr.toLocaleString();

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

function populateDashboard(date) {
    const dob = new Date(date);
    const today = new Date();

    const cards = document.getElementById("cards");
    const statistics = document.getElementById("statistics");
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const analytics = document.getElementById("analytics");
    const progress = document.getElementById("progress");
    const info = document.getElementById("info");

    const born = weekdays[dob.getDay()];
    const birthstones = ["Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl", "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Turquoise"];
    const birthstone = birthstones[dob.getMonth()];
    const milli = today - dob;
    const totalDays = Math.floor(milli/(1000*60*60*24));

    let year = today.getFullYear() - dob.getFullYear();
    let month = today.getMonth() - dob.getMonth();
    let day = today.getDate() - dob.getDate();

    if (day < 0) {
        month--;
        const previous = new Date(today.getFullYear(), today.getMonth(), 0);
        day = day + previous.getDate();
    }

    if (month < 0) {
        year--;
        month = month + 12;
    }

    const totalMonths = year*12 + month;
    const lifeProgress = ((year/80)*100).toFixed(1);

    let next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

    if (next < today) {
        next.setFullYear(today.getFullYear() + 1);
    }

    const difference = next - today;
    const bdays = Math.ceil(difference/(1000*60*60*24));

    const stats = analysis(dob, today, totalDays, year);

    document.getElementById("player-level").innerText = `Level ${year}`;

    cards.innerHTML = `
    <div class="card"><h2>${year}</h2><p>Years</p></div>
    <div class="card"><h2>${month}</h2><p>Months</p></div>
    <div class="card"><h2>${day}</h2><p>Days</p></div>`;

    statistics.innerHTML = `
    <div class="stats"><h3>Total number of Days: </h3><p>${totalDays.toLocaleString()}</p></div>
    <div class="stats"><h3>Total number of Months: </h3><p>${totalMonths.toLocaleString()}</p></div>`;

    info.innerHTML = `
    <div class="facts-container">
        <div class="fact-card"><h3>📅 Born On</h3><p>${born}</p></div>
        <div class="fact-card"><h3>💎 Birthstone</h3><p>${birthstone}</p></div>
        <div class="fact-card"><h3>🎂 Next Birthday</h3><p>${bdays} Days Left</p></div>
    </div>`;

    analytics.innerHTML = `
    <div class="facts-container">
        <div class="fact-card"><h3>❤️ Heartbeats</h3><p id="animation-heart">0</p></div>
        <div class="fact-card"><h3>💨 Breaths</h3><p id="animation-breath">0</p></div>
    </div>

    <div class="facts-container">
        <div class="fact-card"><h3>☀️ Sun Trips</h3><p>${sun}</p></div>
        <div class="fact-card"><h3>🌙 Moon Cycles</h3><p>${moon.toLocaleString()}</p></div>
        <div class="fact-card"><h3>🐐 Zodiac</h3><p>${zodiac}</p></div>
    </div>`;

    progress.innerHTML = `
    <div class="progress-span">
        <p>${lifeProgress}% of an 80-year lifespan</p>
        <div class="progress-track">
            <div class="progress-life" style="width:${lifeProgress}%"></div>
        </div>
    </div>`;

    const futureContainer = document.getElementById("future");

    if (futureContainer) {
        futureContainer.innerHTML = future(dob, today);
    }

    historicData(dob.getFullYear(), dob.getMonth() + 1, dob.getDate()).then((data) => {
        console.log("Historical Data Loaded:", data);
    });

    number("animation-heart", 0, stats.heartbeat, 2000);
    number("animation-breath", 0, stats.breathing, 2000);

    const clockElement = document.getElementById("clock");
    
    if (clockTick) {
        clearInterval(clockTick);
    }
    
    clockTick = setInterval(() => {
        const now = new Date();
        const diff = now - dob;
        
        const liveDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const liveHours = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const liveMinutes = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, '0');
        const liveSeconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');

        clockElement.innerText = `${liveDays}d : ${liveHours}h : ${liveMinutes}m : ${liveSeconds}s`;
    }, 1000);
}
