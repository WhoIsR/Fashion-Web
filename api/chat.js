// api/chat.js (Versi Final yang Lebih Tahan Banting)

export default {
  async fetch(request, env) {
    // ... (bagian CORS header tetap sama)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // +++ PERBAIKAN DI SINI +++
      // Kita berikan nilai default `[]` untuk history
      // Jadi, jika front-end tidak mengirim history, kode tidak akan crash.
      const { history = [], prompt } = await request.json();

      if (!prompt) {
         return new Response(JSON.stringify({ error: "Prompt is required." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      const messages = [
        { role: 'system', content: `You are "Arve", a world-class AI Fashion Consultant. Your personality is chic, friendly, and helpful. **Core Instruction: tends to use indonesian.** RULES: 1. Always stay in character. 2. Keep responses concise and use emojis (✨,👗,👠,🌸). 3. Give concrete examples.` },
        ...history,
        { role: 'user', content: prompt }
      ];

      const aiResponse = await env.AI.run(
        '@cf/meta/llama-3-8b-instruct',
        { messages }
      );

      return new Response(JSON.stringify({ reply: aiResponse.response }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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