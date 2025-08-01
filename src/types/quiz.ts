export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export interface QuizConfig {
  topic: string;
  numberOfQuestions: number;
  duration: number; // in minutes
}

export interface QuizState {
  config: QuizConfig | null;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D' | null>;
  timeRemaining: number; // in seconds
  isStarted: boolean;
  isFinished: boolean;
  score: number;
  isLoading: boolean;
  error: string | null;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeTaken: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D' | null>;
  questions: QuizQuestion[];
} 