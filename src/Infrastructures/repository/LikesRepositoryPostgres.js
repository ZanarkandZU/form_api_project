const LikesRepository = require('../../Domains/likes/LikesRepository');

class LikesRepositoryPostgres extends LikesRepository {
  constructor(pool, generateId) {
    super();
    this._pool = pool;
    this._generateId = generateId;
  }
  async addLikeComment(idComment, owner) {
    const query = {
      text: 'INSERT INTO likes VALUES($1, $2)',
      values: [idComment, owner],
    };

    await this._pool.query(query);
    return { status: 'success' };
  }
  async getLikeComment(owner) {
    const query = {
      text: 'SELECT id_comment FROM likes WHERE id_user = $1',
      values: [owner],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id_comment;
  }
  async removeLikeComment(owner) {
    const query = {
      text: 'DELETE FROM likes WHERE id_user = $1',
      values: [owner],
    };

    await this._pool.query(query);
    return { status: 'success' };
  }

  async getLikesCommentRows(idComment) {
    const query = {
      text: 'SELECT id_comment FROM likes WHERE id_comment = $1',
      values: [idComment],
    };

    const result = await this._pool.query(query);
    return result.rowCount;
  }
}

module.exports = LikesRepositoryPostgres;
