/**
 * Vercel Serverless Function — Proxy para HF Inference API
 * Caminho: /api/gerar-imagem.js
 *
 * Evita CORS: o browser chama este endpoint (mesmo domínio),
 * e o servidor chama a HF sem restrições.
 *
 * Body esperado (JSON):
 *   { prompt: string, image?: string (base64 jpeg), mimeType?: string }
 */

// Modelo img2img (com foto de referência)
const HF_IMG2IMG = "https://api-inference.huggingface.co/models/timbrooks/instruct-pix2pix";
// Modelo text-to-image (sem foto)
const HF_TXT2IMG = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";

export default async function handler(req, res) {
  // Permite apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const HF_KEY = process.env.VITE_HF_KEY;
  if (!HF_KEY) {
    return res.status(500).json({ error: "VITE_HF_KEY não configurada no servidor" });
  }

  const { prompt, image } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: "Campo 'prompt' obrigatório" });
  }

  const headers = {
    "Authorization": "Bearer " + HF_KEY,
    "Content-Type": "application/json",
    "x-wait-for-model": "true"   // aguarda modelo carregar em vez de retornar 503
  };

  try {
    let hfRes;

    if (image) {
      // ── img2img: instruct-pix2pix ───────────────────────────────────────
      hfRes = await fetch(HF_IMG2IMG, {
        method: "POST",
        headers,
        body: JSON.stringify({
          inputs: image,
          parameters: {
            prompt,
            num_inference_steps: 25,
            image_guidance_scale: 1.5,
            guidance_scale: 7.5
          }
        })
      });
    } else {
      // ── text-to-image: FLUX.1-schnell ───────────────────────────────────
      hfRes = await fetch(HF_TXT2IMG, {
        method: "POST",
        headers,
        body: JSON.stringify({ inputs: prompt })
      });
    }

    if (!hfRes.ok) {
      const err = await hfRes.json().catch(() => ({}));
      return res.status(hfRes.status).json({
        error: err.error || "Erro da HF API: " + hfRes.status
      });
    }

    // Retorna a imagem como base64 para o frontend
    const buffer = await hfRes.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = hfRes.headers.get("content-type") || "image/jpeg";

    return res.status(200).json({ image: base64, mimeType: contentType });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
