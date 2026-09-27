export const grammar = {
  A1: [
    {
      id: 1,
      title: "Present Simple",
      explanation:
        "Present Simple odatiy yoki takrorlanadigan harakatlar uchun ishlatiladi.",
      examples: [
        "I go to school every day.",
        "She likes English.",
        "They play football.",
      ],
      question:
        "She ___ English every day.",
      options: [
        "study",
        "studies",
        "studying",
        "studied",
      ],
      answer: 1,
    },
    {
      id: 2,
      title: "To Be",
      explanation:
        "Am, is va are hozirgi zamonda kimdir yoki nimadir haqida ma’lumot berish uchun ishlatiladi.",
      examples: [
        "I am a student.",
        "He is my friend.",
        "They are happy.",
      ],
      question:
        "They ___ students.",
      options: [
        "am",
        "is",
        "are",
        "be",
      ],
      answer: 2,
    },
  ],

  A2: [
    {
      id: 1,
      title: "Past Simple",
      explanation:
        "Past Simple o'tgan zamonda sodir bo‘lgan harakatlar uchun ishlatiladi.",
      examples: [
        "I visited London last year.",
        "She watched a movie yesterday.",
      ],
      question:
        "We ___ football yesterday.",
      options: [
        "play",
        "played",
        "playing",
        "plays",
      ],
      answer: 1,
    },
    {
      id: 2,
      title: "Comparatives",
      explanation:
        "Comparative ikki narsani solishtirish uchun ishlatiladi.",
      examples: [
        "My car is faster than yours.",
        "This book is more interesting.",
      ],
      question:
        "Ali is ___ than Tom.",
      options: [
        "tall",
        "taller",
        "tallest",
        "more tall",
      ],
      answer: 1,
    },
  ],

  B1: [
    {
      id: 1,
      title: "Present Perfect",
      explanation:
        "Present Perfect o'tmishda boshlangan va hozir bilan bog‘liq bo‘lgan holatlar uchun ishlatiladi.",
      examples: [
        "I have finished my homework.",
        "She has visited Paris.",
      ],
      question:
        "I ___ my homework.",
      options: [
        "have finished",
        "finished",
        "finish",
        "finishing",
      ],
      answer: 0,
    },
    {
      id: 2,
      title: "First Conditional",
      explanation:
        "First Conditional kelajakda yuz berishi mumkin bo‘lgan real shartlar uchun ishlatiladi.",
      examples: [
        "If it rains, I will stay home.",
        "If I study, I will pass.",
      ],
      question:
        "If I study hard, I ___ the exam.",
      options: [
        "pass",
        "passed",
        "will pass",
        "passing",
      ],
      answer: 2,
    },
  ],

  B2: [
    {
      id: 1,
      title: "Second Conditional",
      explanation:
        "Second Conditional hozirgi yoki kelajakdagi tasavvuriy vaziyatlar uchun ishlatiladi.",
      examples: [
        "If I had more time, I would travel.",
        "If she were here, she would help.",
      ],
      question:
        "If I had money, I ___ a new car.",
      options: [
        "buy",
        "bought",
        "would buy",
        "will buy",
      ],
      answer: 2,
    },
    {
      id: 2,
      title: "Passive Voice",
      explanation:
        "Passive Voice harakatni kim bajarganidan ko‘ra harakatning o‘ziga e’tibor berilganda ishlatiladi.",
      examples: [
        "The book was written in 2020.",
        "English is spoken worldwide.",
      ],
      question:
        "The house ___ last year.",
      options: [
        "built",
        "was built",
        "build",
        "is build",
      ],
      answer: 1,
    },
  ],

  C1: [
    {
      id: 1,
      title: "Mixed Conditionals",
      explanation:
        "Mixed Conditionals turli vaqtlarni bog‘lab, murakkab shartli gaplarni ifodalash uchun ishlatiladi.",
      examples: [
        "If I had studied harder, I would have a better job now.",
      ],
      question:
        "If she had studied medicine, she ___ a doctor now.",
      options: [
        "would be",
        "will be",
        "is",
        "was",
      ],
      answer: 0,
    },
    {
      id: 2,
      title: "Inversion",
      explanation:
        "Inversion rasmiy va kuchli ta’kidga ega gaplarda yordamchi fe’lni egadan oldinga chiqaradi.",
      examples: [
        "Rarely do we see such talent.",
        "Never have I experienced this.",
      ],
      question:
        "Never ___ such a beautiful place.",
      options: [
        "I have seen",
        "have I seen",
        "I saw",
        "did I see",
      ],
      answer: 1,
    },
  ],

  C2: [
    {
      id: 1,
      title: "Advanced Inversion",
      explanation:
        "Advanced inversion murakkab va rasmiy ingliz tilida ta’kid berish uchun ishlatiladi.",
      examples: [
        "Had I known, I would have acted differently.",
      ],
      question:
        "Had I known about it, I ___ earlier.",
      options: [
        "would have arrived",
        "will arrive",
        "arrive",
        "arrived",
      ],
      answer: 0,
    },
    {
      id: 2,
      title: "Advanced Modal Perfect",
      explanation:
        "Modal Perfect o'tmishdagi ehtimol, taxmin yoki pushaymonlikni ifodalashi mumkin.",
      examples: [
        "He might have forgotten.",
        "She should have called.",
      ],
      question:
        "He ___ forgotten the meeting.",
      options: [
        "might have",
        "might has",
        "might",
        "has might",
      ],
      answer: 0,
    },
  ],
};