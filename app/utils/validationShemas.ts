import * as yup from "yup";

export const singleChoiceValidation = yup
  .string()
  .required("Выберите один вариант.");

export const multiChoiceValidation = yup
  .array()
  .min(2, "Выберите минимум два варианта.")
  .required("Выберите как минимум один вариант.");

export const shortAnswerValidation = yup
  .string()
  .max(50, "Ответ не должен превышать 50 символов.")
  .required("Введите короткий ответ.");

export const longAnswerValidation = yup
  .string()
  .max(1200, "Ответ не должен превышать 1200 символов.")
  .required("Введите развернутый ответ.");
