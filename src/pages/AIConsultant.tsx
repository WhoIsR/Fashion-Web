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
      text: "Hi! I'm your AI Fashion Consultant 👗✨. I can help you discover your perfect style, give outfit ideas, and keep you updated with the latest trends. What can I help you with today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    // ========================================================================
    // === PERBAIKAN FORMAT HISTORY AGAR SESUAI DENGAN CLOUDFLARE ===
    // ========================================================================
    const historyForAPI = newMessages
      .slice(1, -1) // Ambil semua pesan kecuali sapaan awal dan pesan user yg baru
      .map(msg => ({
          // Ubah format agar sesuai dengan yang diharapkan AI Cloudflare
          role: msg.sender === 'user' ? 'user' : 'assistant', 
          content: msg.text,
      }));

    try {
      const response = await fetch('https://arve-ai-backend.radjasatrio70.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: currentInput,
          history: historyForAPI // <-- Kirim riwayat dengan format yang sudah benar
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having a little trouble connecting right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestionButtons = [
    "What should I wear to a wedding?",
    "Help me find a casual summer outfit",
    "Which colors suit my skin tone?",
    "Trendy looks for this month",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-brand-pink to-brand-purple-light rounded-full flex items-center justify-center shadow-md">
            <Bot size={24} className="text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">AI Fashion Consultant</h1>
            <p className="text-xs sm:text-sm text-gray-500">Your personal style assistant</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 max-w-4xl mx-auto w-full space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            <div className={`flex items-end space-x-2 max-w-[85%] sm:max-w-[70%] ${ msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : '' }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow flex-shrink-0 ${ msg.sender === 'user' ? 'bg-gray-700' : 'bg-gradient-to-r from-brand-pink to-brand-purple-light' }`}>
                {msg.sender === 'user' ? ( <User size={16} className="text-white" /> ) : ( <Bot size={16} className="text-white" /> )}
              </div>
              <div className={`px-4 py-2 rounded-2xl text-sm sm:text-base leading-relaxed shadow-sm ${ msg.sender === 'user' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 border border-gray-100' }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="flex items-end space-x-2 max-w-[85%] sm:max-w-[70%]">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-pink to-brand-purple-light rounded-full flex items-center justify-center shadow">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-sm">
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
      </main>

      {/* Input Area */}
      <footer className="border-t border-gray-200 bg-white/60 backdrop-blur-md sticky bottom-0">
        <div className="max-w-4xl mx-auto p-3 sm:p-4">
          {messages.length === 1 && (
            <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestionButtons.map((s, i) => (
                <button key={i} onClick={() => setInputText(s)} className="px-3 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  {s}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex space-x-2 sm:space-x-3">
            <div className="flex-1 relative">
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Ask me anything about fashion..." className="w-full pl-4 pr-10 py-2 sm:py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-pink focus:border-transparent text-sm sm:text-base" disabled={isTyping} />
              <Sparkles size={18} className="absolute right-3 top-12 -translate-y-1/2 text-gray-400" />
            </div>
            <button type="submit" disabled={!inputText.trim() || isTyping} className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all shadow-sm text-sm sm:text-base ${ inputText.trim() && !isTyping ? 'bg-gradient-to-r from-brand-pink to-brand-purple-light text-white hover:opacity-90' : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}>
              <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default AIConsultant;