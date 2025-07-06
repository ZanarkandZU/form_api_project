const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsRepositoryPostgres = require('../ThreadRepositoryPostgres');
const pool = require('../../database/postgres/pool');

describe('ThreadsRepositoryPostgres', () => {
  const generateId = () => '123';

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThreads function', () => {
    it('should persist new thread and return thread correctly', async () => {
      const payload = {
        title: 'Thread Title',
        body: 'Thread Body',
      };
      const owner = 'user-123';
      const repository = new ThreadsRepositoryPostgres(pool, generateId);

      const addedThread = await repository.addThreads(payload, owner);

      expect(addedThread).toEqual({
        id: 'thread-123',
        title: 'Thread Title',
        owner: 'user-123',
      });

      const thread = await ThreadsTableTestHelper.findThreadById('thread-123');
      expect(thread).toHaveLength(1);
      expect(thread[0].body).toBe('Thread Body');
    });
  });

  describe('getCompletThreads function', () => {
    it('should return thread data when given valid id', async () => {
      const repository = new ThreadsRepositoryPostgres(pool, generateId);
      const payload = {
        title: 'Thread Title',
        body: 'Thread Body',
      };
      const owner = 'user-123';
      await ThreadsTableTestHelper.addThreads(payload, owner);

      const thread = await repository.getCompletThreads('thread-123');

      expect(thread.id).toBe('thread-123');
      expect(thread.title).toBe('Thread Title');
      expect(thread.body).toBe('Thread Body');
      expect(thread.date).toBe('date-thread:123.T');
      expect(thread.owner).toBe('user-123');
    });
  });

  describe('verifyIdThread function', () => {
    it('should return id', async () => {
      const threadId = 'thread-123';

      await ThreadsTableTestHelper.addThreads(threadId);

      const repository = new ThreadsRepositoryPostgres(pool, generateId);
      const thread = await repository.verifyIdThread(threadId);

      expect(thread.id).toBe('thread-123');
    });
  });
});
