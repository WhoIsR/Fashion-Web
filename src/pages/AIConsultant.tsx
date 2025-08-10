import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIConsultant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Fashion Consultant. I'm here to help you discover your perfect style and find amazing outfits. What can I help you with today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const aiResponses = [
    "I love your style questions! Based on current trends, I'd recommend...",
    "That's a great choice! Here are some styling tips that would work perfectly...",
    "For your body type and style preferences, I suggest trying...",
    "Color coordination is key! Based on what you've told me...",
    "Seasonal styling is so important. For this time of year, consider...",
    "Accessorizing can completely transform an outfit. Try adding...",
    "That combination would look amazing! You could also pair it with...",
    "Investment pieces are smart choices. I recommend focusing on...",
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const suggestionButtons = [
    "What should I wear to a business meeting?",
    "Help me create a casual weekend look",
    "What colors look good with my skin tone?",
    "How do I style a dress for different occasions?",
    "What are the must-have pieces for this season?",
    "Help me find an outfit for a special event"
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                AI Fashion Consultant
              </h1>
              <p className="text-gray-600">
                Your personal styling assistant powered by AI
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ height: '70vh' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ height: 'calc(70vh - 80px)' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div className={`flex max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-gray-700' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-white" />
                      )}
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="flex max-w-xs lg:max-w-md">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 p-6">
            {/* Suggestion Buttons */}
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">Try asking me about:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestionButtons.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(suggestion)}
                      className="text-left px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask me anything about fashion and style..."
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <Sparkles size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  inputText.trim() && !isTyping
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </form>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              This is a demo AI consultant. Responses are simulated for demonstration purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;