const HandlerLikesUseCase = require('../../../../../Applications/use_case/HandlerLikesUseCase');
const LikesHandler = require('../handler');

describe('LikesHandler', () => {
  it('handlerLikesComent', async () => {
    const mockContainer = {
      getInstance: jest.fn(() => ({
        execute: jest.fn().mockResolvedValue({
          status: 'success',
        }),
      })),
    };

    const mockReques = {
      params: {
        threadId: 'comment-123',
        commentId: 'comment-123',
      },
      auth: {
        credentials: {
          credentialId: 'user-123',
        },
      },
    };

    const handler = new LikesHandler(mockContainer);
    const likes = await handler.handlerLikesComent(mockReques, {});

    expect(mockContainer.getInstance).toHaveBeenCalledWith(
      HandlerLikesUseCase.name
    );
    expect(likes).toEqual({ status: 'success' });
  });
});
