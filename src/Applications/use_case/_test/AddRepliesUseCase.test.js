const AddRepliesUseCase = require('../AddRepliesUseCase');
const VerifyReplies = require('../../../Domains/replies/entities/VerifyReplies');

jest.mock('../../../Domains/replies/entities/VerifyReplies');

describe('AddRepliesUseCase', () => {
  it('should orchestrate the add reply action correctly', async () => {
    const mockRepliesRepository = {
      addReplies: jest.fn().mockResolvedValue({
        id: 'reply-123',
        content: 'Reply content',
        owner: 'user-123',
      }),
    };

    const mockCommentsRepository = {
      verifyIdParams: jest.fn().mockResolvedValue('thread-123'),
    };

    const useCase = new AddRepliesUseCase({
      repliesRepository: mockRepliesRepository,
      commentsRepository: mockCommentsRepository,
    });

    const params = { idThread: 'thread-123', idComment: 'comment-123' };
    const content = { content: 'Reply content' };
    const owner = 'user-123';

    VerifyReplies.mockImplementation(() => ({
      idThread: params.idThread,
      idComment: params.idComment,
      payload: content,
    }));

    const result = await useCase.execute(params, content, owner);

    expect(mockCommentsRepository.verifyIdParams).toBeCalledWith('comment-123');
    expect(mockRepliesRepository.addReplies).toBeCalledWith(
      'comment-123',
      content,
      'user-123'
    );
    expect(result).toEqual({
      id: 'reply-123',
      content: 'Reply content',
      owner: 'user-123',
    });
  });

  it('should throw error when idThread does not match result from verifyIdParams', async () => {
    const mockRepliesRepository = {};
    const mockCommentsRepository = {
      verifyIdParams: jest.fn().mockResolvedValue('thread-999'),
    };

    const useCase = new AddRepliesUseCase({
      repliesRepository: mockRepliesRepository,
      commentsRepository: mockCommentsRepository,
    });

    const params = { idThread: 'thread-123', idComment: 'comment-123' };
    const content = { content: 'Reply content' };
    const owner = 'user-123';

    VerifyReplies.mockImplementation(() => ({
      idThread: params.idThread,
      idComment: params.idComment,
      payload: content,
    }));

    await expect(useCase.execute(params, content, owner)).rejects.toThrowError(
      'IDTHREAD.ID_CONTAIN_NOTDEFINED_CHARACTER'
    );

    expect(mockCommentsRepository.verifyIdParams).toBeCalledWith('comment-123');
  });
});
