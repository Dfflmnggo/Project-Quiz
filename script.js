console.log("Script.js berhasil dimuat");

const questions = [
  {
    question: "Apa arti dari 'Al-Qur'an'?",
    options: ["Kitab Puisi", "Bacaan", "Kumpulan Cerita", "Doa Harian"],
    answer: "Bacaan"
  },
  {
    question: "Berapa jumlah rakaat shalat Subuh?",
    options: ["1 rakaat", "2 rakaat", "3 rakaat", "4 rakaat"],
    answer: "2 rakaat"
  },
  {
    question: "Siapakah nabi pertama dalam Islam?",
    options: ["Nabi Muhammad", "Nabi Isa", "Nabi Musa", "Nabi Adam"],
    answer: "Nabi Adam"
  },
  {
    question: "Zakat termasuk dalam rukun Islam ke berapa?",
    options: ["Ke-2", "Ke-3", "Ke-4", "Ke-5"],
    answer: "Ke-3"
  },
  {
    question: "Apa nama kitab suci yang diturunkan kepada Nabi Isa?",
    options: ["Zabur", "Taurat", "Injil", "Al-Qur'an"],
    answer: "Injil"
  },
  {
    question: "Apa arti dari Asmaul Husna 'Ar-Rahman'?",
    options: ["Maha Mengetahui", "Maha Pengasih", "Maha Perkasa", "Maha Pengampun"],
    answer: "Maha Pengasih"
  },
  {
    question: "Apa arti dari 'puasa' dalam bahasa Arab?",
    options: ["Sujud", "Zakat", "Shalat", "Shaum"],
    answer: "Shaum"
  },
  {
    question: "Kapan diwajibkannya puasa Ramadhan?",
    options: ["1 Muharram", "12 Rabiul Awal", "1 Ramadhan", "10 Dzulhijjah"],
    answer: "1 Ramadhan"
  },
  {
    question: "Siapakah Khalifah pertama setelah wafatnya Nabi Muhammad SAW?",
    options: ["Umar bin Khattab", "Ali bin Abi Thalib", "Utsman bin Affan", "Abu Bakar Ash-Shiddiq"],
    answer: "Abu Bakar Ash-Shiddiq"
  },
  {
    question: "Apa hukum shalat lima waktu bagi umat Islam?",
    options: ["Sunnah", "Wajib", "Mubah", "Makruh"],
    answer: "Wajib"
  }
];

let currentQuestionIndex = 0;

function showQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = ""; // reset opsi sebelumnya
  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    alert("Benar!");
  } else {
    alert("Salah!");
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    alert("Quiz selesai!");
  }
}

window.onload = showQuestion;