const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const pool = require('../../database/postgres/pool');

describe('CommentRepositoryPostgres', () => {
  const generateId = () => '123';

  afterEach(async () => {
    await CommentTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('createComment', () => {
    it('should create a comment and return its data', async () => {
      const threadId = 'thread-123';
      await ThreadsTableTestHelper.addThreads({
        id: threadId,
        owner: 'user-123',
      });

      const payload = 'content comment';
      const owner = 'user-123';

      const repository = new CommentRepositoryPostgres(pool, generateId);
      const result = await repository.createComment(payload, owner, threadId);

      const comment = await CommentTableTestHelper.findCommentById(
        'comment-123'
      );

      expect(result).toMatchObject({
        id: 'comment-123',
        content: 'content comment',
        owner: 'user-123',
      });

      expect(comment).toHaveLength(1);
    });
  });

  describe('getComments', () => {
    it('should return comment owner', async () => {
      const commentId = 'comment-123';
      await CommentTableTestHelper.addComment({
        id: commentId,
        content: 'content comment',
        owner: 'user-123',
      });

      const repository = new CommentRepositoryPostgres(pool, generateId);
      const comment = await repository.getComments(commentId);

      expect(comment[0].owner).toEqual('user-123');
    });
  });

  describe('removeComment', () => {
    it('should soft delete the comment', async () => {
      const commentId = 'comment-123';
      const owner = 'user-123';

      await CommentTableTestHelper.addComment(commentId, owner);

      const repository = new CommentRepositoryPostgres(pool, generateId);
      const comment = await repository.removeComment(commentId, owner);

      const verify = await CommentTableTestHelper.findCommentById(commentId);

      expect(verify[0].is_delete).toBe(true);
      expect(comment).toEqual({
        status: 'success',
      });
    });
  });

  describe('getCommentByIdThread', () => {
    it('should get the comment', async () => {
      const threadId = 'thread-123';

      await CommentTableTestHelper.addComment(threadId);

      const repository = new CommentRepositoryPostgres(pool, generateId);
      const comment = await repository.getCommentByIdThread(threadId);

      expect(comment).toHaveLength(1);
      expect(comment[0]).toMatchObject({
        id: 'comment-123',
        content: 'payload comment',
        date: 'date-01.ab',
        owner: 'user-123',
        id_thread: 'thread-123',
        is_delete: false,
      });
    });
  });

  describe('verifyIdParams', () => {
    it('should return id_thread when comment exists', async () => {
      await CommentTableTestHelper.addComment('comment-123');

      const repository = new CommentRepositoryPostgres(pool, generateId);

      await expect(
        repository.verifyIdParams('comment-123')
      ).resolves.not.toThrowError('IDCOMMENT.ID_CONTAIN_NOTDEFINED_CHARACTER');

      const result = await repository.verifyIdParams('comment-123');
      expect(result).toBe('thread-123');
    });

    it('should throw error when comment not found', async () => {
      const repository = new CommentRepositoryPostgres(pool, generateId);

      await expect(
        repository.verifyIdParams('comment-xyz')
      ).rejects.toThrowError('IDCOMMENT.ID_CONTAIN_NOTDEFINED_CHARACTER');
    });
  });
});
