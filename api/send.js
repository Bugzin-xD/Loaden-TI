// api/send.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const googleUrl = 'https://script.google.com/macros/s/AKfycby4M_o2299eDJIjhNmQ_OGxdBBl4AXeJ-jDkxh_mulVou9lc4M6IKMPiiqvvYY8wEYylg/exec';
  const secretId = process.env.GOOGLE_SCRIPT_SECRET_ID;

  // Pegamos o corpo da requisição do HTML
  const body = JSON.parse(req.body);

  // Injetamos o ID de segurança aqui (no lado do servidor)
  const payload = {
    ...body,
    authID: secretId
  };

  try {
    const response = await fetch(googleUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const result = await response.text();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao conectar com Google Scripts' });
  }
}
