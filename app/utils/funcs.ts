import { ValidateAnswerProps } from "./types";
import {
  longAnswerValidation,
  multiChoiceValidation,
  shortAnswerValidation,
  singleChoiceValidation,
} from "./validationShemas";

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export const validateAnswer = async ({
  setError,
  currentQuestion,
  answers,
  handleNextStep,
}: ValidateAnswerProps) => {
  try {
    setError("");

    const answer = answers[currentQuestion.id.toString()];
    if (answer === null || (Array.isArray(answer) && answer.length === 0)) {
      throw new Error("Ответ не может быть пустым");
    }

    switch (currentQuestion.type) {
      case "single-choice":
        await singleChoiceValidation.validate(answer);
        break;
      case "multi-choice":
        await multiChoiceValidation.validate(answer);
        break;
      case "short-answer":
        await shortAnswerValidation.validate(answer);
        break;
      case "long-answer":
        await longAnswerValidation.validate(answer);
        break;
      default:
        throw new Error("Неверный тип вопроса");
    }

    handleNextStep();
  } catch (validationError) {
    if (validationError instanceof Error) {
      setError(validationError.message);
    } else {
      setError("Произошла неизвестная ошибка");
    }
  }
};
