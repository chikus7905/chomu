const bgMusic = document.getElementById("bgMusic");
const hitSound = document.getElementById("hitSound");

enterScreen.onclick = () => {
    bgMusic.volume = window.innerWidth < 600 ? 0.02 : 0.03;
    bgMusic.currentTime = 15;
    bgMusic.play();

    enterScreen.style.opacity = 0;
    setTimeout(()=>{
        enterScreen.remove();
        pageHome.classList.remove("hidden");
    },600);
};

goGift.onclick = () => {
    pageHome.classList.add("hidden");
    pageGift.classList.remove("hidden");
};

giftBox.onclick = () => {
    giftBox.style.transform="scale(0)";
    setTimeout(()=>{
        surprise.classList.remove("hidden");
        goMemories.classList.remove("hidden");
    },400);
};

goMemories.onclick = () => {
    pageGift.classList.add("hidden");
    pageMemories.classList.remove("hidden");
    startCards();
};

const cards = document.querySelectorAll(".fall-card");
let currentIndex = 0;
let isMuted = false;

const overlay = document.createElement("div");
overlay.className="overlay";
document.body.appendChild(overlay);

const popup = document.createElement("img");
popup.className="popup-card";
document.body.appendChild(popup);

const finalMessage = document.createElement("div");
finalMessage.className="final-message";
finalMessage.innerHTML=`
<div class="fist">👋</div>
<h1>🎆 Happy New Year 2026 🎆</h1>
<h2>CHømû 🐼</h2>
<p>You are very special to me 💖</p>
<pre>
        New year unlocked 🎉
More laughs, more memories,
and more chaos with you ❣️
</pre>
<div class="final-buttons">
<button id="replayBtn">🔁 Replay</button>
<button id="muteBtn">🔇 Mute</button>
</div>`;
document.body.appendChild(finalMessage);

function startCards(){
    currentIndex=0;
    cards.forEach((c,i)=>{
        c.style.opacity=0;
        c.style.top="-200px";
        const w = window.innerWidth < 600 ? 120 : 160;
        c.style.left=Math.random()*(window.innerWidth-w)+"px";
        setTimeout(()=>{
            c.style.opacity=1;
            c.style.top="50%";
            c.style.left="50%";
            c.style.transform="translate(-50%,-50%) rotate("+(Math.random()*10-5)+"deg)";
        },i*400);
    });
    setTimeout(showNext, cards.length*500);
}

function showNext(){
    if(currentIndex>=cards.length){
        bgMusic.volume = 0.03;

        hitSound.volume=0.8;
        hitSound.play();
        finalMessage.classList.add("show");
        setupButtons();
        return;
    }
    popup.src=cards[currentIndex].src;
    overlay.classList.add("show");
    popup.classList.add("show");
    setTimeout(()=>{
        popup.classList.remove("show");
        overlay.classList.remove("show");
        currentIndex++;
        setTimeout(showNext, window.innerWidth<600?800:600);
    },window.innerWidth<600?1800:1500);
}

function setupButtons(){
    replayBtn.onclick=()=>{
        finalMessage.classList.remove("show");
        startCards();
    };
    muteBtn.onclick=()=>{
        isMuted=!isMuted;
        bgMusic.muted=isMuted;
        muteBtn.textContent=isMuted?"🔊 Unmute":"🔇 Mute";
    };
}
