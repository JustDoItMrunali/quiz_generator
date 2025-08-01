import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { QuizState, QuizConfig, QuizQuestion } from '../types/quiz';
import { generateQuizQuestions } from '../services/geminiApi';

type QuizAction =
  | { type: 'SET_CONFIG'; payload: QuizConfig }
  | { type: 'SET_QUESTIONS'; payload: QuizQuestion[] }
  | { type: 'SET_ANSWER'; payload: { questionId: string; answer: 'A' | 'B' | 'C' | 'D' } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'GO_TO_QUESTION'; payload: number }
  | { type: 'START_QUIZ' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_TIMER' }
  | { type: 'RESET_QUIZ' };

const initialState: QuizState = {
  config: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: 0,
  isStarted: false,
  isFinished: false,
  score: 0,
  isLoading: false,
  error: null,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_CONFIG':
      return {
        ...state,
        config: action.payload,
        timeRemaining: action.payload.duration * 60,
      };
    
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        error: null,
      };
    
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.questions.length - 1
        ),
      };
    
    case 'PREV_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    
    case 'GO_TO_QUESTION':
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };
    
    case 'START_QUIZ':
      return {
        ...state,
        isStarted: true,
      };
    
    case 'FINISH_QUIZ':
      const correctAnswers = state.questions.reduce((count, question) => {
        return count + (state.answers[question.id] === question.correctAnswer ? 1 : 0);
      }, 0);
      
      return {
        ...state,
        isFinished: true,
        score: (correctAnswers / state.questions.length) * 100,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    case 'UPDATE_TIMER':
      if (state.timeRemaining <= 0) {
        return state;
      }
      
      const newTimeRemaining = state.timeRemaining - 1;
      
      if (newTimeRemaining <= 0 && state.isStarted && !state.isFinished) {
        // Auto-submit when time runs out
        const correctAnswers = state.questions.reduce((count, question) => {
          return count + (state.answers[question.id] === question.correctAnswer ? 1 : 0);
        }, 0);
        
        return {
          ...state,
          timeRemaining: 0,
          isFinished: true,
          score: (correctAnswers / state.questions.length) * 100,
        };
      }
      
      return {
        ...state,
        timeRemaining: newTimeRemaining,
      };
    
    case 'RESET_QUIZ':
      return initialState;
    
    default:
      return state;
  }
}

interface QuizContextType {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
  generateQuestions: (config: QuizConfig) => Promise<void>;
  submitQuiz: () => void;
  formatTime: (seconds: number) => string;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const generateQuestions = async (config: QuizConfig) => {
    dispatch({ type: 'SET_CONFIG', payload: config });
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const questions = await generateQuizQuestions(config.topic, config.numberOfQuestions);
      dispatch({ type: 'SET_QUESTIONS', payload: questions });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const submitQuiz = () => {
    dispatch({ type: 'FINISH_QUIZ' });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.isStarted && !state.isFinished && state.timeRemaining > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isStarted, state.isFinished, state.timeRemaining]);

  return (
    <QuizContext.Provider value={{ state, dispatch, generateQuestions, submitQuiz, formatTime }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}; 