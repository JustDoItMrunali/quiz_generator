import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Trophy, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Home, 
  RotateCcw,
  TrendingUp,
  Target
} from 'lucide-react';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    if (!state.isFinished || !state.questions.length) {
      navigate('/');
    }
  }, [state.isFinished, state.questions, navigate]);

  if (!state.isFinished || !state.questions.length) {
    return null;
  }

  const correctAnswers = state.questions.reduce((count, question) => {
    return count + (state.answers[question.id] === question.correctAnswer ? 1 : 0);
  }, 0);

  const incorrectAnswers = state.questions.length - correctAnswers;
  const timeTaken = (state.config?.duration || 0) * 60 - state.timeRemaining;

  const pieData = [
    { name: 'Correct', value: correctAnswers, color: '#10B981' },
    { name: 'Incorrect', value: incorrectAnswers, color: '#EF4444' },
  ];

  const barData = state.questions.map((question, index) => {
    const userAnswer = state.answers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;
    return {
      question: `Q${index + 1}`,
      correct: isCorrect ? 1 : 0,
      incorrect: isCorrect ? 0 : 1,
      answered: userAnswer ? 1 : 0,
    };
  });

  const getScoreColor = () => {
    if (state.score >= 80) return 'text-green-600';
    if (state.score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    if (state.score >= 90) return 'Excellent! Outstanding performance!';
    if (state.score >= 80) return 'Great job! Well done!';
    if (state.score >= 70) return 'Good work! Keep it up!';
    if (state.score >= 60) return 'Not bad! Room for improvement.';
    return 'Keep practicing! You can do better!';
  };

  const handleNewQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
    navigate('/');
  };

  const handleReviewAnswers = () => {
    // You could implement a review mode here
    alert('Review feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Results</h1>
          <p className="text-gray-600">Here's how you performed</p>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Score</h3>
            <p className={`text-3xl font-bold ${getScoreColor()}`}>
              {state.score.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 mt-1">{getScoreMessage()}</p>
          </div>

          <div className="card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Correct Answers</h3>
            <p className="text-3xl font-bold text-green-600">
              {correctAnswers}/{state.questions.length}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {((correctAnswers / state.questions.length) * 100).toFixed(1)}% accuracy
            </p>
          </div>

          <div className="card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Time Taken</h3>
            <p className="text-3xl font-bold text-purple-600">
              {Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              of {state.config?.duration} minutes
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Overall Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-600">
                  Correct: {correctAnswers}
                </span>
              </div>
              <div className="flex items-center">
                <XCircle className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-sm text-gray-600">
                  Incorrect: {incorrectAnswers}
                </span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Question-by-Question Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="correct" stackId="a" fill="#10B981" name="Correct" />
                <Bar dataKey="incorrect" stackId="a" fill="#EF4444" name="Incorrect" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Question Review */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Review</h3>
          <div className="space-y-4">
            {state.questions.map((question, index) => {
              const userAnswer = state.answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      Question {index + 1}
                    </h4>
                    <div className="flex items-center">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{question.question}</p>
                  
                  <div className="space-y-2">
                    {(['A', 'B', 'C', 'D'] as const).map((option) => {
                      const isUserAnswer = userAnswer === option;
                      const isCorrectAnswer = question.correctAnswer === option;
                      
                      return (
                        <div
                          key={option}
                          className={`p-2 rounded ${
                            isCorrectAnswer
                              ? 'bg-green-100 border border-green-300'
                              : isUserAnswer && !isCorrect
                              ? 'bg-red-100 border border-red-300'
                              : 'bg-gray-50'
                          }`}
                        >
                          <span className="font-medium mr-2">{option}.</span>
                          <span>{question.options[option]}</span>
                          {isCorrectAnswer && (
                            <span className="ml-2 text-green-600 font-medium">✓ Correct</span>
                          )}
                          {isUserAnswer && !isCorrect && (
                            <span className="ml-2 text-red-600 font-medium">✗ Your Answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {question.explanation && (
                    <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleNewQuiz}
            className="btn-primary flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Take New Quiz
          </button>
          
          <button
            onClick={handleReviewAnswers}
            className="btn-secondary flex items-center justify-center"
          >
            <Target className="w-4 h-4 mr-2" />
            Review Answers
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="btn-secondary flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage; 