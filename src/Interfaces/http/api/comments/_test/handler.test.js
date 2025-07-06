const CommentsHandler = require('../handler');
const CreateCommentsUseCase = require('../../../../../Applications/use_case/CreateCommentsUseCase');
const RemoveCommentsUseCase = require('../../../../../Applications/use_case/RemoveCommentsUseCase');

describe('CommentsHandler', () => {
  describe('postCommentHandler', () => {
    it('should handle POST /threads/{threadId}/comments correctly', async () => {
      const mockContainer = {
        getInstance: jest.fn(() => ({
          execute: jest.fn().mockResolvedValue({
            id: 'comment-123',
            content: 'sebuah komentar',
            owner: 'user-123',
          }),
        })),
      };

      const mockRequest = {
        auth: {
          credentials: {
            id: 'user-123',
          },
        },
        params: {
          threadId: 'thread-123',
        },
        payload: {
          content: 'sebuah komentar',
        },
      };

      const mockH = {
        response: jest.fn().mockImplementation((response) => ({
          code: jest.fn().mockReturnValue({ ...response, statusCode: 201 }),
        })),
      };

      const handler = new CommentsHandler(mockContainer);

      const response = await handler.postCommentHandler(mockRequest, mockH);

      expect(mockContainer.getInstance).toHaveBeenCalledWith(
        CreateCommentsUseCase.name
      );

      const mockExecute = await mockContainer.getInstance().execute();
      expect(mockExecute).toEqual({
        content: 'sebuah komentar',
        id: 'comment-123',
        owner: 'user-123',
      });

      expect(mockH.response).toHaveBeenCalledWith({
        status: 'success',
        data: {
          addedComment: mockExecute,
        },
      });

      expect(response.code().statusCode).toEqual(201);
    });
  });

  describe('removeCommentHandler', () => {
    it('should handle DELETE correctly', async () => {
      const mockContainer = {
        getInstance: jest.fn(() => ({
          execute: jest.fn().mockResolvedValue({
            status: 'success',
          }),
        })),
      };

      const mockRequest = {
        auth: {
          credentials: {
            id: 'user-123',
          },
        },
        params: {
          commentId: 'comment-123',
        },
      };

      const handler = new CommentsHandler(mockContainer);

      const response = await handler.removeCommentHandler(mockRequest);

      expect(mockContainer.getInstance).toHaveBeenCalledWith(
        RemoveCommentsUseCase.name
      );

      const mockRemoveComment = await mockContainer.getInstance().execute();
      expect(mockRemoveComment).toEqual({
        status: 'success',
      });

      expect(response).toEqual({
        status: 'success',
      });
    });
  });
});
