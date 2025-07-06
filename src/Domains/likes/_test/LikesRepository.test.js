const LikesRepository = require('../LikesRepository');

describe('LikesRepository', () => {
  it('addLikeComment', async () => {
    const likesRepository = new LikesRepository();

    await expect(likesRepository.addLikeComment({})).rejects.toThrowError(
      'LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );

    await expect(likesRepository.getLikeComment({})).rejects.toThrowError(
      'LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(likesRepository.removeLikeComment({})).rejects.toThrowError(
      'LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
