const { Client } = require('pg');

exports.handler = async () => {
  const client = new Client({ connectionString: process.env.NETLIFY_DATABASE_URL });
  try {
    await client.connect();

    // make sure there's a table
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT now()
      )
    `);

    // insert one row
    await client.query('INSERT INTO sessions DEFAULT VALUES');

    // count rows
    const { rows } = await client.query('SELECT count(*) FROM sessions');

    return { statusCode: 200, body: `Rows in sessions: ${rows[0].count}` };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  } finally {
    await client.end();
  }
};
