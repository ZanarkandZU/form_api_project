const ThreadsRepository = require('../../Domains/threads/ThreadsRepository');

class ThreadsRepositoryPostgres extends ThreadsRepository {
  constructor(pool, generateId) {
    super();
    this._pool = pool;
    this._generateId = generateId;
  }

  async addThreads(payload, owner) {
    const { title, body } = payload;
    const id = `thread-${this._generateId()}`;
    const isoDate = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads VALUES ($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, isoDate, owner],
    };

    const data = await this._pool.query(query);
    return data.rows[0];
  }

  async getCompletThreads(threadId) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async verifyIdThread(threadId) {
    const query = {
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [threadId],
    };

    const data = await this._pool.query(query);
    return data.rows[0];
  }
}

module.exports = ThreadsRepositoryPostgres;
