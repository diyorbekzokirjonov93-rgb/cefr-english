import { useMemo, useState } from "react";
import "./index.css";

const LEVELS = [
  { id: "A1", title: "Boshlang‘ich", icon: "🌱" },
  { id: "A2", title: "Elementary", icon: "📗" },
  { id: "B1", title: "Intermediate", icon: "🚀" },
  { id: "B2", title: "Upper Intermediate", icon: "🔥" },
  { id: "C1", title: "Advanced", icon: "🎓" },
  { id: "C2", title: "Proficiency", icon: "👑" },
];

const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();

  document.documentElement.style.setProperty(
    "--tg-bg",
    tg.themeParams?.bg_color || "#ffffff"
  );

  document.documentElement.style.setProperty(
    "--tg-text",
    tg.themeParams?.text_color || "#111111"
  );
}
const telegramUser = tg?.initDataUnsafe?.user;

const userName =
  telegramUser?.first_name ||
  telegramUser?.username ||
  "Diyor";

const QUESTIONS = {
  A1: [
    {
      category: "Grammar",
      question: "My name ___ Ali.",
      options: ["am", "is", "are", "be"],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "I ___ a student.",
      options: ["am", "is", "are", "be"],
      answer: 0,
    },
    {
      category: "Grammar",
      question: "She ___ from Uzbekistan.",
      options: ["am", "are", "is", "be"],
      answer: 2,
    },
    {
      category: "Grammar",
      question: "They ___ my friends.",
      options: ["is", "am", "are", "be"],
      answer: 2,
    },
    {
      category: "Grammar",
      question: "He ___ football every Sunday.",
      options: ["play", "plays", "playing", "played"],
      answer: 1,
    },
    {
      category: "Vocabulary",
      question: "What is the opposite of 'big'?",
      options: ["tall", "small", "long", "high"],
      answer: 1,
    },
    {
      category: "Vocabulary",
      question: "A person who teaches students is a ___",
      options: ["doctor", "driver", "teacher", "farmer"],
      answer: 2,
    },
    {
      category: "Vocabulary",
      question: "Which one is a fruit?",
      options: ["apple", "table", "chair", "window"],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "'Book' means:",
      options: ["kitob", "qalam", "daftar", "stol"],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "Which one is a color?",
      options: ["Monday", "blue", "school", "water"],
      answer: 1,
    },
  ],

  A2: [
    {
      category: "Grammar",
      question: "Yesterday I ___ to school.",
      options: ["go", "went", "goes", "going"],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "She has ___ friends.",
      options: ["much", "many", "any", "a"],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "There ___ two books on the table.",
      options: ["is", "are", "am", "be"],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "I am ___ TV now.",
      options: ["watch", "watched", "watching", "watches"],
      answer: 2,
    },
    {
      category: "Vocabulary",
      question: "What is the opposite of 'expensive'?",
      options: ["cheap", "large", "modern", "slow"],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "A place where you can borrow books is a ___",
      options: ["hospital", "library", "station", "market"],
      answer: 1,
    },
    {
      category: "Vocabulary",
      question: "Someone who drives a bus is a ___",
      options: ["pilot", "driver", "chef", "teacher"],
      answer: 1,
    },
    {
      category: "Reading",
      question: "Sarah gets up at 7 o'clock every morning. What time does she get up?",
      options: ["6:00", "7:00", "8:00", "9:00"],
      answer: 1,
    },
    {
      category: "Reading",
      question: "Tom likes swimming, but he doesn't like football. What sport does Tom like?",
      options: ["Football", "Tennis", "Swimming", "Basketball"],
      answer: 2,
    },
    {
      category: "Vocabulary",
      question: "'Beautiful' means:",
      options: ["chiroyli", "qimmat", "tez", "kichik"],
      answer: 0,
    },
  ],

  B1: [
    {
      category: "Grammar",
      question: "If I have time, I ___ you tomorrow.",
      options: ["call", "called", "will call", "calling"],
      answer: 2,
    },
    {
      category: "Grammar",
      question: "She ___ English for three years.",
      options: ["studies", "has studied", "study", "studied"],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "This book ___ by George Orwell.",
      options: ["wrote", "was written", "writes", "writing"],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "I enjoy ___ books in my free time.",
      options: ["read", "reading", "to read", "reads"],
      answer: 1,
    },
    {
      category: "Vocabulary",
      question: "To 'improve' something means to:",
      options: ["make it better", "destroy it", "hide it", "forget it"],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "A person who designs buildings is an:",
      options: ["architect", "accountant", "athlete", "actor"],
      answer: 0,
    },
    {
      category: "Reading",
      question:
        "John decided to learn English because he wanted to study abroad. Why did he learn English?",
      options: [
        "For a job",
        "To study abroad",
        "To travel locally",
        "For sport",
      ],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "You ___ wear a seat belt in a car.",
      options: ["should", "might", "would", "could"],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "The opposite of 'ancient' is:",
      options: ["old", "historic", "modern", "traditional"],
      answer: 2,
    },
    {
      category: "Reading",
      question:
        "The meeting was cancelled because the manager was ill. Why was the meeting cancelled?",
      options: [
        "The office was closed",
        "The manager was ill",
        "Nobody came",
        "It was too late",
      ],
      answer: 1,
    },
  ],

  B2: [
    {
      category: "Grammar",
      question: "By the time we arrived, the film ___.",
      options: ["started", "had started", "starts", "has started"],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "If I ___ you, I would accept the offer.",
      options: ["am", "was", "were", "be"],
      answer: 2,
    },
    {
      category: "Grammar",
      question: "He denied ___ the information.",
      options: ["leak", "leaking", "to leak", "leaked"],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "The project must ___ by Friday.",
      options: ["complete", "completed", "be completed", "completing"],
      answer: 2,
    },
    {
      category: "Vocabulary",
      question: "Someone who is 'reliable' can usually be:",
      options: ["trusted", "ignored", "avoided", "confused"],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "To 'consider' something means to:",
      options: ["think about it", "remove it", "copy it", "lose it"],
      answer: 0,
    },
    {
      category: "Reading",
      question:
        "Although the weather was terrible, the team continued the match. What happened?",
      options: [
        "The match was cancelled",
        "The team continued playing",
        "The team went home",
        "The weather improved",
      ],
      answer: 1,
    },
    {
      category: "Vocabulary",
      question: "A 'significant' change is:",
      options: ["very small", "important or noticeable", "temporary", "secret"],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "She suggested that we ___ earlier.",
      options: ["leave", "left", "leaving", "to leave"],
      answer: 0,
    },
    {
      category: "Reading",
      question:
        "The company introduced flexible working hours to improve employee satisfaction. Why?",
      options: [
        "To reduce salaries",
        "To improve satisfaction",
        "To hire managers",
        "To close offices",
      ],
      answer: 1,
    },
  ],

  C1: [
    {
      category: "Grammar",
      question: "Had I known about the problem, I ___ differently.",
      options: [
        "would have acted",
        "will act",
        "act",
        "would act",
      ],
      answer: 0,
    },
    {
      category: "Grammar",
      question: "It is essential that every applicant ___ the form.",
      options: ["complete", "completes", "completed", "completing"],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "To 'mitigate' a problem means to:",
      options: [
        "make it less severe",
        "create it",
        "ignore it",
        "repeat it",
      ],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "If an argument is 'compelling', it is:",
      options: [
        "unconvincing",
        "highly persuasive",
        "irrelevant",
        "unclear",
      ],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "Rarely ___ such an impressive performance.",
      options: [
        "we see",
        "do we see",
        "we saw",
        "did we saw",
      ],
      answer: 1,
    },
    {
      category: "Reading",
      question:
        "The report highlights several shortcomings in the current system. What does 'shortcomings' mean?",
      options: ["advantages", "problems or weaknesses", "results", "solutions"],
      answer: 1,
    },
    {
      category: "Vocabulary",
      question: "A 'substantial' amount is:",
      options: ["tiny", "considerable", "unknown", "imaginary"],
      answer: 1,
    },
    {
      category: "Grammar",
      question: "No sooner had he arrived ___ the meeting began.",
      options: ["when", "than", "then", "that"],
      answer: 1,
    },
    {
      category: "Reading",
      question:
        "The proposal was rejected on the grounds that it was financially impractical. Why was it rejected?",
      options: [
        "It was too expensive or unrealistic financially",
        "It was illegal",
        "It was too popular",
        "It was incomplete",
      ],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "To 'allocate' resources means to:",
      options: [
        "distribute them for specific purposes",
        "destroy them",
        "hide them",
        "borrow them",
      ],
      answer: 0,
    },
  ],

  C2: [
    {
      category: "Vocabulary",
      question: "To 'unequivocal' mean:",
      options: [
        "ambiguous",
        "completely clear",
        "temporary",
        "unlikely",
      ],
      answer: 1,
    },
    {
      category: "Vocabulary",
      question: "A 'pervasive' influence is one that:",
      options: [
        "is widespread",
        "is invisible",
        "is weak",
        "is temporary",
      ],
      answer: 0,
    },
    {
      category: "Grammar",
      question:
        "Were it not for your assistance, the project ___ completed on time.",
      options: [
        "would not have been",
        "will not be",
        "is not",
        "was not",
      ],
      answer: 0,
    },
    {
      category: "Grammar",
      question:
        "Much as I ___ to help, there is little I can do.",
      options: ["would like", "liked", "like to", "am liking"],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "If something is 'intrinsic', it is:",
      options: [
        "naturally part of something",
        "externally imposed",
        "temporary",
        "unrelated",
      ],
      answer: 0,
    },
    {
      category: "Reading",
      question:
        "The author's argument is nuanced rather than categorical. What does this suggest?",
      options: [
        "It considers several complexities",
        "It gives only one simple answer",
        "It contains no evidence",
        "It is completely wrong",
      ],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "To 'exacerbate' a situation means to:",
      options: [
        "make it worse",
        "solve it",
        "explain it",
        "avoid it",
      ],
      answer: 0,
    },
    {
      category: "Grammar",
      question: "Not until midnight ___ the final results announced.",
      options: [
        "were",
        "was",
        "did",
        "had",
      ],
      answer: 0,
    },
    {
      category: "Vocabulary",
      question: "A 'plausible' explanation is:",
      options: [
        "reasonably believable",
        "obviously false",
        "impossible",
        "irrelevant",
      ],
      answer: 0,
    },
    {
      category: "Reading",
      question:
        "The evidence is inconclusive. What does this mean?",
      options: [
        "It proves everything",
        "It does not provide a definite conclusion",
        "It is fabricated",
        "It is unnecessary",
      ],
      answer: 1,
    },
  ],
};

const VOCABULARY = [
  ["achieve", "erishmoq", "She worked hard to achieve her goal."],
  ["improve", "yaxshilamoq", "I want to improve my English."],
  ["challenge", "qiyinchilik", "Learning English can be a challenge."],
  ["confident", "o‘ziga ishongan", "She feels confident when speaking English."],
  ["knowledge", "bilim", "Knowledge is important for success."],
  ["opportunity", "imkoniyat", "This course is a great opportunity."],
  ["environment", "atrof-muhit", "We should protect the environment."],
  ["decision", "qaror", "He made an important decision."],
];

const GRAMMAR = [
  {
    title: "Present Simple",
    icon: "🟢",
    text: "Present Simple odatlar, kundalik ishlar va umumiy haqiqatlar uchun ishlatiladi.",
    examples: [
      "I study English every day.",
      "She works at a school.",
      "They play football on Sundays.",
    ],
  },
  {
    title: "Present Continuous",
    icon: "🔵",
    text: "Hozir ayni vaqtda davom etayotgan ish-harakatni ifodalaydi.",
    examples: [
      "I am studying now.",
      "She is reading a book.",
      "They are playing football.",
    ],
  },
  {
    title: "Past Simple",
    icon: "🟠",
    text: "O‘tmishda sodir bo‘lib tugagan ish-harakatlar uchun ishlatiladi.",
    examples: [
      "I visited Tashkent yesterday.",
      "She watched a movie.",
      "They went to school.",
    ],
  },
  {
    title: "Future Simple",
    icon: "🟣",
    text: "Kelajakdagi reja, taxmin yoki qarorlarni ifodalashda ishlatiladi.",
    examples: [
      "I will call you tomorrow.",
      "She will study tonight.",
      "They will come later.",
    ],
  },
];

function App()
 function App() {
  const allowedPages = [
    "home",
    "cefr",
    "tests",
    "test",
    "vocabulary",
    "grammar",
    "results",
    "ranking",
    "profile",
    "about",
  ];

  const getInitialPage = () => {
    const requestedPage = new URLSearchParams(
      window.location.search
    ).get("page");

    return allowedPages.includes(requestedPage)
      ? requestedPage
      : "home";
  };

  const [page, setPage] = useState(getInitialPage());

  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [testDone, setTestDone] = useState(false);

  const [results, setResults] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cefr_results")) || [];
    } catch {
      return [];
    }
  });

  const [vocabIndex, setVocabIndex] = useState(0);
  const [grammarIndex, setGrammarIndex] = useState(0);

  const questions = QUESTIONS[selectedLevel];

  const currentQuestion = questions[questionIndex];

  const totalScore = useMemo(
    () => results.reduce((sum, item) => sum + item.score, 0),
    [results]
  );

  const startTest = (level) => {
    setSelectedLevel(level);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTestDone(false);
    setPage("test");
  };

  const answerQuestion = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    if (index === currentQuestion.answer) {
      setScore((old) => old + 1);
    }
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((old) => old + 1);
      setSelectedAnswer(null);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    const finalScore =
      score +
      (selectedAnswer === currentQuestion.answer ? 1 : 0);

    const result = {
      id: Date.now(),
      level: selectedLevel,
      score: finalScore,
      total: questions.length,
      percent: Math.round((finalScore / questions.length) * 100),
      date: new Date().toLocaleDateString("uz-UZ"),
    };

    const newResults = [result, ...results];

    setResults(newResults);

    localStorage.setItem(
      "cefr_results",
      JSON.stringify(newResults)
    );

    setScore(finalScore);
    setTestDone(true);
  };

  const goHome = () => {
    setPage("home");
  };

  const getLevelTitle = (level) => {
    return (
      LEVELS.find((item) => item.id === level)?.title || ""
    );
  };

  /* =========================
     HOME
  ========================= */

  if (page === "home") {
    return (
      <div className="app">
        <main className="home">
          <section className="hero">
            <div className="hero-flag">🇬🇧</div>

            <p>CEFR ENGLISH</p>

            <h1>👋 Salom, {userName}!</h1>

            <span>
              Ingliz tilini bosqichma-bosqich o‘rganamiz.
            </span>
          </section>

          <section className="main-menu">
            <button
              className="main-menu-card featured"
              onClick={() => setPage("cefr")}
            >
              <div className="menu-icon">🇬🇧</div>

              <div>
                <strong>CEFR IMTIHONI</strong>
                <span>
                  Listening • Reading • Writing • Speaking
                </span>
              </div>

              <b>→</b>
            </button>

            <button
              className="main-menu-card"
              onClick={() => setPage("vocabulary")}
            >
              <div className="menu-icon">📚</div>

              <div>
                <strong>Vocabulary</strong>
                <span>Yangi so‘zlarni o‘rganing</span>
              </div>

              <b>→</b>
            </button>

            <button
              className="main-menu-card"
              onClick={() => setPage("grammar")}
            >
              <div className="menu-icon">📕</div>

              <div>
                <strong>Grammar</strong>
                <span>Grammatika qoidalari</span>
              </div>

              <b>→</b>
            </button>

            <button
              className="main-menu-card"
              onClick={() => setPage("tests")}
            >
              <div className="menu-icon">📝</div>

              <div>
                <strong>Testlar</strong>
                <span>A1 dan C2 gacha testlar</span>
              </div>

              <b>→</b>
            </button>

            <button
              className="main-menu-card"
              onClick={() => setPage("results")}
            >
              <div className="menu-icon">📊</div>

              <div>
                <strong>Natijalarim</strong>
                <span>Test natijalarini ko‘rish</span>
              </div>

              <b>→</b>
            </button>

            <button
              className="main-menu-card"
              onClick={() => setPage("ranking")}
            >
              <div className="menu-icon">🏆</div>

              <div>
                <strong>Reyting</strong>
                <span>O‘z natijangizni kuzating</span>
              </div>

              <b>→</b>
            </button>

            <button
              className="main-menu-card"
              onClick={() => setPage("profile")}
            >
              <div className="menu-icon">👤</div>

              <div>
                <strong>Profil</strong>
                <span>Shaxsiy statistika</span>
              </div>

              <b>→</b>
            </button>

            <button
              className="main-menu-card"
              onClick={() => setPage("about")}
            >
              <div className="menu-icon">ℹ️</div>

              <div>
                <strong>Bot haqida</strong>
                <span>CEFR English haqida</span>
              </div>

              <b>→</b>
            </button>
          </section>
        </main>

        <BottomNav page={page} setPage={setPage} />
      </div>
    );
  }

  /* =========================
     CEFR
  ========================= */

  if (page === "cefr" || page === "tests") {
    return (
      <div className="app">
        <main className="page">
          <button
            className="back-button"
            onClick={goHome}
          >
            ← Bosh sahifa
          </button>

          <div className="section-header">
            <div className="section-icon">🇬🇧</div>

            <div>
              <h1>
                {page === "tests"
                  ? "Testlar"
                  : "CEFR imtihoni"}
              </h1>

              <p>
                O‘zingizga mos darajani tanlang
              </p>
            </div>
          </div>

          <div className="cefr-grid">
            {LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => startTest(level.id)}
              >
                <div>{level.icon}</div>

                <strong>{level.id}</strong>

                <span>{level.title}</span>
              </button>
            ))}
          </div>
        </main>

        <BottomNav page={page} setPage={setPage} />
      </div>
    );
  }

  /* =========================
     TEST
  ========================= */

  if (page === "test") {
    if (testDone) {
      const percentage = Math.round(
        (score / questions.length) * 100
      );

      let message = "Ko‘proq mashq qilamiz 📚";

      if (percentage >= 90) {
        message = "Ajoyib natija! 🔥";
      } else if (percentage >= 70) {
        message = "Juda yaxshi! 👏";
      } else if (percentage >= 50) {
        message = "Yaxshi natija! 💪";
      }

      return (
        <div className="app">
          <main className="page">
            <div className="result-card">
              <div className="result-icon">🎉</div>

              <h1>Test tugadi!</h1>

              <div className="result-level">
                {selectedLevel} — {getLevelTitle(selectedLevel)}
              </div>

              <div className="result-score">
                {score} / {questions.length}
              </div>

              <div className="result-percent">
                {percentage}%
              </div>

              <p>{message}</p>

              <div className="result-actions">
                <button
                  className="primary-button"
                  onClick={() => startTest(selectedLevel)}
                >
                  🔄 Qayta ishlash
                </button>

                <button
                  className="secondary-button"
                  onClick={() => setPage("results")}
                >
                  📊 Natijalarim
                </button>

                <button
                  className="secondary-button"
                  onClick={goHome}
                >
                  🏠 Bosh sahifa
                </button>
              </div>
            </div>
          </main>
        </div>
      );
    }

    const percentage = Math.round(
      ((questionIndex + 1) / questions.length) * 100
    );

    const isCorrect =
      selectedAnswer !== null &&
      selectedAnswer === currentQuestion.answer;

    return (
      <div className="app">
        <main className="page">
          <button
            className="back-button"
            onClick={() => setPage("tests")}
          >
            ← Testlar
          </button>

          <div className="test-header">
            <div>
              <span>{selectedLevel} LEVEL</span>
              <h2>CEFR Test</h2>
            </div>

            <div className="test-count">
              {questionIndex + 1}/{questions.length}
            </div>
          </div>

          <div className="progress-text">
            {percentage}% completed
          </div>

          <div className="progress-bar">
            <div style={{ width: `${percentage}%` }} />
          </div>

          <div className="question-card">
            <div className="question-number">
              {currentQuestion.category}
            </div>

            <h2>{currentQuestion.question}</h2>

            <div className="test-options">
              {currentQuestion.options.map(
                (option, index) => {
                  let className = "test-option";

                  if (selectedAnswer !== null) {
                    if (
                      index === currentQuestion.answer
                    ) {
                      className += " correct";
                    } else if (
                      index === selectedAnswer
                    ) {
                      className += " wrong";
                    }
                  }

                  return (
                    <button
                      key={index}
                      className={className}
                      onClick={() =>
                        answerQuestion(index)
                      }
                    >
                      <span>
                        {String.fromCharCode(65 + index)}
                      </span>

                      {option}

                      {selectedAnswer !== null &&
                        index ===
                          currentQuestion.answer && (
                          <b>✓</b>
                        )}

                      {selectedAnswer === index &&
                        index !==
                          currentQuestion.answer && (
                          <b>✕</b>
                        )}
                    </button>
                  );
                }
              )}
            </div>

            {selectedAnswer !== null && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "12px",
                  borderRadius: "12px",
                  background: isCorrect
                    ? "#ecfdf3"
                    : "#fef2f2",
                  color: isCorrect
                    ? "#166534"
                    : "#991b1b",
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                {isCorrect
                  ? "✅ To‘g‘ri javob!"
                  : `❌ To‘g‘ri javob: ${
                      currentQuestion.options[
                        currentQuestion.answer
                      ]
                    }`}
              </div>
            )}

            <button
              className="primary-button next-question"
              disabled={selectedAnswer === null}
              onClick={nextQuestion}
            >
              {questionIndex === questions.length - 1
                ? "🎯 Natijani ko‘rish"
                : "Keyingi savol →"}
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* =========================
     VOCABULARY
  ========================= */

  if (page === "vocabulary") {
    const word = VOCABULARY[vocabIndex];

    return (
      <div className="app">
        <main className="page">
          <button
            className="back-button"
            onClick={goHome}
          >
            ← Bosh sahifa
          </button>

          <div className="section-header">
            <div className="section-icon">📚</div>

            <div>
              <h1>Vocabulary</h1>
              <p>Yangi so‘zlarni o‘rganing</p>
            </div>
          </div>

          <div className="lesson-top">
            <span>Word</span>
            <strong>
              {vocabIndex + 1}/{VOCABULARY.length}
            </strong>
          </div>

          <div className="word-card">
            <div className="word-label">
              ENGLISH WORD
            </div>

            <h1>{word[0]}</h1>

            <div className="translation">
              🇺🇿 {word[1]}
            </div>

            <div className="example-box">
              <strong>Example</strong>
              <p>{word[2]}</p>
            </div>
          </div>

          <div className="lesson-actions">
            <button
              className="secondary-button"
              onClick={() =>
                setVocabIndex(
                  (vocabIndex - 1 + VOCABULARY.length) %
                    VOCABULARY.length
                )
              }
            >
              ← Oldingi
            </button>

            <button
              className="primary-button"
              onClick={() =>
                setVocabIndex(
                  (vocabIndex + 1) %
                    VOCABULARY.length
                )
              }
            >
              Keyingi →
            </button>
          </div>
        </main>

        <BottomNav page={page} setPage={setPage} />
      </div>
    );
  }

  /* =========================
     GRAMMAR
  ========================= */

  if (page === "grammar") {
    const grammar = GRAMMAR[grammarIndex];

    return (
      <div className="app">
        <main className="page">
          <button
            className="back-button"
            onClick={goHome}
          >
            ← Bosh sahifa
          </button>

          <div className="section-header">
            <div className="section-icon">📕</div>

            <div>
              <h1>Grammar</h1>
              <p>Grammatika qoidalarini o‘rganing</p>
            </div>
          </div>

          <div className="grammar-card">
            <div className="grammar-title">
              <span>{grammar.icon}</span>
              <h1>{grammar.title}</h1>
            </div>

            <div className="explanation">
              <h3>📖 Tushuntirish</h3>
              <p>{grammar.text}</p>
            </div>

            <div className="examples">
              <h3>💡 Misollar</h3>

              {grammar.examples.map(
                (example, index) => (
                  <div
                    className="example-line"
                    key={index}
                  >
                    {example}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="lesson-actions">
            <button
              className="secondary-button"
              onClick={() =>
                setGrammarIndex(
                  (grammarIndex - 1 + GRAMMAR.length) %
                    GRAMMAR.length
                )
              }
            >
              ← Oldingi
            </button>

            <button
              className="primary-button"
              onClick={() =>
                setGrammarIndex(
                  (grammarIndex + 1) % GRAMMAR.length
                )
              }
            >
              Keyingi →
            </button>
          </div>
        </main>

        <BottomNav page={page} setPage={setPage} />
      </div>
    );
  }

  /* =========================
     RESULTS
  ========================= */

  if (page === "results") {
    const best =
      results.length > 0
        ? Math.max(...results.map((r) => r.percent))
        : 0;

    return (
      <div className="app">
        <main className="page">
          <button
            className="back-button"
            onClick={goHome}
          >
            ← Bosh sahifa
          </button>

          <div className="section-header">
            <div className="section-icon">📊</div>

            <div>
              <h1>Natijalarim</h1>
              <p>Test tarixingiz</p>
            </div>
          </div>

          <div className="overall-result">
            <span>Eng yaxshi natija</span>
            <strong>{best}%</strong>
            <small>
              Jami testlar: {results.length}
            </small>
          </div>

          {results.length === 0 ? (
            <div className="empty-state">
              <div>📝</div>
              <h2>Hali test ishlamagansiz</h2>
              <p>
                Birinchi testni boshlang va natijangiz shu
                yerda ko‘rinadi.
              </p>

              <button
                className="primary-button"
                onClick={() => setPage("tests")}
              >
                Testni boshlash
              </button>
            </div>
          ) : (
            <div className="stats-list">
              {results.map((result) => (
                <div className="stat" key={result.id}>
                  <div className="stat-top">
                    <strong>
                      {result.level} —{" "}
                      {getLevelTitle(result.level)}
                    </strong>

                    <strong>
                      {result.score}/{result.total}
                    </strong>
                  </div>

                  <div className="progress-bar small">
                    <div
                      style={{
                        width: `${result.percent}%`,
                      }}
                    />
                  </div>

                  <small>
                    {result.percent}% • {result.date}
                  </small>
                </div>
              ))}
            </div>
          )}
        </main>

        <BottomNav page={page} setPage={setPage} />
      </div>
    );
  }

  /* =========================
     RANKING
  ========================= */

  if (page === "ranking") {
    return (
      <div className="app">
        <main className="page">
          <button
            className="back-button"
            onClick={goHome}
          >
            ← Bosh sahifa
          </button>

          <div className="section-header">
            <div className="section-icon">🏆</div>

            <div>
              <h1>Reyting</h1>
              <p>Sizning umumiy ballaringiz</p>
            </div>
          </div>

          <div className="ranking-list">
            <div className="ranking-item top-rank">
              <div className="rank-number">🥇</div>

              <div className="ranking-avatar">D</div>

              <div className="ranking-user">
                <strong>Diyor</strong>
                <span>Siz</span>
              </div>

              <div className="ranking-xp">
                <strong>{totalScore} XP</strong>
                <span>ball</span>
              </div>
            </div>

            <div className="ranking-item">
              <div className="rank-number">🥈</div>

              <div className="ranking-avatar">A</div>

              <div className="ranking-user">
                <strong>Aziz</strong>
                <span>Demo user</span>
              </div>

              <div className="ranking-xp">
                <strong>42 XP</strong>
                <span>ball</span>
              </div>
            </div>

            <div className="ranking-item">
              <div className="rank-number">🥉</div>

              <div className="ranking-avatar">S</div>

              <div className="ranking-user">
                <strong>Sardor</strong>
                <span>Demo user</span>
              </div>

              <div className="ranking-xp">
                <strong>35 XP</strong>
                <span>ball</span>
              </div>
            </div>
          </div>
        </main>

        <BottomNav page={page} setPage={setPage} />
      </div>
    );
  }

  /* =========================
     PROFILE
  ========================= */

  if (page === "profile") {
    const best =
      results.length > 0
        ? Math.max(...results.map((r) => r.percent))
        : 0;

    return (
      <div className="app">
        <main className="page">
          <button
            className="back-button"
            onClick={goHome}
          >
            ← Bosh sahifa
          </button>

          <div className="profile-header">
            <div className="profile-avatar">
              D
            </div>

            <h1>Diyor</h1>

            <p>CEFR English o‘quvchisi</p>

            <div className="profile-level">
              {results.length
                ? results[0].level
                : "A1"}
            </div>
          </div>

          <div className="profile-cards">
            <div>
              <strong>{results.length}</strong>
              <span>Testlar</span>
            </div>

            <div>
              <strong>{totalScore}</strong>
              <span>Ball</span>
            </div>

            <div>
              <strong>{best}%</strong>
              <span>Rekord</span>
            </div>
          </div>

          <div className="profile-section">
            <h2>🏅 Yutuqlar</h2>

            <div className="achievements">
              <div className="achievement">
                <span>🚀</span>

                <div>
                  <strong>First Test</strong>
                  <small>
                    Birinchi testni yakunlang
                  </small>
                </div>

                <b>
                  {results.length > 0 ? "✓" : "🔒"}
                </b>
              </div>

              <div
                className={
                  results.length >= 5
                    ? "achievement"
                    : "achievement locked"
                }
              >
                <span>🔥</span>

                <div>
                  <strong>5 Tests</strong>
                  <small>
                    5 ta test ishlang
                  </small>
                </div>

                <b>
                  {results.length >= 5
                    ? "✓"
                    : "🔒"}
                </b>
              </div>
            </div>
          </div>
        </main>

        <BottomNav page={page} setPage={setPage} />
      </div>
    );
  }

  /* =========================
     ABOUT
  ========================= */

  if (page === "about") {
    return (
      <div className="app">
        <main className="page">
          <button
            className="back-button"
            onClick={goHome}
          >
            ← Bosh sahifa
          </button>

          <div className="about-card">
            <div className="about-logo">🇬🇧</div>

            <h1>CEFR English</h1>

            <p>
              Ingliz tilini A1 dan C2 gacha o‘rganish,
              test ishlash va natijalarni kuzatish uchun
              mo‘ljallangan platforma.
            </p>

            <div className="about-section">
              <h2>📚 Darajalar</h2>

              {LEVELS.map((level) => (
                <div
                  className="level-info"
                  key={level.id}
                >
                  <strong>{level.id}</strong>

                  <div>
                    <b>{level.title}</b>
                    <span>
                      CEFR English level
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="developer-box">
              <span>💻</span>

              <div>
                <strong>CEFR English</strong>
                <p>Learning platform</p>
              </div>
            </div>

            <small className="version">
              Version 1.0
            </small>
          </div>
        </main>

        <BottomNav page={page} setPage={setPage} />
      </div>
    );
  }

  return null;
}

function BottomNav({ page, setPage }) {
  return (
    <nav className="bottom-nav">
      <button
        className={page === "home" ? "active" : ""}
        onClick={() => setPage("home")}
      >
        <span>🏠</span>
        <small>Bosh sahifa</small>
      </button>

      <button
        className={
          page === "tests" || page === "cefr"
            ? "active"
            : ""
        }
        onClick={() => setPage("tests")}
      >
        <span>📝</span>
        <small>Testlar</small>
      </button>

      <button
        className={page === "results" ? "active" : ""}
        onClick={() => setPage("results")}
      >
        <span>📊</span>
        <small>Natijalar</small>
      </button>

      <button
        className={page === "profile" ? "active" : ""}
        onClick={() => setPage("profile")}
      >
        <span>👤</span>
        <small>Profil</small>
      </button>
    </nav>
  );
}

export default App;
