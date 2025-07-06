const RemoveCommentsUseCase = require('../RemoveCommentsUseCase');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');

describe('RemoveCommentsUseCase', () => {
  let mockCommentsRepository;

  beforeEach(() => {
    mockCommentsRepository = {
      getComments: jest.fn(),
      removeComment: jest.fn(),
    };
  });

  it('should throw NotFoundError when comment is not found', async () => {
    const useCase = new RemoveCommentsUseCase({
      commentsRepository: mockCommentsRepository,
    });
    const commentId = 'comment-123';
    const owner = 'user-123';

    mockCommentsRepository.getComments.mockResolvedValue([]);

    await expect(useCase.execute(commentId, owner)).rejects.toThrowError(
      'IDCOMMENT.ID_CONTAIN_NOTDEFINED_CHARACTER'
    );

    expect(mockCommentsRepository.getComments).toHaveBeenCalledWith(commentId);
  });

  it('should throw AuthorizationError when owner is not the same', async () => {
    const useCase = new RemoveCommentsUseCase({
      commentsRepository: mockCommentsRepository,
    });

    const commentId = 'comment-123';
    const owner = 'user-123';

    mockCommentsRepository.getComments.mockResolvedValue([
      { owner: 'user-456' },
    ]);

    await expect(useCase.execute(commentId, owner)).rejects.toThrowError(
      'USE_CASE_AUTHENTICATION.SPECIFICATION'
    );

    expect(mockCommentsRepository.getComments).toHaveBeenCalledWith(commentId);
  });

  it('should removeComment', async () => {
    const useCase = new RemoveCommentsUseCase({
      commentsRepository: mockCommentsRepository,
    });
    const commentId = 'comment-123';
    const owner = 'user-123';

    mockCommentsRepository.getComments.mockResolvedValue([{ owner }]);
    mockCommentsRepository.removeComment.mockResolvedValue({
      status: 'success',
    });

    const result = await useCase.execute(commentId, owner);

    expect(mockCommentsRepository.getComments).toHaveBeenCalledWith(commentId);
    expect(mockCommentsRepository.removeComment).toHaveBeenCalledWith(
      commentId
    );
    expect(result).toEqual({ status: 'success' });
  });
});
