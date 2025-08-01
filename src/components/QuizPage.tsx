import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle, 
  Circle,
  Flag,
  Home
} from 'lucide-react';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, formatTime, submitQuiz } = useQuiz();

  useEffect(() => {
    if (!state.questions.length) {
      navigate('/');
      return;
    }

    if (!state.isStarted) {
      dispatch({ type: 'START_QUIZ' });
    }
  }, [state.questions, state.isStarted, navigate, dispatch]);

  useEffect(() => {
    if (state.isFinished) {
      navigate('/results');
    }
  }, [state.isFinished, navigate]);

  if (!state.questions.length) {
    return null;
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const userAnswer = state.answers[currentQuestion.id];
  const isFirstQuestion = state.currentQuestionIndex === 0;
  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
  const answeredQuestions = Object.keys(state.answers).length;

  const handleAnswerSelect = (answer: 'A' | 'B' | 'C' | 'D') => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { questionId: currentQuestion.id, answer },
    });
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      dispatch({ type: 'PREV_QUESTION' });
    }
  };

  const handleSubmit = () => {
    submitQuiz();
  };

  const handleGoHome = () => {
    if (window.confirm('Are you sure you want to leave? Your progress will be lost.')) {
      dispatch({ type: 'RESET_QUIZ' });
      navigate('/');
    }
  };

  const getTimeColor = () => {
    if (state.timeRemaining <= 60) return 'text-red-600';
    if (state.timeRemaining <= 180) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoHome}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Flag className="w-4 h-4 mr-1" />
                {answeredQuestions}/{state.questions.length} answered
              </div>
              
              <div className={`flex items-center font-mono text-lg font-semibold ${getTimeColor()}`}>
                <Clock className="w-5 h-5 mr-2" />
                {formatTime(state.timeRemaining)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((state.currentQuestionIndex + 1) / state.questions.length) * 100}%` }}
          />
        </div>
        <div className="text-center text-sm text-gray-600 mt-2">
          Question {state.currentQuestionIndex + 1} of {state.questions.length}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {(['A', 'B', 'C', 'D'] as const).map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  userAnswer === option
                    ? 'border-primary-500 bg-primary-50 text-primary-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3">
                    {userAnswer === option ? (
                      <CheckCircle className="w-5 h-5 text-primary-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <span className="font-medium mr-2">{option}.</span>
                  <span>{currentQuestion.options[option]}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            <div className="flex space-x-2">
              {state.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => dispatch({ type: 'GO_TO_QUESTION', payload: index })}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    index === state.currentQuestionIndex
                      ? 'bg-primary-600 text-white'
                      : state.answers[state.questions[index].id]
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={answeredQuestions < state.questions.length}
                className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Quiz
                <CheckCircle className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary flex items-center"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 