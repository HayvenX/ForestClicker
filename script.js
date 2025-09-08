const treeImg = document.getElementById('tree')
const clickCountSpan = document.getElementById('clickCount')
const clickBtn = document.getElementById('clickBtn')
const message = document.getElementById('message')

let clickCount = 0
let stage = 0

const stageThresholds = [3, 10, 15, 25]; // clicks needed to reach each stage
const stageImages = [
    'img/seed.png',
    'img/plant.png',
    'img/small tree.png',
    'img/middle tree.png',
    'img/full tree.png'
];
const stageMessages = [
    "Let's grow your forest!",
    "The tree is growing! Keep clicking!",
    "The tree is getting bigger! Keep going!",
    "The tree is half-grown! Almost there!",
    "The tree is fully grown! Great job!"
];

function updateUI() {
    // Calculate clicks for current stage
    let prevThreshold = stage > 0 ? stageThresholds[stage - 1] : 0;
    let nextThreshold = stageThresholds[stage] || stageThresholds[stageThresholds.length - 1];
    let currentStageClicks = clickCount - prevThreshold;
    let neededClicks = nextThreshold - prevThreshold;
    clickCountSpan.textContent = `${currentStageClicks}/${neededClicks}`;
    treeImg.src = stageImages[stage];
    message.textContent = stageMessages[stage];
}

clickBtn.addEventListener('click', () => {
    clickCount++;
    // Advance stage if threshold reached
    if (stage < stageThresholds.length && clickCount >= stageThresholds[stage]) {
        stage++;
        // Disable button if last stage
        if (stage === stageImages.length - 1) {
            clickBtn.disabled = true;
        }
    }
    updateUI();
});

updateUI();