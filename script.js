const treeImg = document.getElementById('tree')
const clickCountSpan = document.getElementById('clickCount')
const clickBtn = document.getElementById('clickBtn')
const message = document.getElementById('message')

let clickCount = 0
let stage = 0

const stageThresholds = [3, 10, 15, 25] // clicks needed to reach each stage
const stageImages = [
    'img/seed.png',
    'img/plant.png',
    'img/small tree.png',
    'img/middle tree.png',
    'img/full tree.png'
]
const stageMessages = [
    "Let's grow your forest!",
    "The tree is growing! Keep clicking!",
    "The tree is getting bigger! Keep going!",
    "The tree is half-grown! Almost there!",
    "The tree is fully grown and going to your forest! Great job!"
]

const stageSizes = [40, 60, 100, 130, 250]

function updateUI() {
    // Calculate clicks for current stage
    treeImg.src = stageImages[stage]
    treeImg.style.width = stageSizes[stage] + 'px'
    message.textContent = stageMessages[stage]
    let prev = stage > 0 ? stageThresholds[stage - 1] : 0
    let next = stageThresholds[stage] || stageThresholds[stageThresholds.length - 1]
    clickCountSpan.textContent = `${clickCount - prev}/${next - prev}`
   
    const progress = document.querySelector('.progress')
    let percent
    if (stage === stageImages.length - 1) {
        percent = 100
    }
    else {
        percent = Math.min(100, Math.floor(((clickCount - prev) / (next - prev)) * 100))
    }
    progress.style.width = percent + '%'

    const percentLabel = document.querySelector('.progress-percent')
    percentLabel.textContent = percent > 0 ? `${percent}%` : ''

    if (stage === stageImages.length - 1) {
        clickBtn.textContent = "Plant new tree"
    } 
    else {
        clickBtn.textContent = "Raise tree later"
    }
}

treeImg.addEventListener('click', () => {
    clickCount++
    // Advance stage if threshold reached
    if (stage < stageThresholds.length && clickCount >= stageThresholds[stage]) {
        stage++
        if (stage === stageImages.length - 1) {
            treeImg.style.cursor = 'default'
        }
    }
    updateUI()
})

const menuBtn = document.getElementById('menuBtn')
const sideMenu = document.getElementById('sideMenu')
const closeMenuBtn = document.getElementById('closeMenuBtn')

menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('show')
    menuBtn.style.display = 'none'
})

closeMenuBtn.addEventListener('click', () => {
    sideMenu.classList.remove('show')
    menuBtn.style.display = 'flex'
})

const menuItems = document.querySelectorAll('.menu-item')
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        sideMenu.classList.remove('show')
        menuBtn.style.display = 'flex'
    })
})

document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        if (sideMenu.classList.contains('show')) {
            sideMenu.classList.remove('show')
            menuBtn.style.display = 'flex'
        }
    }
})

updateUI()