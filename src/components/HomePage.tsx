import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Brain, Clock, Hash, BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { generateQuestions, state } = useQuiz();
  const [formData, setFormData] = useState({
    topic: '',
    numberOfQuestions: 5,
    duration: 10,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.topic.trim()) {
      alert('Please enter a quiz topic');
      return;
    }

    try {
      await generateQuestions({
        topic: formData.topic.trim(),
        numberOfQuestions: formData.numberOfQuestions,
        duration: formData.duration,
      });
      navigate('/quiz');
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfQuestions' || name === 'duration' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Master</h1>
          <p className="text-gray-600">Create and take AI-powered quizzes on any topic</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="inline w-4 h-4 mr-2" />
                Quiz Topic
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="e.g., JavaScript, AI Ethics, World History"
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="numberOfQuestions" className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="inline w-4 h-4 mr-2" />
                Number of Questions
              </label>
              <select
                id="numberOfQuestions"
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-2" />
                Quiz Duration (minutes)
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={20}>20 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={state.isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {state.isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Quiz...
                </>
              ) : (
                'Start Quiz'
              )}
            </button>
          </form>

          {state.error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{state.error}</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by Google Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 