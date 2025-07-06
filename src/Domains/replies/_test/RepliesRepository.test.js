const RepliesRepository = require('../RepliesRepository');

describe('Verify RepliesRepository', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const repliesRepository = new RepliesRepository();

    await expect(repliesRepository.addReplies({})).rejects.toThrowError(
      'REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(repliesRepository.deleteReplies({})).rejects.toThrowError(
      'REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
