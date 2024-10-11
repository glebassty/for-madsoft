import { create } from "zustand";
import { StateProps } from "../utils/types";


const STORAGE_KEY_STEP = "currentStep";
const STORAGE_KEY_ANSWERS = "answers";

export const useTestStore = create<StateProps>((set) => ({
  currentStep: 0,
  answers: {},
  setStep: (step) => {
    set(() => ({ currentStep: step }));
    localStorage.setItem(STORAGE_KEY_STEP, String(step));
  },
  setAnswer: (step, answer) => {
    set((state) => {
      const updatedAnswers = { ...state.answers, [step]: answer };
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(updatedAnswers));
      return { answers: updatedAnswers };
    });
  },

  loadProgress: () => {
    const savedStep = localStorage.getItem(STORAGE_KEY_STEP);
    const savedAnswers = localStorage.getItem(STORAGE_KEY_ANSWERS);
    if (savedStep !== null) {
      set({ currentStep: Number(savedStep) });
    }
    if (savedAnswers) {
      set({ answers: JSON.parse(savedAnswers) });
    }
  }
}));

