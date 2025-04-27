console.log("Script.js Loaded");

const questions = [
  { question: "Apa kitab suci agama Islam?", options: ["Injil", "Taurat", "Al-Qur'an", "Zabur"], answer: "Al-Qur'an" },
  { question: "Siapa nabi terakhir dalam Islam?", options: ["Nabi Musa", "Nabi Isa", "Nabi Ibrahim", "Nabi Muhammad"], answer: "Nabi Muhammad" },
  { question: "Berapa jumlah rakaat sholat Maghrib?", options: ["2", "3", "4", "5"], answer: "3" },
  { question: "Hari raya umat Islam?", options: ["Natal", "Waisak", "Idul Fitri", "Imlek"], answer: "Idul Fitri" },
  { question: "Rukun Islam pertama?", options: ["Zakat", "Sholat", "Puasa", "Syahadat"], answer: "Syahadat" },
  { question: "Bulan suci umat Islam?", options: ["Januari", "Ramadhan", "Syawal", "Dzulhijjah"], answer: "Ramadhan" },
  { question: "Ka'bah berada di kota?", options: ["Madinah", "Yerusalem", "Mekkah", "Kairo"], answer: "Mekkah" },
  { question: "Jumlah rakaat sholat Subuh?", options: ["2", "3", "4", "5"], answer: "2" },
  { question: "Puasa Ramadhan hukumnya?", options: ["Sunnah", "Wajib", "Mubah", "Makruh"], answer: "Wajib" },
  { question: "Malaikat yang mencatat amal?", options: ["Israfil", "Ridwan", "Raqib", "Malik"], answer: "Raqib" }
];

let currentQuestionIndex = 0;
let score = 0;
let lives = 5;
let level = 1;
let questionsPerLevel = 5;
let timer;
let timerDuration = 25;
let answered = false;

function showLives() {
  const livesContainer = document.getElementById("lives");
  livesContainer.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    livesContainer.innerHTML += "<span>♥</span>";
  }
}

function showLevel() {
  document.getElementById("level").textContent = `Level: ${level}`;
}

function showTimer(time) {
  document.getElementById("timer").textContent = `Waktu: ${time} detik`;
}

function startTimer() {
  let timeLeft = timerDuration;
  showTimer(timeLeft);
  timer = setInterval(() => {
    timeLeft--;
    showTimer(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      loseLife();
      feedback("Waktu habis!", false);
    }
  }, 1000);
}

function showQuestion() {
  clearInterval(timer);
  answered = false;
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question").textContent = currentQuestion.question;
  const optionsElement = document.getElementById("options");
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => {
      if (!answered) {
        checkAnswer(option);
        answered = true;
      }
    };
    optionsElement.appendChild(button);
  });

  startTimer();
  showLives();
  showLevel();
}

function checkAnswer(selectedOption) {
  clearInterval(timer);
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    feedback("Benar!", true);
    score++;
    playAudio("correct-audio"); // Memutar audio jawaban benar
    document.getElementById("next-btn").style.display = "inline-block"; // Show next button
  } else {
    feedback("Salah!", false);
    playAudio("incorrect-audio"); // Memutar audio jawaban salah
    loseLife();
  }
}

function feedback(text, isCorrect) {
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.textContent = text;
  feedbackElement.style.color = isCorrect ? "#28a745" : "#dc3545";
}

function loseLife() {
  lives--;
  showLives();
  if (lives <= 0) {
    gameOver();
  }
}

function nextQuestion() {
  playAudio("touch-audio"); // Memutar audio sentuhan
  currentQuestionIndex++;
  const scoreContainer = document.getElementById("score-container");

  if (currentQuestionIndex % questionsPerLevel === 0 && currentQuestionIndex !== 0) {
    if (lives < 5) lives++;
    level++;
    timerDuration = Math.max(3, timerDuration - 3);
  }

  if (currentQuestionIndex < questions.length) {
    showQuestion();
    document.getElementById("next-btn").style.display = "none"; // Hide next button
  } else {
    clearInterval(timer);
    document.getElementById("question").textContent = "";
    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").textContent = "";
    scoreContainer.innerHTML = `<h3>Quiz Selesai!</h3><p>Skor: ${score}/${questions.length}</p>`;
    scoreContainer.style.display = "block";
    playAudio("winner-audio"); // Memutar audio ketika quiz selesai
    document.querySelector(".retry-btn").style.display = "inline-block";
  }
}

function gameOver() {
  clearInterval(timer);
  document.getElementById("question").textContent = "Game Over!";
  document.getElementById("options").innerHTML = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("score-container").innerHTML = `<p>Skor: ${score}</p>`;
  document.getElementById("score-container").style.display = "block";
  document.querySelector(".retry-btn").style.display = "inline-block";
}

function retryQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  lives = 5;
  level = 1;
  timerDuration = 25;
  document.getElementById("score-container").style.display = "none";
  document.querySelector(".retry-btn").style.display = "none";
  showQuestion();
}

function playAudio(id) {
  const audioElement = document.getElementById(id);
  audioElement.play();
}

// Memulai musik latar belakang saat game dimulai
window.onload = () => {
  playAudio("music-audio"); // Memulai musik latar belakang
  showQuestion();
};