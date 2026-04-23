/**
 * Vercel Serverless Function — Proxy para HF Inference Providers
 * Caminho: api/gerar-imagem.js
 *
 * REQUISITO: token HF fine-grained com permissão
 * "Make calls to Inference Providers" habilitada.
 */

export default async function handler(req, res) {
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

  try {
    let hfRes;

    if (image) {
      // ── img2img via fal-ai (suporta instruct-pix2pix) ────────────────────
      // Endpoint novo: router.huggingface.co
      const imageBuffer = Buffer.from(image, "base64");

      hfRes = await fetch(
        "https://router.huggingface.co/fal-ai/models/timbrooks/instruct-pix2pix",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + HF_KEY,
            "Content-Type": "application/json",
            "x-wait-for-model": "true"
          },
          body: JSON.stringify({
            image_url: "data:image/jpeg;base64," + image,
            prompt,
            num_inference_steps: 20,
            image_guidance_scale: 1.5,
            guidance_scale: 7.5
          })
        }
      );

      // Se fal-ai não suportar, faz fallback para text-to-image com FLUX
      if (!hfRes.ok) {
        console.warn("img2img falhou (" + hfRes.status + "), usando FLUX text-to-image");
        hfRes = await textToImage(prompt, HF_KEY);
      }
    } else {
      hfRes = await textToImage(prompt, HF_KEY);
    }

    if (!hfRes.ok) {
      const err = await hfRes.json().catch(() => ({}));
      return res.status(hfRes.status).json({
        error: err.error || "Erro da HF API: " + hfRes.status
      });
    }

    // Retorna imagem como base64
    const buffer = await hfRes.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = hfRes.headers.get("content-type") || "image/jpeg";

    return res.status(200).json({ image: base64, mimeType: contentType });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

async function textToImage(prompt, HF_KEY) {
  // FLUX.1-schnell via novo endpoint router.huggingface.co
  return fetch(
    "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + HF_KEY,
        "Content-Type": "application/json",
        "x-wait-for-model": "true"
      },
      body: JSON.stringify({ inputs: prompt })
    }
  );
}
