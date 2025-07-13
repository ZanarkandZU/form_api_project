const pool = require('../../database/postgres/pool');
const LikesRepositoryPostgres = require('../LikesRepositoryPostgres');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');

describe('LikesRepositoryPostgres Integration Test', () => {
  const idComment = 'comment-123';
  const idUser = 'user-123';

  afterEach(async () => {
    await LikesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addLikeComment', () => {
    it('should persist like to database', async () => {
      const repository = new LikesRepositoryPostgres(pool);
      await repository.addLikeComment(idComment, idUser);

      const likes = await LikesTableTestHelper.findLikesById(idComment);

      expect(likes).toHaveLength(1);
      expect(likes[0].id_user).toBe(idUser);
      expect(likes[0].id_comment).toBe(idComment);
    });
  });

  describe('getLikeComment', () => {
    it('should return the liked comment id for a user', async () => {
      const repository = new LikesRepositoryPostgres(pool);
      await LikesTableTestHelper.addLikes(idComment, idUser);

      const result = await repository.getLikeComment(idUser);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id_comment: 'comment-123' });
    });
  });

  describe('removeLikeComment', () => {
    it('should delete like from database', async () => {
      const repository = new LikesRepositoryPostgres(pool);

      await repository.addLikeComment(idComment, idUser);
      await repository.removeLikeComment(idUser);

      const likes = await LikesTableTestHelper.findLikesById(idComment);
      expect(likes).toHaveLength(0);
    });
  });

  describe('getLikesCommentRows', () => {
    it('should return the number of likes for a comment', async () => {
      const repository = new LikesRepositoryPostgres(pool);
      await LikesTableTestHelper.addLikes(idComment, idUser);

      const count = await repository.getLikesCommentRows(idComment);

      expect(count).toBe(1);
    });
  });
});
