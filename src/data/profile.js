export const defaultProfile = {
  id: null,
  name: "Diyor",
  username: "@diyor",
  level: "B1",
  xp: 840,
  testsCompleted: 27,
  streak: 7,

  joinedAt: "2026-09-26",

  statistics: {
    listening: 72,
    reading: 84,
    writing: 80,
    speaking: 82,
    vocabulary: 85,
    grammar: 78,
  },

  achievements: [
    {
      id: 1,
      icon: "🔥",
      title: "7 kunlik streak",
      description:
        "7 kun ketma-ket mashq qildingiz",
      unlocked: true,
    },
    {
      id: 2,
      icon: "🎧",
      title: "Listening Master",
      description:
        "10 ta Listening test bajaring",
      unlocked: true,
    },
    {
      id: 3,
      icon: "📚",
      title: "Vocabulary Pro",
      description:
        "100 ta yangi so‘z o‘rganing",
      unlocked: false,
    },
    {
      id: 4,
      icon: "🏆",
      title: "CEFR Champion",
      description:
        "B2 darajaga erishing",
      unlocked: false,
    },
  ],
};