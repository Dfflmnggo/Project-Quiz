// --- DATA QUIZ DENGAN SOAL ISLAM DINAMIS ---
const questions = [
  {
    question: "Siapa nabi terakhir dalam Islam?",
    options: ["Nabi Isa", "Nabi Musa", "Nabi Muhammad", "Nabi Nuh"],
    answer: 2
  },
  {
    question: "Berapa jumlah rakaat sholat wajib dalam sehari?",
    options: ["15 rakaat", "17 rakaat", "20 rakaat", "10 rakaat"],
    answer: 1
  },
  {
    question: "Apa nama kitab suci umat Islam?",
    options: ["Al-Qur'an", "Injil", "Taurat", "Veda"],
    answer: 0
  },
  {
    question: "Apa yang dimaksud dengan zakat?",
    options: ["Amal untuk fakir miskin", "Doa sebelum tidur", "Haji ke Mekah", "Menjaga kebersihan diri"],
    answer: 0
  },
  {
    question: "Siapa yang menerima wahyu pertama kali?",
    options: ["Nabi Ibrahim", "Nabi Musa", "Nabi Muhammad", "Nabi Isa"],
    answer: 2
  },
  {
    question: "Apa yang diwajibkan saat bulan Ramadhan?",
    options: ["Sholat malam", "Puasa", "Sedekah", "Haji"],
    answer: 1
  },
  {
    question: "Apa nama doa setelah sholat?",
    options: ["Doa iftitah", "Doa qunut", "Doa istighfar", "Doa tasyahhud"],
    answer: 1
  },
  {
    question: "Apa arti kata Islam?",
    options: ["Tunduk", "Damai", "Merdeka", "Berserah diri"],
    answer: 3
  },
  {
    question: "Siapa yang membangun Ka'bah?",
    options: ["Nabi Ibrahim dan Ismail", "Nabi Muhammad", "Nabi Musa", "Nabi Isa"],
    answer: 0
  },
  {
    question: "Apa yang dimaksud dengan haji?",
    options: ["Menunaikan ibadah di Makkah", "Berpuasa selama 30 hari", "Memberikan sedekah kepada anak yatim", "Sholat berjamaah"],
    answer: 0
  }
  // Tambahkan soal lainnya sesuai kebutuhan
];

// --- AMBIL ELEMEN ---
const music = document.getElementById('music-audio');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');
const touchSound = document.getElementById('touch-sound');
const openingScreen = document.getElementById('opening-screen');
const quizContainer = document.getElementById('quiz-container');

let currentQuestionIndex = 0;
let score = 0;

// --- FUNGSI MULAI ---
function startQuiz() {
  touchSound.play();
  music.volume = 0.65;
  music.play();
  openingScreen.style.display = 'none';
  quizContainer.style.display = 'block';
  showQuestion();
}

// --- TAMPILKAN PERTANYAAN ---
function showQuestion() {
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const feedbackElement = document.getElementById('feedback');
  const nextButton = document.getElementById('next-btn');
  const retryButton = document.getElementById('retry-btn');

  questionElement.innerText = questions[currentQuestionIndex].question;
  optionsElement.innerHTML = '';
  feedbackElement.innerText = '';
  nextButton.style.display = 'none';
  retryButton.style.display = 'none';

  questions[currentQuestionIndex].options.forEach((option, index) => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('option-btn');
    button.onclick = () => selectAnswer(index);
    optionsElement.appendChild(button);
  });
}

// --- PILIH JAWABAN ---
function selectAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].answer;
  const feedback = document.getElementById('feedback');
  const nextButton = document.getElementById('next-btn');
  const retryButton = document.getElementById('retry-btn');
  
  if (selectedIndex === correctIndex) {
    feedback.innerText = 'Benar!';
    correctSound.play();
    nextButton.style.display = 'block';  // Tombol Next muncul setelah benar
    score++;
  } else {
    feedback.innerText = 'Salah! Silakan coba lagi.';
    incorrectSound.play();
    retryButton.style.display = 'block';  // Tombol Retry muncul setelah salah
    nextButton.style.display = 'none';  // Tombol Next disembunyikan
  }

  // Disable semua tombol setelah menjawab
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);
}

// --- LANJUT KE PERTANYAAN BERIKUTNYA ---
function nextQuestion() {
  touchSound.play();
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// --- TAMPILKAN SKOR ---
function showScore() {
  const scoreContainer = document.getElementById('score-container');
  const retryButton = document.getElementById('retry-btn');
  const question = document.getElementById('question');
  const options = document.getElementById('options');
  const feedback = document.getElementById('feedback');
  const nextButton = document.getElementById('next-btn');

  question.style.display = 'none';
  options.style.display = 'none';
  feedback.style.display = 'none';
  nextButton.style.display = 'none';

  scoreContainer.style.display = 'block';
  retryButton.style.display = 'block';
  scoreContainer.innerHTML = `<h2>Skor Anda: ${score} / ${questions.length}</h2>`;
}

// --- ULANGI SOAL ---
function retryQuestion() {
  touchSound.play();
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = false);  // Mengaktifkan kembali tombol pilihan
  
  document.getElementById('feedback').innerText = '';  // Menghapus feedback
  document.getElementById('retry-btn').style.display = 'none';  // Menyembunyikan tombol Retry
  
  // Soal yang salah akan ditampilkan lagi
  showQuestion();
}

// --- ULANGI QUIZ ---
function retryQuiz() {
  touchSound.play();
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('question').style.display = 'block';
  document.getElementById('options').style.display = 'block';
  document.getElementById('feedback').style.display = 'block';
  document.getElementById('score-container').style.display = 'none';
  document.getElementById('retry-btn').style.display = 'none';
  showQuestion();
}