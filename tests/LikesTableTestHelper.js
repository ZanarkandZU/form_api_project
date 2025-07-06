const pool = require('../src/Infrastructures/database/postgres/pool');

const LikesTableTestHelper = {
  async addLikes({ id_comment = 'comment-123', id_user = 'user-123' }) {
    const query = {
      text: 'INSERT INTO likes (id_comment, id_user) VALUES ($1, $2)',
      values: [id_comment, id_user],
    };
    await pool.query(query);
  },

  async findLikesById(idComment) {
    const query = {
      text: 'SELECT * FROM likes WHERE id_comment = $1',
      values: [idComment],
    };
    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM likes WHERE 1=1');
  },
};

module.exports = LikesTableTestHelper;
