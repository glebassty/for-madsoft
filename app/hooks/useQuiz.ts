"use client";

import { useState, useEffect, useCallback } from "react";
import { AnswerTypeProps } from "../utils/types";
import { TOTAL_TIME } from "../utils/consts";

export const useQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0); 
  const [answers, setAnswers] = useState<Record<number, AnswerTypeProps>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME * 60);

  const handleSubmit = useCallback(() => {
    console.log("Ответы:", answers);
    alert("Тест завершен! Ваши ответы сохранены.");
    localStorage.removeItem("quizProgress");
    localStorage.removeItem("quizTimeLeft");
    resetQuiz();
  }, [answers]); 

  useEffect(() => {
    const savedProgress = localStorage.getItem("quizProgress");
    const savedTime = localStorage.getItem("quizTimeLeft");

    if (savedProgress) {
      const { step, savedAnswers } = JSON.parse(savedProgress);
      setCurrentStep(step);
      setAnswers(savedAnswers);
    }

    if (savedTime) {
      setTimeLeft(parseInt(savedTime, 10));
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        localStorage.setItem("quizTimeLeft", String(newTime));
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  const handleSetAnswer = (questionId: number, value: AnswerTypeProps) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);

    localStorage.setItem(
      "quizProgress",
      JSON.stringify({ step: currentStep, savedAnswers: updatedAnswers })
    );
  };

  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    localStorage.setItem(
      "quizProgress",
      JSON.stringify({ step: nextStep, savedAnswers: answers })
    );
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      localStorage.setItem(
        "quizProgress",
        JSON.stringify({ step: currentStep - 1, savedAnswers: answers })
      );
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setTimeLeft(TOTAL_TIME * 60);
    localStorage.removeItem("quizProgress");
    localStorage.removeItem("quizTimeLeft");
  };

  return {
    currentStep,
    answers,
    timeLeft,
    handleSetAnswer,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    resetQuiz,
  };
};
