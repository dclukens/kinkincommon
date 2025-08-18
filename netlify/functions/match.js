// netlify/functions/match.js
exports.handler = async (event) => {
  try {
    let A = [], B = [];
    if (event.httpMethod === 'GET') {
      const { a = '', b = '' } = event.queryStringParameters || {};
      A = a.split(',').map(s => s.trim()).filter(Boolean);
      B = b.split(',').map(s => s.trim()).filter(Boolean);
    } else if (event.httpMethod === 'POST') {
      const { answersA = [], answersB = [] } = JSON.parse(event.body || '{}');
      A = Array.isArray(answersA) ? answersA : [];
      B = Array.isArray(answersB) ? answersB : [];
    }
    const mutual = [...new Set(A)].filter(x => new Set(B).has(x));
    return { statusCode: 200, headers: {'Content-Type':'application/json'}, body: JSON.stringify({ mutual }) };
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Bad input' }) };
  }
};
