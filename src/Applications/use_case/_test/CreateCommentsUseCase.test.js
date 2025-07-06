const CreateCommentsUseCase = require('../CreateCommentsUseCase');
const VerifyComments = require('../../../Domains/comments/entities/VerifyComments');

jest.mock('../../../Domains/comments/entities/VerifyComments');

describe('CreateCommentsUseCase', () => {
  let mockCommentsRepository;
  let mockThreadsRepository;

  beforeEach(() => {
    mockCommentsRepository = {
      createComment: jest.fn(),
    };

    mockThreadsRepository = {
      verifyIdThread: jest.fn(),
    };

    VerifyComments.mockClear();
  });

  it('should throw Error when thread ID is not found', async () => {
    const useCase = new CreateCommentsUseCase({
      commentsRepository: mockCommentsRepository,
      threadsRepository: mockThreadsRepository,
    });

    const threadId = 'thread-123';
    const content = { content: 'Test comment' };
    const owner = 'user-123';

    VerifyComments.mockImplementation(() => ({
      payload: content,
    }));

    mockThreadsRepository.verifyIdThread.mockResolvedValue(null);

    await expect(
      useCase.execute(threadId, content, owner)
    ).rejects.toThrowError('IDTHREAD.ID_CONTAIN_NOTDEFINED_CHARACTER');

    expect(mockThreadsRepository.verifyIdThread).toHaveBeenCalledWith(threadId);
  });

  it('should call createComment and return result when thread is valid', async () => {
    const useCase = new CreateCommentsUseCase({
      commentsRepository: mockCommentsRepository,
      threadsRepository: mockThreadsRepository,
    });

    const threadId = 'thread-123';
    const content = { content: 'content comment' };
    const owner = 'user-123';

    const verifiedPayload = { content: content.content };

    VerifyComments.mockImplementation(() => ({
      payload: verifiedPayload,
    }));

    mockThreadsRepository.verifyIdThread.mockResolvedValue({ id: threadId });

    const createdComment = {
      id: 'comment-123',
      content: 'content comment',
      owner: owner,
    };
    mockCommentsRepository.createComment.mockResolvedValue(createdComment);

    const result = await useCase.execute(threadId, content, owner);

    expect(mockThreadsRepository.verifyIdThread).toHaveBeenCalledWith(threadId);
    expect(mockCommentsRepository.createComment).toHaveBeenCalledWith(
      verifiedPayload,
      owner,
      threadId
    );
    expect(result).toEqual({
      id: 'comment-123',
      content: 'content comment',
      owner: 'user-123',
    });
  });
});
