const DeleteRepliesUseCase = require('../DeleteRepliesUseCase');

describe('DeleteRepliesUseCase', () => {
  let mockRepliesRepository;

  beforeEach(() => {
    mockRepliesRepository = {
      verifyIdReplies: jest.fn(),
      deleteReplies: jest.fn(),
    };
  });

  it('should successfully delete reply if verification passed', async () => {
    const replieId = 'reply-123';
    const owner = 'user-123';

    mockRepliesRepository.verifyIdReplies.mockResolvedValue({ owner });
    mockRepliesRepository.deleteReplies.mockResolvedValue({
      status: 'success',
    });

    const useCase = new DeleteRepliesUseCase({
      repliesRepository: mockRepliesRepository,
    });

    const result = await useCase.execute({ replieId }, owner);

    expect(mockRepliesRepository.verifyIdReplies).toHaveBeenCalledWith(
      replieId
    );
    expect(mockRepliesRepository.deleteReplies).toHaveBeenCalledWith(replieId);
    expect(result).toEqual({ status: 'success' });
  });

  it('should throw error when reply not found', async () => {
    const replieId = 'reply-404';
    const owner = 'user-123';

    mockRepliesRepository.verifyIdReplies.mockResolvedValue(null);

    const useCase = new DeleteRepliesUseCase({
      repliesRepository: mockRepliesRepository,
    });

    await expect(useCase.execute({ replieId }, owner)).rejects.toThrowError(
      'IDREPLY.ID_CONTAIN_NOTDEFINED_CHARACTER'
    );
  });

  it('should throw AuthorizationError when owner does not match', async () => {
    const replieId = 'reply-123';
    const owner = 'user-123';
    const differentOwner = 'user-999';

    mockRepliesRepository.verifyIdReplies.mockResolvedValue({
      owner: differentOwner,
    });

    const useCase = new DeleteRepliesUseCase({
      repliesRepository: mockRepliesRepository,
    });

    await expect(useCase.execute({ replieId }, owner)).rejects.toThrowError(
      'USE_CASE_AUTHENTICATION.SPECIFICATION'
    );
  });
});
