const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const RepliesRepositoryPostgres = require('../RepliesRepositoryPostgres');
const pool = require('../../database/postgres/pool');

describe('RepliesRepositoryPostgres', () => {
  const generateId = () => '123';

  beforeEach(async () => {
    await RepliesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addReplies', () => {
    it('should add a reply and return it correctly', async () => {
      const repository = new RepliesRepositoryPostgres(pool, generateId);

      const addedReply = await repository.addReplies(
        'comment-123',
        'ini balasan',
        'user-123'
      );

      const repliy = await RepliesTableTestHelper.findRepliestById(
        'replies-123'
      );

      expect(repliy[0].id).toBe('replies-123');
      expect(addedReply.id).toBe('replies-123');
      expect(addedReply.content).toBe('ini balasan');
      expect(addedReply.owner).toBe('user-123');
    });
  });

  describe('getReplyByIdComment', () => {
    it('should add a reply and return it correctly', async () => {
      await RepliesTableTestHelper.addReplies('comment-123');

      const repository = new RepliesRepositoryPostgres(pool, generateId);
      const replies = await repository.getReplyByIdComment('comment-123');

      expect(replies[0]).toEqual({
        id: 'replies-123',
        content: 'payload replies',
        date: 'date-01.ab',
        owner: 'user-123',
        id_comment: 'comment-123',
        is_delete: false,
      });
    });
  });

  describe('deleteReplies', () => {
    it('should soft delete a reply', async () => {
      await RepliesTableTestHelper.addReplies({
        id: 'replies-123',
        comment_id: 'comment-123',
        owner: 'user-123',
      });

      const repliesRepository = new RepliesRepositoryPostgres(pool, generateId);

      const result = await repliesRepository.deleteReplies(
        'replies-123',
        'user-123'
      );
      const [reply] = await RepliesTableTestHelper.findRepliestById(
        'replies-123'
      );

      expect(result.status).toBe('success');
      expect(reply.is_delete).toBe(true);
    });
  });

  describe('verifyIdReplies', () => {
    it('veryfy replies', async () => {
      const replieId = 'replies-123';

      await RepliesTableTestHelper.addReplies(replieId);

      const repository = new RepliesRepositoryPostgres(pool, generateId);
      const comment = await repository.verifyIdReplies(replieId);

      expect(comment.owner).toEqual('user-123');
    });
  });
});
