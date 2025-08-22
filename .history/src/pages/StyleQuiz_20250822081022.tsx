import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your lifestyle like?",
    options: ["Professional & Corporate", "Creative & Artistic", "Active & Outdoorsy", "Social & Trendy"]
  },
  {
    id: 2,
    question: "Which colors make you feel confident?",
    options: ["Classic neutrals (black, white, gray)", "Bold & bright colors", "Earthy tones (brown, olive, beige)", "Pastels & soft shades"]
  },
  {
    id: 3,
    question: "What's your ideal outfit fit?",
    options: ["Tailored & structured", "Relaxed & comfortable", "Form-fitting & sleek", "Oversized & cozy"]
  },
  {
    id: 4,
    question: "Which fashion era inspires you most?",
    options: ["Classic 1950s elegance", "Bohemian 1970s", "Minimalist 1990s", "Contemporary modern"]
  },
  {
    id: 5,
    question: "What's your shopping priority?",
    options: ["Quality over quantity", "Latest trends", "Versatile basics", "Unique statement pieces"]
  }
];

const StyleQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  
  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };
  
  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };
  
  const getStyleProfile = () => {
    // Simple logic to determine style based on answers
    const answerValues = Object.values(answers);
    
    if (answerValues.includes("Professional & Corporate") && answerValues.includes("Tailored & structured")) {
      return {
        style: "Classic Professional",
        description: "You have a sophisticated, polished style that exudes confidence and professionalism.",
        recommendations: ["Tailored blazers", "High-quality blouses", "Classic trousers", "Structured handbags"]
      };
    } else if (answerValues.includes("Creative & Artistic") || answerValues.includes("Bohemian 1970s")) {
      return {
        style: "Bohemian Creative",
        description: "Your style is free-spirited and artistic, with a love for unique textures and patterns.",
        recommendations: ["Flowy dresses", "Layered accessories", "Vintage-inspired pieces", "Artistic prints"]
      };
    } else if (answerValues.includes("Minimalist 1990s") || answerValues.includes("Versatile basics")) {
      return {
        style: "Modern Minimalist",
        description: "You appreciate clean lines, quality basics, and a curated wardrobe of versatile pieces.",
        recommendations: ["Neutral basics", "Clean silhouettes", "Quality knits", "Minimalist accessories"]
      };
    } else {
      return {
        style: "Contemporary Trendsetter",
        description: "You love staying current with fashion trends while expressing your personal style.",
        recommendations: ["Statement pieces", "Trendy colors", "Fashion-forward silhouettes", "Bold accessories"]
      };
    }
  };
  
  if (showResults) {
    const { style, description, recommendations } = getStyleProfile();
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-background pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-dark-text mb-4">
              Find Your Personal Style
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Take our quick quiz to get personalized recommendations
            </p>
          </div>
          
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-8 md:p-12 min-h-[500px] flex flex-col justify-between">
            {!showResults ? (
              <div>
                {/* Question */}
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-dark-text mb-8">
                  {questions[currentQuestion].question}
                </h2>
                
                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                        answers[questions[currentQuestion].id] === option
                          ? 'border-brand-purple-dark dark:border-dark-primary bg-brand-purple-light/20 dark:bg-dark-primary/20 ring-2 ring-brand-purple-dark dark:ring-dark-primary'
                          : 'border-gray-300 dark:border-dark-border hover:border-brand-purple-dark dark:hover:border-dark-primary hover:bg-gray-50 dark:hover:bg-dark-border'
                      }`}
                    >
                      <span className="font-medium text-gray-800 dark:text-dark-text">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Sparkles size={48} className="mx-auto text-brand-purple-dark dark:text-dark-primary mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-2">{style}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{description}</p>
                
                <div className="text-left max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text mb-4">We recommend:</h3>
                  <ul className="space-y-2">
                    {recommendations.map(rec => (
                      <li key={rec} className="flex items-center">
                        <ChevronRight size={16} className="mr-2 text-brand-purple-dark dark:text-dark-primary" />
                        <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={resetQuiz}
                  className="mt-8 btn-secondary"
                >
                  Retake Quiz
                </button>
              </div>
            )}
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
                className="flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 dark:text-dark-text"
              >
                <ChevronLeft size={18} className="mr-2" />
                Previous
              </button>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentQuestion + 1} / {questions.length}
              </div>
              
              <button
                onClick={goToNext}
                disabled={!answers[questions[currentQuestion].id]}
                className="flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 dark:text-dark-text"
              >
                Next
                <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-background py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Sparkles size={48} className="text-purple-500 dark:text-dark-primary mx-auto mb-6 animate-bounce-gentle" />
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-dark-text mb-4">
            Discover Your Style
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Answer a few questions to get personalized fashion recommendations
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-dark-card rounded-full h-2">
            <div
              className="bg-purple-500 dark:bg-dark-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Question Card */}
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 animate-fade-in-up">
          <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-dark-text mb-8 text-center">
            {questions[currentQuestion].question}
          </h2>
          
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 hover:border-purple-300 dark:hover:border-dark-primary hover:bg-purple-50 dark:hover:bg-dark-border ${
                  answers[questions[currentQuestion].id] === option
                    ? 'border-purple-500 bg-purple-50 text-purple-700 dark:border-dark-primary dark:bg-dark-primary/20 dark:text-dark-primary'
                    : 'border-gray-200 dark:border-dark-border text-gray-800 dark:text-dark-text'
                }`}
              >
                <span className="font-medium">{option}</span>
              </button>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={goToPrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
                currentQuestion === 0
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <ChevronLeft size={18} className="mr-2" />
              Previous
            </button>
            
            <button
              onClick={goToNext}
              disabled={!answers[questions[currentQuestion].id]}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                answers[questions[currentQuestion].id]
                  ? 'bg-purple-500 dark:bg-dark-primary text-white dark:text-dark-background hover:bg-purple-600 dark:hover:bg-purple-300'
                  : 'bg-gray-300 dark:bg-dark-border text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
              <ChevronRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleQuiz;