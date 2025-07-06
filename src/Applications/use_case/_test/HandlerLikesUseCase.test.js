const HandlerLikesUseCase = require('../HandlerLikesUseCase');

describe('HandlerLikesUseCase', () => {
  let handlerLikesUseCase;
  let mockLikesRepository;
  let mockCommentsRepository;
  let mockThreadsRepository;

  const threadId = 'thread-123';
  const commentId = 'comment-456';
  const owner = 'user-789';

  beforeEach(() => {
    mockLikesRepository = {
      getLikeComment: jest.fn(),
      addLikeComment: jest.fn(),
      removeLikeComment: jest.fn(),
    };

    mockCommentsRepository = {
      verifyIdParams: jest.fn(),
    };

    mockThreadsRepository = {
      verifyIdThread: jest.fn(),
    };

    handlerLikesUseCase = new HandlerLikesUseCase({
      likesRepository: mockLikesRepository,
      commentsRepository: mockCommentsRepository,
      threadsRepository: mockThreadsRepository,
    });

    mockCommentsRepository.verifyIdParams.mockResolvedValue(true);
    mockThreadsRepository.verifyIdThread.mockResolvedValue(true);
  });

  it('should like the comment if user has not liked it yet', async () => {
    mockLikesRepository.getLikeComment.mockResolvedValue(null);

    await handlerLikesUseCase.execute({ threadId, commentId }, owner);

    expect(mockLikesRepository.getLikeComment).toHaveBeenCalledWith(owner);
    expect(mockLikesRepository.addLikeComment).toHaveBeenCalledWith(
      commentId,
      owner
    );
    expect(mockLikesRepository.removeLikeComment).not.toHaveBeenCalled();
  });

  it('should remove like if user already liked the comment', async () => {
    mockLikesRepository.getLikeComment.mockResolvedValue(commentId);

    await handlerLikesUseCase.execute({ threadId, commentId }, owner);

    expect(mockLikesRepository.removeLikeComment).toHaveBeenCalledWith(owner);
    expect(mockLikesRepository.addLikeComment).not.toHaveBeenCalled();
  });

  it('should add like if getLikeComment throws error (e.g. not found)', async () => {
    mockLikesRepository.getLikeComment.mockRejectedValue(
      new Error('Not found')
    );

    await handlerLikesUseCase.execute({ threadId, commentId }, owner);

    expect(mockLikesRepository.addLikeComment).toHaveBeenCalledWith(
      commentId,
      owner
    );
  });

  it('should throw error if threadId is invalid', async () => {
    mockThreadsRepository.verifyIdThread.mockResolvedValue(false);

    await expect(
      handlerLikesUseCase.execute({ threadId, commentId }, owner)
    ).rejects.toThrowError('IDTHREAD.ID_CONTAIN_NOTDEFINED_CHARACTER');
  });

  it('should throw error if commentId is invalid', async () => {
    mockCommentsRepository.verifyIdParams.mockResolvedValue(false);

    await expect(
      handlerLikesUseCase.execute({ threadId, commentId }, owner)
    ).rejects.toThrowError('IDCOMMENT.ID_CONTAIN_NOTDEFINED_CHARACTER');
  });
});
