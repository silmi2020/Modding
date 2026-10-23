// Vercel Serverless Function: /api/mastermind
// Supports optional GEMINI_API_KEY environment variable in Vercel Project Settings
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({
      status: 'online',
      engine: 'Shinobi Mastermind AI Agent Modder v4.0 (Vercel Serverless Ready)',
      tutorialsIndexed: 17,
      playerIdsIndexed: 126
    });
  }
  try {
    const { prompt, context } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return res.status(200).json({
        mode: 'builtin-fallback',
        reply: context || 'Mastermind Neural Engine aktif. Tambahkan GEMINI_API_KEY di Vercel Environment Variables jika ingin mengaktifkan Cloud LLM tambahan.'
      });
    }
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: `${context || ''}\n\nPertanyaan User: ${prompt || ''}` }] }]
        })
      }
    );
    const data = await r.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || context;
    return res.status(200).json({ mode: 'gemini-cloud', reply });
  } catch (err) {
    return res.status(200).json({ mode: 'error-fallback', error: String(err) });
  }
}
