const CommentsRepository = require('../../Domains/comments/CommentsRepository');

class CommentRepositoryPostgres extends CommentsRepository {
  constructor(pool, generateId) {
    super();
    this._pool = pool;
    this._generateId = generateId;
  }

  async createComment(payload, owner, threadId) {
    const idComment = `comment-${this._generateId()}`;
    const isoDate = new Date().toISOString();

    const query = {
      text: 'INSERT INTO comments VALUES ($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [idComment, payload, isoDate, owner, threadId],
    };

    const data = await this._pool.query(query);
    return data.rows[0];
  }

  async getComments(commentId) {
    const query = {
      text: 'SELECT owner FROM comments WHERE id = $1',
      values: [commentId],
    };

    const data = await this._pool.query(query);
    return data.rows;
  }

  async removeComment(commentId) {
    const query = {
      text: 'UPDATE comments SET is_delete = TRUE WHERE id = $1',
      values: [commentId],
    };

    await this._pool.query(query);
    return { status: 'success' };
  }

  async getCommentByIdThread(threadId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id_thread = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async verifyIdParams(commentId) {
    const query = {
      text: 'SELECT id_thread FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new Error('IDCOMMENT.ID_CONTAIN_NOTDEFINED_CHARACTER');
    }

    return result.rows[0].id_thread;
  }
}

module.exports = CommentRepositoryPostgres;
