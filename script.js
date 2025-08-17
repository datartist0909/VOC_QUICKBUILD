// Toggle Ingredients
const toggleBtn = document.getElementById("toggleIngredients");
const ingredients = document.querySelector(".ingredients");

toggleBtn.addEventListener("click", () => {
  ingredients.classList.toggle("hidden");
  toggleBtn.textContent = ingredients.classList.contains("hidden")
    ? "Show Ingredients"
    : "Hide Ingredients";
});

// Cooking Steps Navigation
const startBtn = document.getElementById("startCooking");
const nextBtn = document.getElementById("nextStep");
const steps = document.querySelectorAll(".steps li");
const progressBar = document.querySelector(".progress-bar");
const timerEl = document.querySelector(".timer");
const timeDisplay = document.getElementById("timeDisplay");

let currentStep = 0;
let timer;
let timeLeft = 45 * 60; // 45 minutes in seconds

function formatTime(seconds) {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeDisplay.textContent = formatTime(timeLeft);
    } else {
      clearInterval(timer);
      alert("⏰ Time’s up! Your recipe should be ready!");
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  currentStep = 0;
  steps.forEach(step => step.classList.remove("active"));
  steps[currentStep].classList.add("active");

  startBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  timerEl.classList.remove("hidden");

  updateProgress();
  startTimer();
});

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    steps[currentStep].classList.remove("active");
    currentStep++;
    steps[currentStep].classList.add("active");
    updateProgress();
  } else {
    clearInterval(timer);
    alert("🎉 You finished the recipe!");
    nextBtn.classList.add("hidden");
  }
});

function updateProgress() {
  let percent = ((currentStep + 1) / steps.length) * 100;
  progressBar.style.width = percent + "%";
}
