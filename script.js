console.log("Script.js berhasil dimuat");

const questions = [
  {
    question: "Apa kitab suci agama Islam?",
    options: ["Injil", "Taurat", "Al-Qur'an", "Zabur"],
    answer: "Al-Qur'an"
  },
  {
    question: "Siapa nabi terakhir dalam Islam?",
    options: ["Nabi Musa", "Nabi Isa", "Nabi Ibrahim", "Nabi Muhammad"],
    answer: "Nabi Muhammad"
  },
  {
    question: "Berapa jumlah rakaat sholat Maghrib?",
    options: ["2", "3", "4", "5"],
    answer: "3"
  },
  {
    question: "Hari raya umat Islam adalah?",
    options: ["Natal", "Waisak", "Idul Fitri", "Imlek"],
    answer: "Idul Fitri"
  },
  {
    question: "Rukun Islam yang pertama adalah?",
    options: ["Zakat", "Sholat", "Puasa", "Syahadat"],
    answer: "Syahadat"
  },
  {
    question: "Bulan suci umat Islam?",
    options: ["Januari", "Ramadhan", "Syawal", "Dzulhijjah"],
    answer: "Ramadhan"
  },
  {
    question: "Ka’bah berada di kota?",
    options: ["Madinah", "Yerusalem", "Mekkah", "Kairo"],
    answer: "Mekkah"
  },
  {
    question: "Jumlah rakaat sholat Subuh?",
    options: ["2", "3", "4", "5"],
    answer: "2"
  },
  {
    question: "Puasa Ramadhan hukumnya?",
    options: ["Sunnah", "Wajib", "Mubah", "Makruh"],
    answer: "Wajib"
  },
  {
    question: "Salah satu nama malaikat yang mencatat amal?",
    options: ["Israfil", "Ridwan", "Raqib", "Malik"],
    answer: "Raqib"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function showQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const feedbackElement = document.getElementById("feedback");
  const scoreContainer = document.getElementById("score-container");

  feedbackElement.textContent = "";
  scoreContainer.style.display = "none";
  answered = false;

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

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
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  const feedbackElement = document.getElementById("feedback");

  if (selectedOption === currentQuestion.answer) {
    score++;
    feedbackElement.textContent = "Benar!";
    feedbackElement.style.color = "#28a745";
  } else {
    feedbackElement.textContent = "Salah!";
    feedbackElement.style.color = "#dc3545";
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  const scoreContainer = document.getElementById("score-container");

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    document.getElementById("question").textContent = "";
    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").textContent = "";
    scoreContainer.innerHTML = `<h3>Quiz Selesai!</h3><p>Skor kamu: ${score} dari ${questions.length}</p>`;
    scoreContainer.style.display = "block";
  }
}

window.onload = function () {
  score = 0;
  currentQuestionIndex = 0;
  showQuestion();
};