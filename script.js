const title = document.getElementById("title");
const text = document.getElementById("text");
const nextBtn = document.getElementById("nextBtn");
const choices = document.querySelector(".choices");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const music = document.getElementById("bgMusic");

let step = 0;
let musicStarted = false;

const messages = [
    "ehe js kidding bebe, this is for you and made it for you…",
    
    "I love you, baby! 💕",
    "I’m sorry if I made you wait for me to ask you to be my Valentine.",
    "I know it's a little bit late na ",
    "And I promise this won’t happen again."
];

// Typing animation
function typeText(message) {
    text.textContent = "";
    let index = 0;

    const typing = setInterval(() => {
        if (index < message.length) {
            text.textContent += message.charAt(index);
            index++;
        } else {
            clearInterval(typing);
        }
    }, 40);
}

nextBtn.addEventListener("click", () => {

    // Start music on first tap (mobile safe)
    if (!musicStarted) {
        music.volume = 0.35;
        music.play().catch(() => {});
        musicStarted = true;
    }

    if (step < messages.length) {
        typeText(messages[step]);
        step++;
    } else {
        title.textContent = "💘 One last question…";
        typeText(
            "Will you be my Valentine, hoon? Say YES pleaseeeeee "
        );
        nextBtn.classList.add("hidden");
        choices.classList.remove("hidden");
    }
});

yesBtn.addEventListener("click", () => {
    title.textContent = "💖💖💖";
    typeText("I know you're gonna say yes eh, ako lang dapat bebeee! mwaaaaa🥰");
    choices.classList.add("hidden");
});

noBtn.addEventListener("click", () => {
    typeText("MWAMWAMWAMWAMWA AND HUG KITA TIGHT, I WUV WUV UU!🤍🥹");
});