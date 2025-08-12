// File: src/pages/AIConsultant.tsx (Final - Produk Kontekstual & Streaming Stabil)

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { mockProducts } from '../data/products'; // <-- 1. IMPORT DATA PRODUK

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const AIConsultant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Fashion Consultant 👗✨. I can help you with anything from outfit ideas to the latest trends. What can I help you with today?",
      sender: 'ai',
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

    const userMessage: Message = { id: Date.now().toString(), text: inputText, sender: 'user' };
    const aiMessagePlaceholder: Message = { id: (Date.now() + 1).toString(), text: '', sender: 'ai' };

    setMessages(prev => [...prev, userMessage, aiMessagePlaceholder]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    const historyForAPI = [...messages, userMessage]
      .slice(1, -1)
      .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant', 
          content: msg.text,
      }));

    // Menggunakan fetchEventSource yang lebih tangguh
    await fetchEventSource(import.meta.env.VITE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // --- 2. KIRIM DATA PRODUK BERSAMA PROMPT ---
      body: JSON.stringify({ 
        prompt: currentInput,
        history: historyForAPI,
        products: mockProducts.map(({ id, name, category, price }) => ({ id, name, category, price })) // Kirim data yg relevan saja
      }),
      
      onmessage(event) {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.response) {
            setMessages(prev =>
              prev.map(msg =>
                msg.id === aiMessagePlaceholder.id
                  ? { ...msg, text: msg.text + parsed.response }
                  : msg
              )
            );
          }
        } catch (error) {}
      },
      
      onclose() {
        setIsTyping(false);
      },
      
      onerror(err) {
        setIsTyping(false);
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessagePlaceholder.id
              ? { ...msg, text: "Sorry, an error occurred. Please try again." }
              : msg
          )
        );
        throw err;
      }
    });
  };

  const suggestionButtons = [ "Rekomendasikan atasan untuk musim panas", "Celana hitam cocoknya dengan apa?" ];

  return (
    // ... Seluruh kode JSX dari return (...) tetap SAMA PERSIS, tidak perlu diubah ...
    // div pembungkus utama sekarang HANYA mengatur background
    <div className="bg-gradient-to-b from-white via-pink-50 to-purple-50">
      
      {/* HEADER TETAP SAMA DENGAN `sticky` */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 fixed top-16 left-0 right-0 z-40 shadow-sm">
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

      {/* MAIN (AREA CHAT) SEKARANG BERTANGGUNG JAWAB ATAS LAYOUT & SCROLL */}
      {/* Kita beri padding atas (pt-24) dan bawah (pb-40) agar konten tidak tertutup header/footer */}
      <main className="min-h-screen max-w-4xl mx-auto w-full space-y-2 px-3 sm:px-4 pt-36 pb-40">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            <div className={`flex items-end space-x-2 max-w-[85%] sm:max-w-[70%] ${ msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : '' }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow flex-shrink-0 ${ msg.sender === 'user' ? 'bg-gray-700' : 'bg-gradient-to-r from-brand-pink to-brand-purple-light' }`}>
                {msg.sender === 'user' ? ( <User size={16} className="text-white" /> ) : ( <Bot size={16} className="text-white" /> )}
              </div>
              <div className={`px-4 py-2 rounded-2xl text-sm sm:text-base leading-relaxed shadow-sm ${ msg.sender === 'user' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800 border border-gray-100' }`}>
                {msg.sender === 'ai' ? (
                  <div className="prose prose-sm max-w-none prose-p:my-2 prose-li:my-1 prose-a:text-brand-pink">
                    <ReactMarkdown>{msg.text || "..."}</ReactMarkdown>
                  </div>
                ) : ( msg.text )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && messages[messages.length - 1]?.sender === 'user' && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="flex items-end space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-pink to-brand-purple-light rounded-full flex items-center justify-center shadow"><Bot size={16} className="text-white" /></div>
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
      
      {/* FOOTER TETAP SAMA DENGAN `sticky` */}
      <footer className="border-t border-gray-200 bg-white/60 backdrop-blur-md sticky bottom-0">
        <div className="max-w-4xl mx-auto p-3 sm:p-4">
          {messages.length < 3 && (
            <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestionButtons.map((s, i) => (<button key={i} onClick={() => setInputText(s)} className="px-3 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">{s}</button>))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex space-x-2 sm:space-x-3">
            <div className="flex-1 relative">
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Ask me anything about fashion..." className="w-full pl-4 pr-10 py-2 sm:py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-pink focus:border-transparent text-sm sm:text-base" disabled={isTyping} />
              <Sparkles size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
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