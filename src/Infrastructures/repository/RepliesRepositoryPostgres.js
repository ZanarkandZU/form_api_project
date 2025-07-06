const RepliesRepository = require('../../Domains/replies/RepliesRepository');

class RepliesRepositoryPostgres extends RepliesRepository {
  constructor(pool, idGenerate) {
    super();
    this._pool = pool;
    this._idGenerate = idGenerate;
  }

  async addReplies(idComment, payload, owner) {
    const isoDate = new Date().toISOString();
    const generateId = `replies-${this._idGenerate()}`;

    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [generateId, payload, isoDate, owner, idComment],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deleteReplies(replieId) {
    const query = {
      text: 'UPDATE replies SET is_delete = TRUE WHERE id = $1',
      values: [replieId],
    };

    await this._pool.query(query);
    return { status: 'success' };
  }

  async verifyIdReplies(replieId) {
    const query = {
      text: 'SELECT owner FROM replies WHERE id = $1',
      values: [replieId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getReplyByIdComment(commentId) {
    const query = {
      text: 'SELECT * FROM replies WHERE id_comment = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);
    const reversedRows = result.rows.reverse();

    return reversedRows;
  }
}

module.exports = RepliesRepositoryPostgres;
