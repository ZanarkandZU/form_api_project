const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentTableTestHelper = {
  async addReplies({
    id = 'replies-123',
    payload = 'payload replies',
    isoDate = 'date-01.ab',
    owner = 'user-123',
    id_comment = 'comment-123',
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5)',
      values: [id, payload, isoDate, owner, id_comment],
    };

    await pool.query(query);
  },

  async findRepliestById(id) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM replies WHERE 1=1');
  },
};

module.exports = CommentTableTestHelper;
