import { QuizQuestionsProps } from "./types";

export const QUIZ_QUESTIONS: QuizQuestionsProps[] = [
  {
    id: 1,
    type: "single-choice",
    question: "Какая страна является самой большой по площади?",
    options: ["Китай", "Канада", "Россия"],
  },
  {
    id: 2,
    type: "multi-choice",
    question: "Выберите страны, которые входят в EAЭС:",
    options: ["Кыргызстан", "Армения", "Грузия", "Таджикистан"],
  },
  {
    id: 3,
    type: "short-answer",
    question: "Назовите крупнейшую пустыню мира.",
    maxLength: 50,
  },
  {
    id: 4,
    type: "long-answer",
    question: "Опишите влияние глобального потепления на изменение климата в России.",
  },
];
  
export const TOTAL_TIME = 10;