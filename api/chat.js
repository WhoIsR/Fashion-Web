// File: api/chat.js (Versi Final dengan Konteks Produk)

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
      // SEKARANG KITA MENERIMA 'products' DARI FRONTEND
      const { history = [], prompt, products = [] } = await request.json();

      if (!prompt) {
         return new Response(JSON.stringify({ error: "Prompt is required." }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Kita buat daftar produk menjadi string yang mudah dibaca AI
      const productCatalogString = products.map(p => `- ${p.name} (ID: ${p.id}, Category: ${p.category}, Price: $${p.price})`).join('\n');

      const messages = [
        { 
          role: 'system', 
          // --- INSTRUKSI UNTUK AI KITA UPGRADE ---
          content: `You are "Arve", a helpful and chic AI Fashion Consultant. **Core Instruction: Always answer in Indonesian.**
          RULES:
          1. Your main goal is to help users by recommending products FROM THE CATALOG PROVIDED BELOW.
          2. When you recommend a product, you MUST format it as a Markdown link like this: '[Nama Produk](/product/ID_PRODUK)'. Replace 'arve.style' with the actual domain when deployed.
          3. Be friendly, use emojis (✨,👗,👠), and give clear reasons for your recommendations.
          4. If the user's question is not about products, answer it normally.
          
          --- AVAILABLE PRODUCT CATALOG ---
          ${productCatalogString}
          ---------------------------------`
        },
        ...history,
        { role: 'user', content: prompt }
      ];

      const aiResponse = await env.AI.run(
        '@cf/meta/llama-3-8b-instruct',
        { 
          messages,
          stream: true
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