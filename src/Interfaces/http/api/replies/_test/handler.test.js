const RepliesHandler = require('../handler');
const AddRepliesUseCase = require('../../../../../Applications/use_case/AddRepliesUseCase');
const DeleteRepliesUseCase = require('../../../../../Applications/use_case/DeleteRepliesUseCase');

describe('RepliesHandler', () => {
  it('RepliesHandler post', async () => {
    const mockContainer = {
      getInstance: jest.fn(() => ({
        execute: jest.fn().mockResolvedValue({
          id: 'comment-123',
          content: 'content replies',
          owner: 'user-123',
        }),
      })),
    };

    const mockH = {
      response: jest.fn().mockImplementation((response) => ({
        code: jest.fn().mockReturnValue({
          ...response,
          statusCode: 201,
        }),
      })),
    };

    const mockRequest = {
      payload: {
        content: 'content replies',
      },

      params: {
        threadId: 'thread-123',
        commentId: 'comment-123',
      },

      auth: {
        credentials: {
          credentialId: 'user-123',
        },
      },
    };

    const handler = new RepliesHandler(mockContainer);

    const response = await handler.postReplieHandler(mockRequest, mockH);

    expect(mockContainer.getInstance).toHaveBeenCalledWith(
      AddRepliesUseCase.name
    );

    const mockExpect = await mockContainer.getInstance().execute();
    expect(mockExpect).toEqual({
      id: 'comment-123',
      content: 'content replies',
      owner: 'user-123',
    });

    expect(mockH.response).toHaveBeenCalledWith({
      status: 'success',
      data: {
        addedReply: mockExpect,
      },
    });
    expect(response.code().statusCode).toEqual(201);
  });

  it('RepliesHandler Delete', async () => {
    const mockContainer = {
      getInstance: jest.fn(() => ({
        execute: jest.fn().mockResolvedValue({
          idReplies: 'replies-123',
          credentialId: 'owner-123',
        }),
      })),
    };

    const mockRequest = {
      params: {
        replieId: 'replies-123',
      },

      auth: {
        credentials: {
          credentialId: 'user-123',
        },
      },
    };

    const handler = new RepliesHandler(mockContainer);
    const request = await handler.deleteReplieHandler(mockRequest);

    expect(mockContainer.getInstance).toHaveBeenCalledWith(
      DeleteRepliesUseCase.name
    );

    const mockExecute = await mockContainer.getInstance().execute();
    expect(mockExecute).toEqual({
      idReplies: 'replies-123',
      credentialId: 'owner-123',
    });
    expect(request).toEqual({
      idReplies: 'replies-123',
      credentialId: 'owner-123',
    });
  });
});
