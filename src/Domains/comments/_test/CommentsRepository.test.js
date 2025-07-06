const CommentsRepository = require('../CommentsRepository');

describe('CommentsRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const commentsRepository = new CommentsRepository();

    await expect(commentsRepository.createComment({})).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(commentsRepository.removeComment({})).rejects.toThrowError(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
