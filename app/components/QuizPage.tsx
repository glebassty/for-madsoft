"use client";

import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Box,
  Typography,
} from "@mui/material";
import Question from "./Question";
import { formatTime, validateAnswer } from "../utils/funcs";
import { useQuiz } from "../hooks/useQuiz";
import { QUIZ_QUESTIONS } from "../utils/consts";
import { useState } from "react";

const QuizPage = () => {
  const [error, setError] = useState("");
  const {
    currentStep,
    answers,
    timeLeft,
    handleSetAnswer,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
  } = useQuiz();

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const handlePreviousButton = () => {
    setError("");
    handlePreviousStep();
  };
  return (
    <Box className="p-4 max-w-xl mx-auto">
      <Typography variant="h5" gutterBottom className="text-center p-2">
        Осталось времени: {formatTime(timeLeft)}
      </Typography>
      <Stepper activeStep={currentStep} className="my-6">
        {QUIZ_QUESTIONS.map((_, index) => (
          <Step key={index}>
            <StepLabel>Вопрос {index + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Question
        id={currentQuestion.id}
        key={currentQuestion.id}
        type={currentQuestion.type}
        question={currentQuestion.question}
        options={currentQuestion.options}
        answer={answers[currentQuestion.id] || ""}
        setAnswer={(value) => handleSetAnswer(currentQuestion.id, value)}
        maxLength={currentQuestion.maxLength}
      />
      <div className="mt-2 h-5">
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <p className="invisible">Placeholder</p>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <Button disabled={currentStep === 0} onClick={handlePreviousButton}>
          Назад
        </Button>
        <Button
          onClick={
            currentStep === QUIZ_QUESTIONS.length - 1
              ? () =>
                  validateAnswer({
                    setError,
                    currentQuestion,
                    answers,
                    handleNextStep: handleSubmit,
                  })
              : () =>
                  validateAnswer({
                    setError,
                    currentQuestion,
                    answers,
                    handleNextStep,
                  })
          }
        >
          {currentStep === QUIZ_QUESTIONS.length - 1 ? "Завершить" : "Далее"}
        </Button>
      </div>
    </Box>
  );
};

export default QuizPage;
