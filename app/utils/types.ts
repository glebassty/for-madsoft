type QuestionTypeProps =
  | "single-choice"
  | "multi-choice"
  | "short-answer"
  | "long-answer";

export type AnswerTypeProps = string[] | string | null;

export type StateProps = {
  currentStep: number;
  answers: Record<number, AnswerTypeProps>;
  setStep: (step: number) => void;
  setAnswer: (step: number, answer: AnswerTypeProps) => void;
  loadProgress: () => void;
};

export type QuizQuestionsProps = {
  id: number;
  type: QuestionTypeProps;
  question: string;
  options?: string[];
  maxLength?: number;
};

type BaseQuestionProps = {
  id: number;
  type:QuestionTypeProps
  question: string;
  options?: string[];
  maxLength?: number;
};

export type QuestionProps = BaseQuestionProps & {
  answer: string | string[] | null;
  setAnswer: (value: string | string[]) => void;
};

export type ValidateAnswerProps = {
  setError: (error: string) => void;
  currentQuestion: BaseQuestionProps;
  answers: Record<string, string | string[] | null>;
  handleNextStep: () => void;
};