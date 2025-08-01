# Quiz Master - AI-Powered Quiz App

A modern, responsive quiz application built with React, TypeScript, and powered by Google Gemini AI. Create and take quizzes on any topic with dynamic question generation, real-time timing, and detailed performance analytics.

## Features

- 🧠 **AI-Powered Questions**: Generate quiz questions dynamically using Google Gemini AI
- ⏱️ **Real-time Timer**: Countdown timer with auto-submission when time runs out
- 📊 **Performance Analytics**: Detailed results with charts and visualizations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS and Lucide icons
- 🔄 **Question Navigation**: Navigate between questions with progress tracking
- 📈 **Visual Charts**: Pie charts and bar charts for performance analysis
- 🎯 **Score Tracking**: Real-time score calculation and performance feedback

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM
- **AI Integration**: Google Gemini AI
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Environment Setup

The app uses a pre-configured Gemini API key. If you need to use your own API key:

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Update the `API_KEY` constant in `src/services/geminiApi.ts`

## Usage

### Creating a Quiz

1. **Enter Quiz Topic**: Type any topic you want to be quizzed on (e.g., "JavaScript", "AI Ethics", "World History")
2. **Select Number of Questions**: Choose from 5, 10, 15, or 20 questions
3. **Set Duration**: Choose quiz duration from 5 to 30 minutes
4. **Generate Quiz**: Click "Start Quiz" to generate questions using AI

### Taking the Quiz

- **Navigation**: Use Previous/Next buttons or click question numbers to navigate
- **Timer**: Watch the countdown timer - quiz auto-submits when time runs out
- **Progress**: Track your progress with the visual progress bar
- **Answers**: Select your answer by clicking on the option

### Viewing Results

- **Score Overview**: See your percentage score and performance message
- **Charts**: View pie chart of correct vs incorrect answers and bar chart of question-by-question performance
- **Question Review**: Review all questions with correct answers and explanations
- **Actions**: Take a new quiz, review answers, or return home

## Project Structure

```
src/
├── components/          # React components
│   ├── HomePage.tsx    # Quiz configuration page
│   ├── QuizPage.tsx    # Quiz taking interface
│   └── ResultPage.tsx  # Results and analytics page
├── context/            # React context for state management
│   └── QuizContext.tsx # Quiz state and actions
├── services/           # API services
│   └── geminiApi.ts    # Gemini AI integration
├── types/              # TypeScript type definitions
│   └── quiz.ts         # Quiz-related interfaces
└── App.tsx             # Main application component
```

## Key Features Explained

### AI Question Generation
- Uses Google Gemini AI to generate contextually relevant questions
- Questions include explanations for correct answers
- Supports any topic or subject matter

### Timer System
- Real-time countdown with visual indicators
- Color-coded timer (green → yellow → red as time runs out)
- Automatic quiz submission when time expires

### Performance Analytics
- **Pie Chart**: Shows overall correct vs incorrect answers
- **Bar Chart**: Displays performance for each individual question
- **Score Breakdown**: Detailed statistics and performance metrics

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

## Customization

### Styling
- Modify `tailwind.config.js` to customize colors and theme
- Update component styles in individual component files
- Add custom CSS classes in `src/index.css`

### Question Generation
- Modify the prompt in `src/services/geminiApi.ts` to change question format
- Adjust difficulty levels or question types
- Add support for different question formats

### Features
- Add user authentication and score history
- Implement quiz sharing functionality
- Add support for image-based questions
- Create quiz categories and difficulty levels

## Troubleshooting

### Common Issues

1. **API Key Error**: Ensure the Gemini API key is valid and has proper permissions
2. **Question Generation Fails**: Check internet connection and API quota limits
3. **Timer Issues**: Refresh the page if timer behaves unexpectedly
4. **Styling Issues**: Ensure Tailwind CSS is properly configured

### Development

- Run tests: `npm test`
- Build for production: `npm run build`
- Eject from Create React App: `npm run eject` (irreversible)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Google Gemini AI for question generation
- Recharts for data visualization
- Lucide for beautiful icons
- Tailwind CSS for styling framework
