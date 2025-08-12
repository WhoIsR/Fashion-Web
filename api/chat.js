// File: api/chat.js (Versi Final dengan Streaming Aktif)

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const { history = [], prompt } = await request.json();

      if (!prompt) {
         return new Response(JSON.stringify({ error: "Prompt is required." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      const messages = [
        { role: 'system', content: `You are "Arve", a world-class AI Fashion Consultant. Your personality is chic, friendly, and helpful. **Core Instruction: Always answer using Indonesian and don't use English unless asked to..** RULES: 1. Always stay in character. 2. Keep responses concise and use emojis (✨,👗,👠,🌸). 3. Give concrete examples. 4. **Use Markdown formatting (like **bold**, *italics*, and lists with '-' or '*') to make your responses easy to read.**` },
        ...history,
        { role: 'user', content: prompt }
      ];

      const aiResponse = await env.AI.run(
        '@cf/meta/llama-3-8b-instruct',
        { 
          messages,
          stream: true // <-- PASTIKAN INI ADA DAN BERNILAI TRUE
        }
      );

      return new Response(aiResponse, {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'text/event-stream' 
        },
      });

    } catch (error) {
      console.error("Cloudflare Worker Error:", error);
      return new Response(JSON.stringify({ error: "Error processing AI request." }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};