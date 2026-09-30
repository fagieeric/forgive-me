const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const buttonsDiv = document.querySelector('.buttons');
const messageText = document.querySelector('.message');
const header = document.querySelector('.header');
const successMessage = document.getElementById('successMessage');
const heartsContainer = document.getElementById('heartsContainer');

let escapeAttempts = 0;
const maxAttempts = 10; // Exactly 10 actual clicks/taps
let isMoving = false;

// List of playful taunts (no numbers!)
const taunts = [
  "Can't catch me!", 
  "Nice try!", 
  "Nope!", 
  "Too slow!", 
  "Still mad? 😜", 
  "Almost!", 
  "Catch me if you can!",
  "Oops!",
  "Not today!",
  "Try again!"
];

function moveButton(e) {
  if (e) e.preventDefault();
  
  if (isMoving) return;
  isMoving = true;

  escapeAttempts++;

  // Disappears completely ONLY after 10 actual physical taps/clicks
  if (escapeAttempts >= maxAttempts) {
    noBtn.style.display = 'none';
    return;
  }

  // Safe screen boundary calculations for PC and mobile
  const padding = 50;
  const maxX = Math.max(padding, window.innerWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(padding, window.innerHeight - noBtn.offsetHeight - padding);

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  
  // Pick a random taunt without any numbers
  noBtn.textContent = taunts[Math.floor(Math.random() * taunts.length)];

  // Brief cooldown delay to prevent accidental double-taps
  setTimeout(() => {
    isMoving = false;
  }, 250);
}

// Click and Touch events ONLY (No mouse hover trigger)
noBtn.addEventListener('click', moveButton);
noBtn.addEventListener('touchstart', moveButton);

// Action when "Forgive Me" button is clicked
yesBtn.addEventListener('click', () => {
  header.style.display = 'none';
  messageText.style.display = 'none';
  buttonsDiv.style.display = 'none';
  successMessage.classList.remove('hidden');

  for (let i = 0; i < 30; i++) {
    createHeart();
  }
});

// Floating background hearts generator
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 3 + 3 + 's';
  heart.style.fontSize = Math.random() * 15 + 15 + 'px';
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// Continuously spawn hearts
setInterval(createHeart, 400);