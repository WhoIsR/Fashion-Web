// server.js (Versi Final dengan Google Gemini)

import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // <-- Ini untuk membaca API Key dari file .env
import { GoogleGenerativeAI } from '@google/generative-ai'; // <-- Import library Gemini

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Inisialisasi Google Gemini dengan API Key rahasiamu
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Alamat API untuk dihubungi oleh front-end
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log('Menerima prompt:', prompt, '-> Menghubungi Gemini...');

    // Pilih model AI dan berikan instruksi "kepribadian"
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are "Arve", a world-class AI Fashion Consultant. Your personality is chic, friendly, and helpful. Always stay in character. Keep responses concise and use emojis where appropriate (✨,👗,👠,🌸). Give concrete examples.`,
    });

    // Kirim prompt ke Gemini dan tunggu jawaban
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Menerima jawaban dari Gemini:', text);

    // Kirim balasan dari Gemini ke front-end
    res.json({ reply: text });

  } catch (error) {
    console.error("Error saat menghubungi Gemini:", error);
    res.status(500).json({ error: "Sorry, I'm having trouble thinking of a response right now." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend AI (dengan Gemini) sudah siap di http://localhost:${PORT}`);
});