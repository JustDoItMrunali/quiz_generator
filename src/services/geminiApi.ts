import { GoogleGenerativeAI } from '@google/generative-ai';
import { QuizQuestion } from '../types/quiz';

// Note: You'll need to replace this with your actual Gemini API key
// Get it from: https://makersuite.google.com/app/apikey
const API_KEY = 'AIzaSyCd7bdaBlfyMAZRbqQs0E08DkN3--N9vAs';

// Fallback questions for testing when API is not available
const getFallbackQuestions = (topic: string, numberOfQuestions: number): QuizQuestion[] => {
  const fallbackQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      question: `What is the primary purpose of ${topic}?`,
      options: {
        A: 'To solve complex problems',
        B: 'To create entertainment',
        C: 'To generate random data',
        D: 'To slow down processes'
      },
      correctAnswer: 'A',
      explanation: 'The primary purpose of most technologies is to solve complex problems efficiently.'
    },
    {
      id: 'q2',
      question: `Which of the following is NOT typically associated with ${topic}?`,
      options: {
        A: 'Innovation',
        B: 'Efficiency',
        C: 'Randomness',
        D: 'Problem-solving'
      },
      correctAnswer: 'C',
      explanation: 'Randomness is not typically a goal in most technological applications.'
    },
    {
      id: 'q3',
      question: `How does ${topic} contribute to modern development?`,
      options: {
        A: 'By increasing complexity',
        B: 'By improving productivity',
        C: 'By reducing functionality',
        D: 'By limiting options'
      },
      correctAnswer: 'B',
      explanation: 'Most technologies aim to improve productivity and efficiency.'
    },
    {
      id: 'q4',
      question: `What is a key benefit of understanding ${topic}?`,
      options: {
        A: 'Increased confusion',
        B: 'Better decision making',
        C: 'Reduced capabilities',
        D: 'Slower processes'
      },
      correctAnswer: 'B',
      explanation: 'Understanding any topic leads to better decision making.'
    },
    {
      id: 'q5',
      question: `Which approach is most effective when working with ${topic}?`,
      options: {
        A: 'Avoiding it completely',
        B: 'Learning and practicing',
        C: 'Ignoring best practices',
        D: 'Rushing through implementation'
      },
      correctAnswer: 'B',
      explanation: 'Learning and practicing is the most effective approach for any skill.'
    }
  ];

  return fallbackQuestions.slice(0, numberOfQuestions);
};

export const generateQuizQuestions = async (
  topic: string,
  numberOfQuestions: number
): Promise<QuizQuestion[]> => {
  try {
    // Check if API key is properly configured
    if (!API_KEY || API_KEY.length < 20) {
      console.warn('Using fallback questions - please configure a valid Gemini API key');
      return getFallbackQuestions(topic, numberOfQuestions);
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Generate ${numberOfQuestions} multiple choice questions about "${topic}".

For each question, provide:
1. A clear and concise question
2. Four answer options labeled A, B, C, and D
3. The correct answer (A, B, C, or D)
4. A brief explanation of why the answer is correct

Format the response as a JSON array with the following structure:
[
  {
    "id": "q1",
    "question": "What is...?",
    "options": {
      "A": "Option A",
      "B": "Option B", 
      "C": "Option C",
      "D": "Option D"
    },
    "correctAnswer": "A",
    "explanation": "Brief explanation of why A is correct"
  }
]

Make sure the questions are varied in difficulty and cover different aspects of the topic. Only return valid JSON.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw API response:', text);
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.warn('Invalid JSON response, using fallback questions');
      return getFallbackQuestions(topic, numberOfQuestions);
    }
    
    const questions = JSON.parse(jsonMatch[0]) as QuizQuestion[];
    
    // Validate the structure
    if (!Array.isArray(questions)) {
      console.warn('Response is not an array, using fallback questions');
      return getFallbackQuestions(topic, numberOfQuestions);
    }
    
    // Validate each question has required fields
    const validQuestions = questions.filter(q => 
      q.question && 
      q.options && 
      q.options.A && 
      q.options.B && 
      q.options.C && 
      q.options.D && 
      q.correctAnswer
    );
    
    if (validQuestions.length === 0) {
      console.warn('No valid questions in response, using fallback questions');
      return getFallbackQuestions(topic, numberOfQuestions);
    }
    
    return validQuestions.map((q, index) => ({
      ...q,
      id: `q${index + 1}`,
    }));
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    console.warn('Using fallback questions due to API error');
    return getFallbackQuestions(topic, numberOfQuestions);
  }
}; 