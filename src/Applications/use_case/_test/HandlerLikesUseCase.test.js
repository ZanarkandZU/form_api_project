const HandlerLikesUseCase = require('../HandlerLikesUseCase');

describe('HandlerLikesUseCase', () => {
  let mockLikesRepository;
  let mockCommentsRepository;
  let mockThreadsRepository;

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
  });

  it('should remove like if comment already liked', async () => {
    const useCase = new HandlerLikesUseCase({
      likesRepository: mockLikesRepository,
      commentsRepository: mockCommentsRepository,
      threadsRepository: mockThreadsRepository,
    });

    const params = {
      threadId: 'thread-123',
      commentId: 'comment-123',
    };
    const owner = 'user-123';

    mockThreadsRepository.verifyIdThread.mockResolvedValue(true);
    mockCommentsRepository.verifyIdParams.mockResolvedValue(true);
    mockLikesRepository.getLikeComment.mockResolvedValue([
      { id_comment: 'comment-123' },
    ]);

    const result = await useCase.execute(params, owner);

    expect(mockLikesRepository.removeLikeComment).toHaveBeenCalledWith(
      'comment-123',
      owner
    );
    expect(mockLikesRepository.addLikeComment).not.toHaveBeenCalled();
    expect(result).toEqual({ status: 'success' });
  });

  it('should add like if comment not liked yet', async () => {
    const useCase = new HandlerLikesUseCase({
      likesRepository: mockLikesRepository,
      commentsRepository: mockCommentsRepository,
      threadsRepository: mockThreadsRepository,
    });

    const params = {
      threadId: 'thread-123',
      commentId: 'comment-123',
    };
    const owner = 'user-123';

    mockThreadsRepository.verifyIdThread.mockResolvedValue(true);
    mockCommentsRepository.verifyIdParams.mockResolvedValue(true);
    mockLikesRepository.getLikeComment.mockResolvedValue([]);

    const result = await useCase.execute(params, owner);

    expect(mockLikesRepository.addLikeComment).toHaveBeenCalledWith(
      'comment-123',
      owner
    );
    expect(mockLikesRepository.removeLikeComment).not.toHaveBeenCalled();
    expect(result).toEqual({ status: 'success' });
  });

  it('should throw error if thread id invalid', async () => {
    const useCase = new HandlerLikesUseCase({
      likesRepository: mockLikesRepository,
      commentsRepository: mockCommentsRepository,
      threadsRepository: mockThreadsRepository,
    });

    mockThreadsRepository.verifyIdThread.mockResolvedValue(false);
    mockCommentsRepository.verifyIdParams.mockResolvedValue(true);

    const params = {
      threadId: 'thread-xxx',
      commentId: 'comment-123',
    };

    await expect(useCase.execute(params, 'user-123')).rejects.toThrowError(
      'IDTHREAD.ID_CONTAIN_NOTDEFINED_CHARACTER'
    );
  });

  it('should throw error if comment id invalid', async () => {
    const useCase = new HandlerLikesUseCase({
      likesRepository: mockLikesRepository,
      commentsRepository: mockCommentsRepository,
      threadsRepository: mockThreadsRepository,
    });

    mockThreadsRepository.verifyIdThread.mockResolvedValue(true);
    mockCommentsRepository.verifyIdParams.mockResolvedValue(false);

    const params = {
      threadId: 'thread-123',
      commentId: 'comment-xxx',
    };

    await expect(useCase.execute(params, 'user-123')).rejects.toThrowError(
      'IDCOMMENT.ID_CONTAIN_NOTDEFINED_CHARACTER'
    );
  });
});
