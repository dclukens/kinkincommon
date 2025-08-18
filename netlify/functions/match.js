// netlify/functions/match.js
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { Allow: 'POST' }, body: 'Use POST with JSON' };
  }
  try {
    const { answersA = [], answersB = [] } = JSON.parse(event.body || '{}');
    const norm = a => Array.from(new Set(a.map(x => String(x).trim().toLowerCase()).filter(Boolean)));
    const A = norm(answersA), B = norm(answersB);
    const Bset = new Set(B);
    const mutual = A.filter(x => Bset.has(x));
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mutual }) };
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Bad JSON' }) };
  }
};
