const GetThreadsUseCase = require('../GetThreadsUseCase');

describe('GetThreadsUseCase', () => {
  let mockThreadsRepository;
  let mockCommentsRepository;
  let mockRepliesRepository;
  let mockUserRepository;

  beforeEach(() => {
    mockThreadsRepository = {
      getCompletThreads: jest.fn(),
    };
    mockCommentsRepository = {
      getCommentByIdThread: jest.fn(),
    };
    mockRepliesRepository = {
      getReplyByIdComment: jest.fn(),
    };
    mockUserRepository = {
      getUsernameByIdUser: jest.fn(),
    };
  });

  it('should return complete thread with comments and replies, including deleted ones', async () => {
    const useCase = new GetThreadsUseCase({
      threadsRepository: mockThreadsRepository,
      commentsRepository: mockCommentsRepository,
      repliesRepository: mockRepliesRepository,
      userRepository: mockUserRepository,
    });

    const threadId = 'thread-123';
    const fakeThread = {
      id: threadId,
      title: 'Test Thread',
      body: 'Test content',
      date: '2025-01-01',
      owner: 'user-1',
    };

    const fakeComments = [
      {
        id: 'comment-1',
        content: 'Comment A',
        date: '2025-01-02',
        owner: 'user-2',
        is_delete: false,
      },
      {
        id: 'comment-2',
        content: 'Comment B (deleted)',
        date: '2025-01-03',
        owner: 'user-2',
        is_delete: true,
      },
    ];

    const fakeReplies = {
      'comment-1': [
        {
          id: 'reply-1',
          content: 'Reply A',
          date: '2025-01-04',
          owner: 'user-2',
          is_delete: false,
        },
        {
          id: 'reply-2',
          content: 'Reply B (deleted)',
          date: '2025-01-05',
          owner: 'user-2',
          is_delete: true,
        },
      ],
      'comment-2': [],
    };

    const fakeUsernames = {
      'user-1': 'dicoding',
      'user-2': 'john',
    };

    mockThreadsRepository.getCompletThreads.mockResolvedValue(fakeThread);
    mockUserRepository.getUsernameByIdUser.mockImplementation((id) =>
      Promise.resolve(fakeUsernames[id])
    );
    mockCommentsRepository.getCommentByIdThread.mockResolvedValue(fakeComments);
    mockRepliesRepository.getReplyByIdComment.mockImplementation((commentId) =>
      Promise.resolve(fakeReplies[commentId] || [])
    );

    const result = await useCase.execute({ threadId });

    expect(result).toEqual({
      id: threadId,
      title: 'Test Thread',
      body: 'Test content',
      date: '2025-01-01',
      owner: 'user-1',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-1',
          username: 'john',
          date: '2025-01-02',
          replies: [
            {
              id: 'reply-1',
              content: 'Reply A',
              date: '2025-01-04',
              username: 'john',
            },
            {
              id: 'reply-2',
              content: '**balasan telah dihapus**',
              date: '2025-01-05',
              username: 'john',
            },
          ],
          content: 'Comment A',
        },
        {
          id: 'comment-2',
          username: 'john',
          date: '2025-01-03',
          replies: [],
          content: '**komentar telah dihapus**',
        },
      ],
    });

    expect(mockThreadsRepository.getCompletThreads).toHaveBeenCalledWith({
      threadId,
    });
    expect(mockCommentsRepository.getCommentByIdThread).toHaveBeenCalledWith({
      threadId,
    });
    expect(mockRepliesRepository.getReplyByIdComment).toHaveBeenCalledWith(
      'comment-1'
    );
    expect(mockRepliesRepository.getReplyByIdComment).toHaveBeenCalledWith(
      'comment-2'
    );
    expect(mockUserRepository.getUsernameByIdUser).toHaveBeenCalledWith(
      'user-1'
    );
    expect(mockUserRepository.getUsernameByIdUser).toHaveBeenCalledWith(
      'user-2'
    );
  });
});
